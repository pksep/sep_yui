/**
 * Скроллит элемент до необходимого (```el```), если его не видно в ```container```
 * @param el
 * @param container
 * @returns
 */
declare const scrollToElementIfNotVisible: (el: HTMLElement, container?: HTMLElement | null) => void;
export default scrollToElementIfNotVisible;
