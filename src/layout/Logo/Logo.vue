<script setup lang="ts">
interface IProps {
  collapsed?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
    collapsed: false
})
</script>

<template>
  <div class="logo" :class="{ 'logo-collapsed': props.collapsed }" @click="$router.push('/')">
    <n-icon class="logo-icon" size="35">
      <icon-custom-vue />
    </n-icon>
    <h3 class="title title-hidden">Naive Admin</h3>
  </div>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  margin-left: 20px;
  height: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  .logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 50px;
  }
  .title {
    width: 120px;
    line-height: 50px;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 1;
    transition: all 0.5s ease-in-out, color 0s;
  }
}
.logo-collapsed {
  margin-left: 0;
  transition: margin-left 0.3s ease;
  .title-hidden {
    width: 0;
    margin-left: 0;
    opacity: 0;
    transition: all 0.3s ease, color 0s;
  }
}
</style>
