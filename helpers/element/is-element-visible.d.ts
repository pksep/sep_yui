/**
 * Возвращает состояние видимости ```el``` внутри ```container```.
 * @param el
 * @param container
 * @returns
 */
declare const isElementVisible: (el: HTMLElement, container?: HTMLElement | Window) => boolean;
export default isElementVisible;
