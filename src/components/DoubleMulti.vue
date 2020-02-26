<template>
  <div class="singleMulti">
    <h3>{{title}}</h3>
    <a-checkbox-group v-model="value">
      <div v-for="(opt, index) in Object.keys(choices)" v-bind:key="index">
        <div>
          <a-checkbox :value="opt">
            <span class="content">{{opt}}: {{choices[opt]}}</span>
          </a-checkbox>
        </div>
      </div>
    </a-checkbox-group>
  </div>
</template>

<script>
import { Checkbox, message } from "ant-design-vue";

export default {
  name: "DoubleMulti",
  props: {
    title: String,
    choices: Object,
    answer: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      value: []
    };
  },
  components: {
    aCheckbox: Checkbox,
    aCheckboxGroup: Checkbox.Group
  },
  methods: {},
  model: {
    prop: "answer", //绑定的值，通过父组件传递
    event: "update" //自定义时间名
  },
  created() {
    this.value = this.answer;
  },
  watch: {
    value: function(newQuestion, oldQuestion) {
      if (newQuestion.length >= 3) {
        this.value = oldQuestion.slice(0, 2);
        message.warning("多选题只有两个正确答案");
      }
      this.$emit("update", this.value);
    }
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
.content {
  margin-top: 0px;
  margin-bottom: 0px;
  max-width: 100%;
  white-space: normal !important;
}
</style>
