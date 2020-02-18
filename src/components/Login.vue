<template>
  <a-modal
    :visible="show"
    okText="登录"
    @ok="handleLogin"
    :closable="false"
    cancelText="清空"
    @cancel="handleCancel"
  >
    <h1 style="text-align: center">用户登录</h1>
    <customized-form
      :password="fields.password"
      :id="fields.id"
      @change="handleFormChange"
    />
  </a-modal>
</template>

<script>
import { POST } from "@/lib/fetch";
import { notification } from "ant-design-vue";
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
