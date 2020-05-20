<template>
  <div class="home">
    <a-row type="flex" justify="center" align="top">
      <h1>{{exam.name}}</h1>
    </a-row>
    <a-row type="flex" justify="center" align="top">
      <a-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
        <div
          v-if="this.paper.single && this.paper.single instanceof Array && this.paper.single.length > 0"
        >
          <h2>单项选择题</h2>
          <div v-for="singleAnswer in this.paper.single" :key="singleAnswer.id">
            <SingleReview
              :title="singleAnswer.title"
              :choices="JSON.parse(singleAnswer.detail)"
              :right="JSON.parse(singleAnswer.right)[0]"
              :select="singleAnswer.answer"
            />
          </div>
        </div>

        <div
          v-if="this.paper.multi && this.paper.multi instanceof Array && this.paper.multi.length > 0"
        >
          <h2>双项选择题</h2>
          <div v-for="singleAnswer in this.paper.multi" :key="singleAnswer.id">
            <DoubleReview
              :title="singleAnswer.title"
              :choices="JSON.parse(singleAnswer.detail)"
              :right="JSON.parse(singleAnswer.right)"
              :select="singleAnswer.answer"
            />
          </div>
        </div>

        <div
          v-if="this.paper.trueFalse && this.paper.trueFalse instanceof Array && this.paper.trueFalse.length > 0"
        >
          <h2>判断题</h2>
          <div v-for="singleAnswer in this.paper.trueFalse" :key="singleAnswer.id">
            <TFReview
              :title="singleAnswer.title"
              detail
              :right="JSON.parse(singleAnswer.right)[0] === 'true'"
              :select="singleAnswer.answer"
            />
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
import SingleReview from "@/components/SingleReview.vue";
import DoubleReview from "@/components/DoubleReview.vue";
import TFReview from "@/components/TFReview.vue";
import { GET } from "@/lib/fetch";
export default {
  name: "Answer",
  components: {
    SingleReview,
    DoubleReview,
    TFReview
  },
  data() {
    return {
      paper: {},
      exam: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const { data } = await GET("/client/review", {
        exam: this.$route.query.id
      });
      const { raw = {}, questions = [], exam = {} } = data;
      const paper = {};
      questions.forEach(elem => {
        paper[elem.id] = elem;
      });
      Object.keys(raw).forEach(type => {
        raw[type] = Object.keys(raw[type]).map(answerQuestion => {
          return {
            answer: raw[type][answerQuestion],
            id: answerQuestion,
            ...paper[answerQuestion]
          };
        });
      });
      this.paper = raw;
      this.exam = exam;
      console.log(raw);
    }
  }
};
</script>
