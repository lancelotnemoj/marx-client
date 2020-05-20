<template>
  <div style="width: 100%">
    <a-tabs defaultActiveKey="2" tabPosition="top">
      <a-tab-pane tab="考试" key="2">
        <ExamList :exams="exams" />
      </a-tab-pane>
      <a-tab-pane tab="随堂测验" key="1">
        <ExamList :exams="inclass" />
      </a-tab-pane>
      <a-tab-pane tab="历史记录" key="3">
        <HistoryList :exams="history" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import ExamList from "@/components/ExamList.vue";
import HistoryList from "@/components/HistoryList.vue";
import arrayDivider from "@/lib/arrayDivider";
import { GET } from "@/lib/fetch";
export default {
  components: {
    ExamList,
    HistoryList
  },
  created() {
    this.init();
    // if (this.isPC()) {
    //   this.tabPosition = "top";
    // }
  },
  computed: {
    isPC: function() {
      const mql = window.matchMedia("(max-width: 768px)");
      return mql.matches || false;
    }
  },
  data() {
    return {
      inclass: [],
      exams: [],
      history: [],
      tabPosition: "left"
    };
  },
  methods: {
    callback() {
      // console.log(val);
    },

    async init() {
      if (!this.$route.query.id) {
        this.$router.push("/");
      }
      const { data } = await GET("/client/exams", {
        id: this.$route.query.id
      });
      const now = new Date().getTime();
      const { success: finished, failure: todo } = arrayDivider(
        data,
        element => {
          // console.log(element.endAt, element.endAt - now < 0, element.name);
          return element.endAt - now < 0 || element.AnswerExam.status === "FIN";
        }
      );
      const { success, failure } = arrayDivider(todo, element => element.usage);
      this.history = finished;
      this.inclass = failure;
      this.exams = success;
    }
  }
};
</script>

<style scoped>
</style>