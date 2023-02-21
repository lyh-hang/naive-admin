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
        <Theme :size="24" class="theme" />
        <h1 text-center>{{ t('login.userForm') }}</h1>
        <div class="language">
          <Language :size="24" />
        </div>
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
          @keydown.enter.prevent="submit"
          :placeholder="t('login.password')"
          :input-props="{ autocomplete: 'off' }"
        />
      </n-form-item>
      <n-form-item>
        <n-button
          :loading="loading"
          style="width: 100%"
          type="primary"
          @click.submit="submit"
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

const { t } = useI18n()

const { login } = useUserStore()

const router = useRouter()

const loading = ref<boolean>(false)
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const modelRef = ref<UserForm>({
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
      const { username, password } = modelRef.value
      loading.value = true
      try {
        await login({ username, password })
        loading.value = false
        router.push('/')
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
    .theme {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
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
