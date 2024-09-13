<template>
  <div class="card-yui-kit">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card-yui-kit {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-shadow: 0px 4px 9.8px 0px #0000000D;
  background: white;
  border-radius: 15px;
  cursor: pointer;
  font-size: 14px;
  &:hover, &.pressed {
      border-color: #9CBEFF;
      border-style: solid;
  }
  &:hover {
    border-width: 0.5px;
  }
  &.pressed {
    border-width: 1px;
  }
}
</style>
