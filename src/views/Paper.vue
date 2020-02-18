<template>
  <div class="home">
    <AnswerProcess :status="status" />
    <a-row type="flex" justify="center" align="top">
      <h1>XXX考试</h1>
    </a-row>
    <a-row type="flex" justify="center" align="top">
      <a-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
        {{JSON.stringify(m)}}
        <SingleMulti title="我是一个单项选择题" :choices="choices" v-model="m[0]" />
        <SingleMulti title="我是一个单项选择题" :choices="choices" v-model="m[0]" />

        <DoubleMulti title="我是一个双项选择题" :choices="choices" v-model="m[1]" />

        <TrueFalse title="我是一个判断题" :choices="choices" v-model="m[2]" detail="我是描述我是描述我是描述我是描述我是描述" />

        <SingleMulti title="我是一个单项选择题" :choices="choices" v-model="m[0]" />
        <SingleMulti title="我是一个单项选择题" :choices="choices" v-model="m[0]" />

        <DoubleMulti title="我是一个双项选择题" :choices="choices" v-model="m[1]" />

        <TrueFalse title="我是一个判断题" :choices="choices" v-model="m[2]" />

        <SingleMulti title="我是一个单项选择题" :choices="choices" v-model="m[0]" />
        <SingleMulti title="我是一个单项选择题" :choices="choices" v-model="m[0]" />

        <DoubleMulti title="我是一个双项选择题" :choices="choices" v-model="m[1]" />

        <TrueFalse title="我是一个判断题" :choices="choices" v-model="m[2]" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
import SingleMulti from "@/components/SingleMulti.vue";
import DoubleMulti from "@/components/DoubleMulti.vue";
import TrueFalse from "@/components/TrueFalse.vue";
import AnswerProcess from "@/components/AnswerProcess.vue";

export default {
  name: "Answer",
  components: {
    SingleMulti,
    DoubleMulti,
    TrueFalse,
    AnswerProcess
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
      ],
      status: [
        {
          name: "单项选择题",
          progress: 30
        },
        {
          name: "双项选择题",
          progress: 100
        },
        {
          name: "判断题",
          progress: 50
        }
      ]
    };
  }
};
</script>
