/**
 * Функция throttle возвращает новую функцию, которая вызывает переданную функцию не чаще, чем раз в delay милисекунд.
 * @param func
 * @param delay задержка в милисекундах
 * @returns
 */
export default function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(func: T, delay?: number): (...args: Parameters<T>) => ReturnType<T> | null;
