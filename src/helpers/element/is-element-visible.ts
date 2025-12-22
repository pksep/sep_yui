const isElementVisible = (
  el: HTMLElement,
  container: HTMLElement | Window = window
): boolean => {
  const rect = el.getBoundingClientRect();

  if (container instanceof Window) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return (
      rect.top < viewportHeight &&
      rect.bottom > 0 &&
      rect.left < viewportWidth &&
      rect.right > 0
    );
  } else {
    const containerRect = container.getBoundingClientRect();

    return (
      rect.top < containerRect.bottom &&
      rect.bottom > containerRect.top &&
      rect.left < containerRect.right &&
      rect.right > containerRect.left
    );
  }
};

export default isElementVisible;
