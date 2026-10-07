import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import type { Node } from '@tiptap/pm/model';
import type { EditorView } from '@tiptap/pm/view';
import { checkSpelling } from '@/common/spellcheck-service';
import { getSpellcheckLanguage } from '@/common/spellcheck';

const pluginKey = new PluginKey<DecorationSet>('contentEditorSpellcheck');

const getTextBlocks = (doc: Node) => {
  const blocks: { text: string; position: number; offset: number }[] = [];
  let offset = 0;
  doc.descendants((node, position) => {
    if (!node.isTextblock) return;
    let text = '';
    node.forEach(child => {
      // Сохраняем позиции, исключая код, ссылки и атомарные упоминания.
      text +=
        child.isText &&
        !child.marks.some(mark => ['code', 'link'].includes(mark.type.name))
          ? child.text
          : ' '.repeat(child.nodeSize);
    });
    blocks.push({ text, position: position + 1, offset });
    offset += text.length + 1;
    return false;
  });
  return blocks;
};

export const ContentEditorSpellcheck = Extension.create({
  name: 'contentEditorSpellcheck',
  addProseMirrorPlugins() {
    return [
      new Plugin<DecorationSet>({
        key: pluginKey,
        state: {
          init: () => DecorationSet.empty,
          apply: (transaction, decorations) =>
            transaction.getMeta(pluginKey) ??
            (transaction.docChanged ? DecorationSet.empty : decorations)
        },
        props: {
          attributes: state => ({
            spellcheck: 'false',
            lang: getSpellcheckLanguage(state.doc.textContent)
          }),
          decorations: state => pluginKey.getState(state)
        },
        view: initialView => {
          let timer: ReturnType<typeof setTimeout>;
          let generation = 0;
          let destroyed = false;

          const schedule = (view: EditorView) => {
            clearTimeout(timer);
            const currentGeneration = ++generation;
            const doc = view.state.doc;
            const blocks = getTextBlocks(doc);
            timer = setTimeout(async () => {
              const errors = await checkSpelling(
                blocks.map(block => block.text).join('\n')
              );
              if (
                destroyed ||
                currentGeneration !== generation ||
                view.state.doc !== doc
              )
                return;
              const decorations: Decoration[] = [];
              let blockIndex = 0;
              for (const error of errors) {
                while (
                  blocks[blockIndex] &&
                  error.from >=
                    blocks[blockIndex].offset + blocks[blockIndex].text.length
                )
                  blockIndex++;
                const block = blocks[blockIndex];
                if (block && error.to <= block.offset + block.text.length) {
                  decorations.push(
                    Decoration.inline(
                      block.position + error.from - block.offset,
                      block.position + error.to - block.offset,
                      { class: 'yui-spelling-error' }
                    )
                  );
                }
              }
              view.dispatch(
                view.state.tr.setMeta(
                  pluginKey,
                  DecorationSet.create(doc, decorations)
                )
              );
            }, 250);
          };

          schedule(initialView);
          return {
            update: (view, previousState) => {
              if (view.state.doc !== previousState.doc) schedule(view);
            },
            destroy: () => {
              destroyed = true;
              generation++;
              clearTimeout(timer);
            }
          };
        }
      })
    ];
  }
});
