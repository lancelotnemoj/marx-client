<template>
  <div class="singleMulti">
    <div class="title">{{title}}</div>
    <p style="font-size: 14px;">{{detail}}</p>
    <div class="line">
      <a-switch :style="inline" @change="onChange">
        <a-icon type="check" slot="checkedChildren" />
        <a-icon type="close" slot="unCheckedChildren" />
      </a-switch>

      <label>上述描述是：{{value ? "正确" : "错误"}}的</label>
    </div>
  </div>
</template>

<script>
import { Switch, Icon } from "ant-design-vue";

export default {
  name: "TrueFalse",
  props: {
    title: String,
    detail: String
  },
  data() {
    return {
      value: true,
      inline: {
        display: "inline"
      }
    };
  },
  components: {
    aSwitch: Switch,
    aIcon: Icon
  },
  methods: {
    onChange: function(v) {
      this.value = v;
      this.$emit("update", this.value);
    }
  },
  model: {
    prop: "answer", //绑定的值，通过父组件传递
    event: "update" //自定义时间名
  }
};
</script>

<style scoped>
.singleMulti {
  width: 100%;
  margin: 8px;
  margin-bottom: 64px;
}
.title {
  max-width: 100%;
  white-space: normal;
  font-size: 32px;
  margin-bottom: 16px;
}

label {
  margin-top: 0px;
  margin-bottom: 0px;
  max-width: 100%;
  white-space: normal !important;
  font-size: 24px;
  margin-left: 8px;
}

.line {
  display: flex;
  align-items: center;
}
</style>
