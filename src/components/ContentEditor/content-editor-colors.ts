import { BackgroundColor, Color } from '@tiptap/extension-text-style';

export const DEFAULT_TEXT_COLOR = 'var(--text-primary)';
export const TEXT_COLOR_ATTRIBUTE = 'data-yui-color';
export const BACKGROUND_COLOR_ATTRIBUTE = 'data-yui-background-color';

export const contentEditorColors = [
  { label: 'Черный', value: '#181818' },
  { label: 'Розовый', value: '#fedae9' },
  { label: 'Фиолетовый', value: '#d8c8ff' },
  { label: 'Синий', value: '#9cbeff' },
  { label: 'Голубой', value: '#c8f8ff' },
  { label: 'Зелёный', value: '#57d278' },
  { label: 'Жёлтый', value: '#ffcc00' },
  { label: 'Красный', value: '#ff6868' }
];

const allowedColors = new Set(contentEditorColors.map(color => color.value));

export const normalizeContentEditorColor = (
  value: unknown,
  allowDefault = false
): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (
    allowedColors.has(normalizedValue) ||
    (allowDefault && normalizedValue === DEFAULT_TEXT_COLOR)
  ) {
    return normalizedValue;
  }

  const rgbMatch = normalizedValue.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*1(?:\.0+)?)?\s*\)$/
  );

  if (!rgbMatch) {
    return null;
  }

  const channels = rgbMatch.slice(1, 4).map(Number);

  if (channels.some(channel => channel > 255)) {
    return null;
  }

  const hexValue = `#${channels
    .map(channel => channel.toString(16).padStart(2, '0'))
    .join('')}`;

  return allowedColors.has(hexValue) ? hexValue : null;
};

export const ContentEditorColor = Color.extend({
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            // Старые сообщения и черновики ещё могут содержать только style.
            parseHTML: element =>
              normalizeContentEditorColor(
                element.getAttribute(TEXT_COLOR_ATTRIBUTE) ||
                  element.style.color,
                true
              ),
            renderHTML: attributes => {
              const color = normalizeContentEditorColor(attributes.color, true);

              return color
                ? { [TEXT_COLOR_ATTRIBUTE]: color, style: `color: ${color}` }
                : {};
            }
          }
        }
      }
    ];
  }
});

export const ContentEditorBackgroundColor = BackgroundColor.extend({
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          backgroundColor: {
            default: null,
            parseHTML: element =>
              normalizeContentEditorColor(
                element.getAttribute(BACKGROUND_COLOR_ATTRIBUTE) ||
                  element.style.backgroundColor
              ),
            renderHTML: attributes => {
              const color = normalizeContentEditorColor(
                attributes.backgroundColor
              );

              return color
                ? {
                    [BACKGROUND_COLOR_ATTRIBUTE]: color,
                    style: `background-color: ${color}`
                  }
                : {};
            }
          }
        }
      }
    ];
  }
});

export const normalizePastedContentEditorColors = (html: string): string => {
  const template = document.createElement('template');
  template.innerHTML = html;

  template.content.querySelectorAll<HTMLElement>('*').forEach(element => {
    const color =
      element.tagName === 'SPAN'
        ? normalizeContentEditorColor(
            element.getAttribute(TEXT_COLOR_ATTRIBUTE),
            true
          )
        : null;
    const backgroundColor =
      element.tagName === 'SPAN'
        ? normalizeContentEditorColor(
            element.getAttribute(BACKGROUND_COLOR_ATTRIBUTE)
          )
        : null;

    element.style.removeProperty('color');
    element.style.removeProperty('background-color');
    element.style.removeProperty('background');
    element.removeAttribute('color');
    element.removeAttribute('bgcolor');
    element.removeAttribute(TEXT_COLOR_ATTRIBUTE);
    element.removeAttribute(BACKGROUND_COLOR_ATTRIBUTE);

    if (color) {
      element.setAttribute(TEXT_COLOR_ATTRIBUTE, color);
      element.style.setProperty('color', color);
    }

    if (backgroundColor) {
      element.setAttribute(BACKGROUND_COLOR_ATTRIBUTE, backgroundColor);
      element.style.setProperty('background-color', backgroundColor);
    }

    if (!element.style.length) {
      element.removeAttribute('style');
    }
  });

  return template.innerHTML;
};
