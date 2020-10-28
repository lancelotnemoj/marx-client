<template>
  <a-list size="large" bordered :dataSource="exams">
    <a-list-item slot="renderItem" slot-scope="exam">
      <router-link
        class="line"
        :disabled="exam.usage === true && (exam.endAt >= Date.now())"
        :to="{path: '/review',
          query: {
          id: exam.id
        }}"
      >
        <div>
          {{
          (exam.usage === true && (exam.endAt >= Date.now()))
          ? "[未结束]"
          : ""
          }} {{exam.name}}
        </div>
        <div>
          详情
          <a-icon type="arrow-right" />
        </div>
      </router-link>
    </a-list-item>
  </a-list>
</template>

<script>
import { notification } from "ant-design-vue";
export default {
  name: "ExamList",
  props: {
    exams: Array
  },
  mounted() {
    // console.log(this.$props.exams);
  },
  methods: {
    handleClick(exam) {
      // if (exam.usage === false) return;
      // console.log(new Date(exam.endAt));
      if ((exam.endAt || Date.now()) < Date.now()) {
        notification.warn({
          message: "考试尚未结束，再逛逛吧"
        });
      }
    }
  }
};
</script>

<style scoped>
.line {
  display: flex;
  flex-grow: 2;
  justify-content: space-between;
}
</style>