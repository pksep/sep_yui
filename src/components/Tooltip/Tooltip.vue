<template>
  <span
    class="tooltip-yui-kit tooltip-yui-kit_right"
    data-tooltip="This is a tooltip, hello"
    >Get tooltip</span
  >
</template>

<style scoped>
.tooltip-yui-kit[data-tooltip] {
  --border-radius: 8px;
  --tooltip-background-color: var(--white);
  --tooltip-color: var(--text-black);
  position: relative;
  &::before,
  &::after {
    position: absolute;
    visibility: hidden;
    z-index: 3;
  }
  &::before {
    border: 0.6em solid transparent;
    content: '';
  }
  &::after {
    content: attr(data-tooltip);
    display: inline-block;
    padding: 8px 16px;
    overflow: hidden;
    border-radius: var(--border-radius);
    background: var(--tooltip-background-color);
    border: 1px solid var(--tooltip-background-color);
    color: var(--tooltip-color);
    box-shadow: 0px 2px 2px 2px #00000029;
    white-space: nowrap;
  }

  &.tooltip-yui-kit_right {
    &::before {
      top: 50%;
      left: 100%;
      border-right-color: var(--tooltip-background-color);
      filter: drop-shadow(0px 2px 2px black) opacity(70%);
      transform: translate(0, -50%);
    }

    &::after {
      top: 50%;
      left: 100%;
      transform: translate(1em, -50%);
    }
  }

  &:focus,
  &:hover {
    &::before,
    &::after {
      visibility: visible;
    }
  }
}
</style>
