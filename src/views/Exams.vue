<template>
  <div style="width: 100%">
    <a-tabs defaultActiveKey="2" tabPosition="top">
      <a-tab-pane tab="考试" key="2">
        <ExamList :exams="exams" :now="currTime" />
      </a-tab-pane>
      <a-tab-pane tab="随堂测验" key="1">
        <ExamList :exams="inclass" :now="currTime" />
      </a-tab-pane>
      <a-tab-pane tab="历史记录" key="3">
        <HistoryList :exams="history" :now="currTime" />
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
    HistoryList,
  },
  created() {
    this.init();
    // if (this.isPC()) {
    //   this.tabPosition = "top";
    // }
  },
  computed: {
    isPC: function () {
      const mql = window.matchMedia("(max-width: 768px)");
      return mql.matches || false;
    },
  },
  data() {
    return {
      inclass: [],
      exams: [],
      history: [],
      tabPosition: "left",
      currTime: -1,
    };
  },
  methods: {
    callback() {
      // console.log(val);
    },

    async init() {
      console.log("init");
      if (!this.$route.query.id) {
        this.$router.push("/");
      }
      const [{ data }, { data: curr }] = await Promise.all([
        GET("/client/exams", {
          id: this.$route.query.id,
        }),
        GET("/client/time"),
      ]);

      const now = curr || Date.now();
      // 已经结束的考试： finished
      const { success: finished, failure: todo } = arrayDivider(
        data,
        (element) => {
          // console.log(
          //   element.endAt,
          //   now,
          //   element.endAt - now < 0,
          //   element.name
          // );
          return element.endAt - now < 0 || element.status === "FIN";
        }
      );

      const { success, failure } = arrayDivider(
        todo,
        (element) => element.usage
      );
      this.history = finished;
      this.inclass = failure;
      this.exams = success;
      this.currTime = now;
    },
  },
};
</script>

<style scoped>
</style>

