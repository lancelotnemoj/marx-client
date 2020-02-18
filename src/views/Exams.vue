<template>
  <div style="width: 100%">
    <a-tabs defaultActiveKey="1" tabPosition="left">
      <a-tab-pane tab="随堂测验" key="1">
        <ExamList :exams="inclass" />
      </a-tab-pane>
      <a-tab-pane tab="考试" key="2">
        <ExamList :exams="exams" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import ExamList from "@/components/ExamList.vue";

export default {
  components: {
    ExamList
  },
  data() {
    return {
      inclass: [
        { id: 1, name: "第一章随堂考试" },
        { id: 2, name: "第二章随堂考试" }
      ],
      exams: [{ id: 1, name: "半期考试" }, { id: 2, name: "期末考试" }]
    };
  },
  methods: {
    callback(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped>
</style>