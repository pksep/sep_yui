import isElementVisible from '@/helpers/element/is-element-visible';

/**
 * Скроллит элемент до необходимого (```el```), если его не видно в ```container```
 * @param el
 * @param container
 * @returns
 */
const scrollToElementIfNotVisible = (
  el: HTMLElement,
  container: HTMLElement | null = null
): void => {
  if (!el) return;

  const isVisible = container
    ? isElementVisible(el, container)
    : isElementVisible(el);

  if (!isVisible) {
    el.scrollIntoView({
      behavior: 'smooth', // плавная прокрутка
      block: 'nearest' // минимально необходимое смещение
    });
  }
};

export default scrollToElementIfNotVisible;
