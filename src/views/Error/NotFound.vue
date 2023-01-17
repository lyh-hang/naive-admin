<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <n-result
      status="404"
      :title="`404 ${t('error.404')}`"
      :description="t('error.tips')"
    >
      <template #footer>
        <n-button @click="$router.push('/')">{{ t('go home') }}</n-button>
      </template>
    </n-result>
  </div>
</template>
