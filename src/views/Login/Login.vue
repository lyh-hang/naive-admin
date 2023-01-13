<template>
  <div class="login">
    <n-form
      ref="formRef"
      size="large"
      :model="modelRef"
      :rules="rules"
      class="login-form"
    >
      <div class="title-container">
        <h1 text-center>{{ t('login.userForm') }}</h1>
        <n-icon
          class="language cursor-pointer select-none"
          :size="24"
          @click="languageToggle"
        >
          <ViconLanguage />
        </n-icon>
      </div>
      <n-form-item path="username">
        <n-auto-complete
          v-model:value="modelRef.username"
          type="text"
          @keydown.enter.prevent
          :placeholder="t('login.username')"
        />
      </n-form-item>
      <n-form-item path="password">
        <n-input
          v-model:value="modelRef.password"
          type="password"
          show-password-on="click"
          @keydown.enter.prevent
          :placeholder="t('login.password')"
          :input-props="{ autocomplete: 'off' }"
        />
      </n-form-item>
      <n-form-item>
        <n-button
          :loading="loading"
          style="width: 100%"
          type="primary"
          @click="loginHandle"
        >
          {{ t('login.submit') }}
        </n-button>
      </n-form-item>
      <div class="tips">
        {{ t('login.username') + ': admin' }}&nbsp;&nbsp;&nbsp;
        {{ t('login.password') + ': ' + t('login.any') }}
      </div>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { FormInst, FormItemRule, useMessage, FormRules } from 'naive-ui'
import { useUserStore } from '@/store/user'

interface ModelType {
  username: string | undefined
  password: string | undefined
}

const { t, locale } = useI18n()

const { login } = useUserStore()

const loading = ref(false)
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const modelRef = ref<ModelType>({
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

function loginHandle(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(async errors => {
    if (!errors) {
      const { username, password } = modelRef.value
      loading.value = true
      try {
        await login({ username, password })
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

function languageToggle() {
  locale.value = locale.value === 'en' ? 'zh-CN' : 'en'
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  min-height: 100%;
  height: 100%;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    margin: 0 auto;
    padding: 160px 35px 0;
    overflow: hidden;
  }
  .title-container {
    position: relative;
    width: 100%;
    .language {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }
  .tips {
    font-size: 12px;
  }
}
</style>
