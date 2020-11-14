<template>
  <div class="login-pop" v-if="show === true">
    <div class="login-container">
      <div class="side side-img"></div>
      <div class="side side-main">
        <div class="side-form" style="text-align: center">
          <img :src="require('../assets/logo.jpg')" class="side-logo" alt="浙江树人大学" />
          <h1>思政课程网络考试系统</h1>
        </div>

        <div class="side-form">
          <customized-form :password="fields.password" :id="fields.id" @change="handleFormChange" />
        </div>

        <div class="side-form">
          <a-button style="width: 100%" @click="handleLogin">登录</a-button>
        </div>
      </div>
    </div>
  </div>
  <!-- <a-modal
    :visible="show"
    okText="登录"
    @ok="handleLogin"
    :closable="false"
    cancelText="清空"
    @cancel="handleCancel"
  >
    <h1 style="text-align: center">用户登录</h1>
    <customized-form :password="fields.password" :id="fields.id" @change="handleFormChange" />
  </a-modal>-->
</template>

<script>
import { POST } from "@/lib/fetch";
import { notification } from "ant-design-vue";
// import logo from "../assets/logo.jpg";
const CustomizedForm = {
  props: ["id", "password"],

  template: `
    <a-form
      layout="vertical"
      :form="form"
    >
      <a-form-item label="学号">
        <a-input v-decorator="['id', {
          rules: [{ required: true, message: '请填写id' }],
        }]">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="密码">
        <a-input type="password" v-decorator="['password']">
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
    </a-form>
  `,
  created() {
    this.form = this.$form.createForm(this, {
      name: "global_state",
      onFieldsChange: (_, changedFields) => {
        this.$emit("change", changedFields);
      },
      mapPropsToFields: () => {
        return {
          id: this.$form.createFormField({
            ...this.id,
            value: this.id.value
          }),
          password: this.$form.createFormField({
            ...this.password,
            value: this.password.value
          })
        };
      }
    });
  },
  watch: {
    username() {
      this.form.updateFields({
        username: this.$form.createFormField({
          ...this.username,
          value: this.username.value
        })
      });
    }
  }
};

export default {
  props: ["show"],
  components: {
    CustomizedForm
  },
  data() {
    return {
      fields: {
        id: {
          value: ""
        },
        password: {
          value: ""
        }
      }
    };
  },
  methods: {
    handleFormChange(changedFields) {
      this.fields = { ...this.fields, ...changedFields };
    },
    handleLogin() {
      POST("/user/login", {
        uuid: this.fields.id.value,
        password: this.fields.password.value
      }).then(res => {
        if (res.success) {
          // console.log(res.data);
          let privilege = JSON.parse(res.data.privilege);
          if (privilege.indexOf("student") < 0) {
            notification.error({
              message: "登录失败，请确认登录了学生账号",
              duration: 2
            });
            return;
          }
          this.$root.user = res.data;
          notification.success({
            message: "登录成功",
            duration: 2
          });
        } else {
          notification.error({
            message: "登录失败，请检查学号密码",
            duration: 2
          });
        }
      });
    },
    handleCancel() {
      this.fields = {
        id: {
          value: ""
        },
        password: {
          value: ""
        }
      };
    }
  }
};
</script>

<style scoped>
.login-pop {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rosybrown;
  background-image: url("../assets/background.jpg");
  background-size: 100% 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 75vw;
  height: 75vh;
  background-color: white;
  box-shadow: 0px 5px 100px rgba(0, 0, 0, 0.3);
  display: flex;
}

.side {
  width: 50%;
  height: 100%;
}

.side-img {
  background-position: 0, 0;
  background-image: url("../assets/side.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.side-main {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-around;

  padding: 50px 0px;
}

.side-form {
  width: 250px;
}

.side-logo {
  width: 80%;
}
</style>