<template>
  <div class="h-full flex justify-center items-center">
    <n-result
      status="404"
      title="404"
      description="NotFound"
    >
      <template #footer>
      <n-button @click="$router.push('/')">go home</n-button>
      </template>
    </n-result>
  </div>
</template>
