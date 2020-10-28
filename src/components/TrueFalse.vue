<template>
  <div class="singleMulti">
    <h3>{{index}}、{{title}}</h3>

    <a-radio-group @change="onChange" v-model="value" size="large">
      <a-radio :value="true" class="radio">
        <span class="content">
          正确
          <a-icon type="check" />
        </span>
      </a-radio>

      <a-radio :value="false" class="radio">
        <span class="content">
          错误
          <a-icon type="close" />
        </span>
      </a-radio>
    </a-radio-group>
    <!-- <div class="line">
      <a-switch :style="inline" @change="onChange" :checked="answer">
        <a-icon type="check" slot="checkedChildren" />
        <a-icon type="close" slot="unCheckedChildren" />
      </a-switch>

      <div>上述描述是：{{answer ? "正确" : "错误"}}的</div>
    </div>-->
  </div>
</template>

<script>
import { Switch, Icon } from "ant-design-vue";

export default {
  name: "TrueFalse",
  created() {
    // console.log(this.$props);
  },
  props: {
    index: Number,
    answer: Boolean,
    title: String
    // value: {
    //   type: Boolean,
    //   default: true
    // }
  },
  data() {
    return {
      value: undefined,
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
      // console.log(this.value);
      // this.value = v;
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

/* label {
  margin-top: 0px;
  margin-bottom: 0px;
  max-width: 100%;
  white-space: normal !important;
  font-size: 24px;
  margin-left: 8px;
} */

.content {
  margin-top: 0px;
  margin-bottom: 0px;
  max-width: 100%;
  white-space: normal !important;
}

.line {
  display: flex;
  align-items: center;
}
</style>
