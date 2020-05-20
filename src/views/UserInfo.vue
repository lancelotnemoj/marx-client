<template>
  <div class="userinfo">
    <h1>用户操作</h1>
    <h2>当前用户: {{ this.user.name }}</h2>

    <a-divider />
    <a-row>
      <a-col type="flex" align="left" style="width: 100%">
        <h2>重置密码</h2>
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item v-bind="formItemLayout" label="现密码">
            <a-input
              v-decorator="[
                'now',
                {
                  rules: [
                    {
                      required: true,
                      message: '请确认你的旧密码!',
                    },
                    {
                      validator: validateNow,
                    },
                  ],
                },
              ]"
              type="password"
              @blur="handleConfirmBlur"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="新密码">
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入新密码!',
                    },
                    {
                      validator: validateToNextPassword,
                    },
                  ],
                },
              ]"
              type="password"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="确认密码">
            <a-input
              v-decorator="[
                'confirm',
                {
                  rules: [
                    {
                      required: true,
                      message: '请确认你的密码!',
                    },
                    {
                      validator: compareToFirstPassword,
                    },
                  ],
                },
              ]"
              type="password"
              @blur="handleConfirmBlur"
            />
          </a-form-item>

          <a-form-item v-bind="tailFormItemLayout">
            <a-button type="primary" html-type="submit">提交</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
    <a-row>
      <a-col style="width: 100%" type="flex" align="left">
        <h2>账户</h2>
        <a-button type="danger" ghost style="display: block; width: 100%" @click="logout">登出</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { POST } from "../lib/fetch";
export default {
  name: "UserInfo",
  data() {
    return {
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  computed: {
    user: function() {
      return this.$root.user;
    }
  },
  methods: {
    logout(e) {
      POST("/user/logout").then(() => {
        this.$root.user = {};
        // this.$route.push("/")
        this.$router.push("/");
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const { confirm, password, now } = values;
          POST("/client/password/reset", {
            next: password,
            now
          })
            .then(res => {
              if (res.success) this.$message.success("更改密码成功", 2);
              else this.$message.warning(req.ret, 2);
            })
            .catch(e => {
              this.$message.warning("更改密码失败", 2);
            });
        } else {
          console.log(err);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次密码不一致!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    validateNow(rule, value, callback) {
      const form = this.form;
      console.log(value);
      callback();
    }
  }
};
</script>

<style scoped>
.userinfo {
  width: 800px;
  max-width: 100vw;
  margin-left: auto;
  margin-right: auto;
}
</style>
