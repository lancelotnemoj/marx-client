<template>
  <div class="singleMulti">
    <h3>{{title}}</h3>
    <p style="font-size: 14px;">{{detail}}</p>

    <p class="select">你的判断：{{select ? "正确" : "错误"}}</p>
    <p>正确答案：{{right ? "正确" : "错误"}}</p>
  </div>
</template>

<script>
import { Switch, Icon } from "ant-design-vue";

export default {
  name: "TFReview",
  props: {
    title: String,
    detail: String,
    right: Boolean,
    select: Boolean
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
  methods: {},
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

.select {
  color: #1890ff;
}
</style>
