<script setup lang="ts">
const props = defineProps({
  check: {
    required: true,
    type: Boolean
  }
})
</script>

<template>
  <n-el tag="div" class="common">
    <n-icon v-show="props.check" class="check" :size="18">
      <icon-ion:checkmark-outline />
    </n-icon>
  </n-el>
</template>

<style lang="scss" scoped>
.common {
  position: relative;
  width: 45px;
  height: 35px;
  overflow: hidden;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-1);
  background-color: #f0f0f0;
  .check {
    position: absolute;
    right: 5px;
    bottom: 2px;
    color: black;
  }
  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  &::before {
    width: 100%;
    height: 10px;
  }
  &::after {
    width: 15px;
    height: 100%;
  }
  &.t-light::before {
    background-color: #fff;
  }
  &.l-light::after {
    background-color: #fff;
  }
  &.t-dark::before {
    background-color: #000;
  }
  &.l-dark::after {
    background-color: #000;
  }
}
</style>
