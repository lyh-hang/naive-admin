<template>
  <div h-full overflow-hidden>
    <n-form
      ref="formRef"
      size="large"
      :model="modelRef"
      :rules="rules"
      class="relative w-520px mx-auto my-0 pt-160px px-35px overflow-hidden"
    >
      <div relative>
        <Theme :size="24" class="icon left-0" />
        <h1 text-center>{{ t('login.userForm') }}</h1>
        <div class="icon right-0">
          <Language :size="24" />
        </div>
      </div>
      <n-form-item path="username">
        <n-auto-complete v-model:value="modelRef.username" type="text" @keydown.enter.prevent :placeholder="t('login.username')"/>
      </n-form-item>
      <n-form-item path="password">
        <n-input
          v-model:value="modelRef.password"
          type="password"
          show-password-on="click"
          @keydown.enter.prevent="submit"
          :placeholder="t('login.password')"
          :input-props="{ autocomplete: 'off' }"
        />
      </n-form-item>
      <n-form-item>
        <n-button :loading="loading" style="width: 100%" type="primary" @click.submit="submit">
          {{ t('login.submit') }}
        </n-button>
      </n-form-item>
      <div class="tips">
        {{ t('login.username') + ': ' + t('login.any') }}&nbsp;&nbsp;&nbsp;
        {{ t('login.password') + ': ' + t('login.any') }}
      </div>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { FormInst, FormItemRule, useMessage, FormRules } from 'naive-ui'
import { useUserStore } from '@/store/user'

const { t } = useI18n()

const { login } = useUserStore()

const loading = ref<boolean>(false)
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const modelRef = ref({
  username: 'admin',
  password: '111111'
})
const rules: FormRules = {
  username: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('用户名不能为空')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('密码不能为空')
        } else if (value.length < 6) {
          return new Error('密码不能小于六位')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ]
}

function submit(e: MouseEvent | KeyboardEvent) {
  e.preventDefault()
  formRef.value?.validate(async errors => {
    if (!errors) {
      loading.value = true
      try {
        await login(modelRef.value.username)
        loading.value = false
      } catch (e) {
        loading.value = false
      }
    } else {
      console.log(errors)
      message.error('验证失败')
    }
  })
}
</script>

<style lang="scss" scoped>
.tips {
  font-size: 12px;
}
.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
