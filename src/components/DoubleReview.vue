<template>
  <div class="singleMulti">
    <div class="title">{{title}}</div>
    <a-list :dataSource="choices">
      <a-list-item slot="renderItem" slot-scope="item">
        <div :class="select.indexOf(item.tag) > -1 ? 'select' : ''">{{item.tag}}、{{item.content}}</div>
      </a-list-item>
    </a-list>

    <p>正确答案： {{right.join("、")}}</p>
  </div>
</template>

<script>
import { Radio } from "ant-design-vue";

export default {
  name: "SingleMulti",
  props: {
    title: String,
    choices: Array,
    right: Array,
    select: Array
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

.right {
  color: #3fac09b0;
}

.select {
  color: #1890ff;
}
/* .radio {
  display: block;
  font-size: 0.35rem;
} */
</style>
