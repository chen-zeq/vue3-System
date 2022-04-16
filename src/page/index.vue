<template>
 <div class="content">
     <a-image
    :width="'100%'"
    :height="'100%'"
    src="./src/assets/index.jpg"
  />
    <p id="hitokoto"><a href="#" id="hitokoto_text">:D 获取中...</a></p>
 </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
   function hitokoto(){
      var xhr = new XMLHttpRequest();
      xhr.open("get", "https://v1.hitokoto.cn");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var data = JSON.parse(xhr.responseText);
          var hitokoto = document.getElementById("hitokoto_text");
          hitokoto.href = "https://hitokoto.cn/?uuid=" + data.uuid;
          hitokoto.innerText = data.hitokoto;
        }
      };
      xhr.send();
    };

    return {
      hitokoto:hitokoto()
    };
  },
});
</script>
<style scoped>
.content {
  width: 100%;
  height: 100%;
  position: relative;
}
#hitokoto {
 position: absolute;
 top: 95%;
 right: 5%;
 color: #a52a2a;
 font-size: 24px;
}
#hitokoto a{
 color: #a52a2a;
}
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
