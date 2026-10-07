import type { Directive } from 'vue';
import { checkSpelling, type SpellingError } from './spellcheck-service';

type TextField = HTMLInputElement | HTMLTextAreaElement;

const typography = [
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'font-variant',
  'line-height',
  'letter-spacing',
  'word-spacing',
  'text-transform',
  'text-align',
  'text-indent',
  'direction',
  'tab-size',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width'
];

const createController = (element: TextField) => {
  const mirror = document.createElement('div');
  const content = document.createElement('div');
  mirror.className = 'yui-spellcheck-mirror';
  mirror.setAttribute('aria-hidden', 'true');
  mirror.append(content);
  element.after(mirror);
  let enabled = true;
  let composing = false;
  let destroyed = false;
  let generation = 0;
  let lastText: string | undefined;
  let timer: ReturnType<typeof setTimeout>;
  let frame = 0;
  let animationUntil = 0;

  const syncLayout = () => {
    const style = getComputedStyle(element);
    for (const property of typography)
      mirror.style.setProperty(property, style.getPropertyValue(property));
    const multiline = element instanceof HTMLTextAreaElement;
    Object.assign(mirror.style, {
      left: `${element.offsetLeft}px`,
      top: `${element.offsetTop}px`,
      width: `${element.offsetWidth}px`,
      height: `${element.offsetHeight}px`,
      display:
        enabled && !element.disabled && !element.readOnly
          ? multiline
            ? 'block'
            : 'flex'
          : 'none',
      alignItems: 'center',
      whiteSpace: multiline ? 'pre-wrap' : 'pre',
      overflowWrap: multiline ? 'break-word' : 'normal'
    });
    content.style.transform = `translate(${-element.scrollLeft}px, ${multiline ? -element.scrollTop : 0}px)`;
    content.style.minWidth = multiline ? '100%' : 'max-content';
    content.style.flexShrink = '0';
  };

  const render = (text: string, errors: SpellingError[]) => {
    const fragment = document.createDocumentFragment();
    let offset = 0;
    for (const error of errors) {
      fragment.append(document.createTextNode(text.slice(offset, error.from)));
      const span = document.createElement('span');
      span.className = 'yui-spelling-error';
      span.textContent = text.slice(error.from, error.to);
      fragment.append(span);
      offset = error.to;
    }
    fragment.append(
      document.createTextNode(
        text.slice(offset) + (text.endsWith('\n') ? ' ' : '')
      )
    );
    content.replaceChildren(fragment);
    syncLayout();
  };

  const update = (value = enabled) => {
    enabled = value;
    const text = element.value;
    const active =
      enabled && !composing && !element.disabled && !element.readOnly;
    syncLayout();
    if (lastText === text && active) return;
    lastText = active ? text : undefined;
    const currentGeneration = ++generation;
    clearTimeout(timer);
    render(active ? text : '', []);
    if (!active) return;
    timer = setTimeout(async () => {
      const errors = await checkSpelling(text);
      if (
        !destroyed &&
        currentGeneration === generation &&
        element.value === text
      )
        render(text, errors);
    }, 250);
  };

  const animateLayout = () => {
    syncLayout();
    if (!destroyed && performance.now() < animationUntil)
      frame = requestAnimationFrame(animateLayout);
  };
  const handleLayoutChange = () => {
    cancelAnimationFrame(frame);
    animationUntil = performance.now() + 350;
    animateLayout();
  };
  const handleInput = () => update();
  const handleCompositionStart = () => {
    composing = true;
    update();
  };
  const handleCompositionEnd = () => {
    composing = false;
    update();
  };
  const listeners: [string, EventListener][] = [
    ['input', handleInput],
    ['scroll', syncLayout],
    ['focus', handleLayoutChange],
    ['blur', handleLayoutChange],
    ['compositionstart', handleCompositionStart],
    ['compositionend', handleCompositionEnd]
  ];
  listeners.forEach(([event, listener]) =>
    element.addEventListener(event, listener)
  );
  const observer = new ResizeObserver(syncLayout);
  observer.observe(element);
  document.fonts.ready.then(() => {
    if (!destroyed) syncLayout();
  });

  return {
    update,
    destroy: () => {
      destroyed = true;
      generation++;
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      observer.disconnect();
      listeners.forEach(([event, listener]) =>
        element.removeEventListener(event, listener)
      );
      mirror.remove();
    }
  };
};

const controllers = new WeakMap<
  TextField,
  ReturnType<typeof createController>
>();

export const vSpellcheck: Directive<TextField, boolean | undefined> = {
  mounted: (element, binding) => {
    const controller = createController(element);
    controllers.set(element, controller);
    controller.update(binding.value !== false);
  },
  updated: (element, binding) =>
    controllers.get(element)?.update(binding.value !== false),
  unmounted: element => {
    controllers.get(element)?.destroy();
    controllers.delete(element);
  }
};
