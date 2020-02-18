<template>
  <div class="home">
    <a-row type="flex" justify="center" align="top">
      <h1>XXX考试</h1>
    </a-row>
    <a-row type="flex" justify="center" align="top">
      <a-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
        {{JSON.stringify(m)}}
        <SingleReview title="我是一个单项选择题" :choices="choices" right="A" select="B" />

        <DoubleReview
          title="我是一个双项选择题"
          :choices="choices"
          :right="['A', 'B']"
          :select="['A', 'C']"
        />

        <TFReview
          title="我是一个判断题"
          :choices="choices"
          detail="我是描述我是描述我是描述我是描述我是描述"
          :right="true"
          :select="false"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
import SingleReview from "@/components/SingleReview.vue";
import DoubleReview from "@/components/DoubleReview.vue";
import TFReview from "@/components/TFReview.vue";

export default {
  name: "Answer",
  components: {
    SingleReview,
    DoubleReview,
    TFReview
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
