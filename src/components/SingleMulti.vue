<template>
  <div class="singleMulti">
    <h3>{{index}}、{{title}}</h3>
    <a-radio-group @change="onChange" v-model="value" size="large">
      <div v-for="(opt, index) in Object.keys(choices)" v-bind:key="index">
        <a-radio :value="opt" class="radio">
          <span class="content">{{opt}}: {{choices[opt]}}</span>
        </a-radio>
      </div>
    </a-radio-group>
  </div>
</template>

<script>
import { Radio } from "ant-design-vue";

export default {
  name: "SingleMulti",
  props: {
    title: String,
    index: Number,
    choices: Object,
    answer: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      value: ""
    };
  },
  components: {
    aRadio: Radio,
    aRadioGroup: Radio.Group
  },
  created() {
    this.value = this.answer;
  },
  methods: {
    onChange: function() {
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
.content {
  margin-top: 0px;
  margin-bottom: 0px;
  max-width: 100%;
  white-space: normal !important;
}

/* .radio {
  display: block;
  font-size: 0.35rem;
} */
</style>
