<template>
  <div class="home" style="position: relative">
    <Grade :value="grade || 0" />

    <a-row type="flex" justify="center" align="top">
      <h1 class="exam-title">{{ exam.name }}</h1>
    </a-row>

    <a-row
      type="flex"
      justify="center"
      align="top"
      v-if="
        this.paper.single.length > 0 ||
        this.paper.multi.length > 0 ||
        this.paper.trueFalse.length > 0
      "
    >
      <a-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
        <div
          v-if="
            this.paper.single &&
            this.paper.single instanceof Array &&
            this.paper.single.length > 0
          "
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
          v-if="
            this.paper.multi &&
            this.paper.multi instanceof Array &&
            this.paper.multi.length > 0
          "
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
          v-if="
            this.paper.trueFalse &&
            this.paper.trueFalse instanceof Array &&
            this.paper.trueFalse.length > 0
          "
        >
          <h2>判断题</h2>
          <div
            v-for="singleAnswer in this.paper.trueFalse"
            :key="singleAnswer.id"
          >
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
    <div v-else>
      <a-empty>
        <span slot="description">
          <router-link to>
            <span @click="$router.go(-1)"> 无作答记录，点击返回 </span>
          </router-link>
        </span>
      </a-empty>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SingleReview from "@/components/SingleReview.vue";
import DoubleReview from "@/components/DoubleReview.vue";
import TFReview from "@/components/TFReview.vue";
import Grade from "@/components/Grade.vue";
import { GET } from "@/lib/fetch";
export default {
  name: "Answer",
  components: {
    SingleReview,
    DoubleReview,
    TFReview,
    Grade,
  },
  data() {
    return {
      paper: {},
      exam: {},
      grade: 0,
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const { data } = await GET("/client/review", {
        exam: this.$route.query.id,
      });

      const { raw = {}, questions = [], exam = {}, grade = -1 } = data;
      const paper = {};
      questions.forEach((elem) => {
        paper[elem.id] = elem;
      });
      Object.keys(raw).forEach((type) => {
        raw[type] = Object.keys(raw[type]).map((answerQuestion) => {
          return {
            answer: raw[type][answerQuestion],
            id: answerQuestion,
            ...paper[answerQuestion],
          };
        });
      });
      console.log(this.$data);
      this.paper = raw;
      this.exam = exam;
      this.grade = grade || 0;
      // console.log(raw);
    },
  },
};
</script>

<style scoped>
.exam-title {
  font-size: 32pt;
}
</style>