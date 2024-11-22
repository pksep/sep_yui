<template>
  <details class="details-yui-kit">
    <summary class="details-yui-kit__summary">
      <slot name="summary" />
      <YIcon name="chevron-up" class="chevron-up" stroke-width="2" />
      <YIcon name="chevron-down" class="chevron-down" stroke-width="2" />
    </summary>
    <slot />
  </details>
</template>

<style scoped>
summary.details-yui-kit__summary {
  padding: 15px;
  list-style: none;
  background: #f9fbff;
  border-radius: 5px;
  font-size: 16px;
  color: #6498ec;
  &:hover {
    cursor: pointer;
    background: #f4f8ff;
  }
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 0.1fr;
  & svg.chevron-up,
  & svg.chevron-down {
    width: 20px;
    height: 20px;
  }
  & svg.chevron-up {
    pointer-events: none;
    display: none;
  }
  & svg.chevron-down {
    pointer-events: none;
    justify-self: end;
  }
}

details.details-yui-kit[open] {
  background: #f9fbff;
  border-radius: 5px;
  padding-bottom: 15px;
  & summary.details-yui-kit__summary {
    & svg.chevron-up {
      display: block;
      justify-self: end;
    }
    & svg.chevron-down {
      display: none;
    }
  }
}

summary::-webkit-details-marker {
  display: none;
}
</style>
