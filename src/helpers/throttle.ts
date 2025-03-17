/**
 * Функция throttle возвращает новую функцию, которая вызывает переданную функцию не чаще, чем раз в delay милисекунд.
 * @param func
 * @param delay задержка в милисекундах
 * @returns
 */
export default function throttle<
  T extends (...args: Parameters<T>) => ReturnType<T>
>(
  func: T,
  delay: number = 100
): (...args: Parameters<T>) => ReturnType<T> | null {
  let last = 0;

  return function (...args: Parameters<T>): ReturnType<T> | null {
    const now = Date.now();

    if (now - last >= delay) {
      last = now;
      return func(...args);
    }

    return null;
  };
}
