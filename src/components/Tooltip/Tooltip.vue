<template>
  <span
    data-tooltip="I do not think there is a way to set the width on the tool tip and have it auto break? Lets see.."
    data-placement="right"
    >Get tooltip</span
  >
</template>

<style scoped>
[data-tooltip] {
  position: relative;
  &::after {
    --border-radius: 8px;
    --tooltip-background-color: var(--white);
    --tooltip-color: var(--text-color);
    content: attr(data-tooltip);
    display: inline-block;
    z-index: 3;
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 250px;
    max-width: 250px;
    padding: 8px 16px;
    overflow: hidden;
    transform: translate(-50%, -0.25rem);
    border-radius: var(--border-radius);
    background: var(--tooltip-background-color);
    color: var(--tooltip-color);
    text-overflow: ellipsis;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0px 2px 2px 2px #00000029;
    white-space: normal;
  }

  &[data-placement='right'] {
    &::after {
      top: 50%;
      right: auto;
      bottom: auto;
      left: 100%;
      transform: translate(0.25rem, -20%);
    }
  }
  &:focus,
  &:hover {
    &::before,
    &::after {
      opacity: 1;
    }
  }
}
</style>
