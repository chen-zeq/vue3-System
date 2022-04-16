<template>
  <a-form
    :model="formState"
    name="normal_login"
    class="login-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="账号"
      name="username"
      :rules="[{ required: true, message: '请填上账号!' }]"
    >
      <a-input v-model:value="formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: '请填上密码!' }]"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <div class="login-form-wrap">
      <a-form-item name="remember" no-style>
        <a-checkbox v-model:checked="formState.remember">保存密码</a-checkbox>
      </a-form-item>
      <a class="login-form-forgot" href="">忘记密码</a>
    </div>

    <a-form-item>
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
        登录
      </a-button>
      或
      <a href="">注册</a>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'

import { defineComponent, reactive, computed } from 'vue';
import { message } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const router = useRouter()
    const formState = reactive<FormState>({
      username: '',
      password: '',
      remember: true,
    });

    const onFinish = (values: any) => {
      if(values.username == 'czq' && values.password == '123456'){
            message.info('登录成功');
            router.push('/index')
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };



    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });

    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
    };
  },
});
</script>
<style>
.ant-form {
    background-color: white;
    width: 400px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -150px !important;
    margin-left: -200px !important;
    padding: 30px 20px 0 !important;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#components-form-demo-normal-login .login-form-forgot {
  margin-bottom: 24px;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
