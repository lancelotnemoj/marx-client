<template>
  <div class="home">
    {{JSON.stringify(m)}}
    <SingleMulti title="我是一个单项选择题" :choices="choices" v-model="m[0]" />
    <DoubleMulti title="我是一个双项选择题" :choices="choices" v-model="m[1]" />
    <TrueFalse title="我是一个判断题" :choices="choices" v-model="m[2]" />
  </div>
</template>

<script>
// @ is an alias to /src
import SingleMulti from "@/components/SingleMulti.vue";
import DoubleMulti from "@/components/DoubleMulti.vue";
import TrueFalse from "@/components/TrueFalse.vue";

export default {
  name: "home",
  components: {
    SingleMulti,
    DoubleMulti,
    TrueFalse
  },
  data() {
    return {
      m: new Array(),
      choices: [
        {
          tag: "A",
          content:
            "我是个长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的选项"
        },
        {
          tag: "B",
          content: "Bar"
        },
        {
          tag: "C",
          content: "Test"
        }
      ]
    };
  }
};
</script>
