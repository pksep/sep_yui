/**
 * Принимает и изменяет стили у элемента или корневого элемента
 * @param {Record<string, string>} styles объект стилей
 * @param {HTMLElement} element элемент, для которого изменяем стили
 *
 * @example
 * ```js
 * // Меняем значение переменной у body
 * changeStyleProperties({
 *  "--primary-color": #f33ff3;
 * })
 *
 * // Меняем значение переменной у текста
 * changeStyleProperties({
 *  "--primary-color": #f33ff3;
 * }, textElement)
 * ```
 */
export default function changeStyleProperties<T extends string>(
  styles: Partial<Record<T, string | number>>,
  element: HTMLElement = document.documentElement
): void {
  for (const [style, property] of Object.entries(styles)) {
    element.style.setProperty(style, String(property));
  }
}
