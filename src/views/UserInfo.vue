<template>
  <div>
    <a-row type="flex" justify="center" align="top">
      <a-col :xs="24" :sm="20" :md="16" :lg="8" :xl="8">
        <a-row>
          <a-col :span="8">
            <a-avatar :size="64" icon="user" />
          </a-col>
          <a-col :span="16" type="flex" justify="center">
            <a-row>
              <h1>UserName</h1>
            </a-row>
            <a-row>
              <section>xxx专业-xxx班</section>
            </a-row>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row type="flex" justify="center" align="top" style="margin-top: 48px">
      <a-col :xs="24" :sm="20" :md="16" :lg="8" :xl="8" type="flex" align="left">
        <h2>重置密码</h2>
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item v-bind="formItemLayout" label="密码">
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
  </div>
</template>

<script>
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
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$message.success("更改密码成功", 2);
        } else {
          this.$message.error("请检查填写的信息", 2);
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
    }
  }
};
</script>

<style scoped>
</style>