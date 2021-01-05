<template>
  <a-list size="large" bordered :dataSource="exams">
    <a-list-item slot="renderItem" slot-scope="exam">
      <router-link
        class="line"
        :disabled="exam.startAt > now"
        :to="{
        path: '/paper',
        query: {
        id: exam.id
      }}"
      >
        <div>{{exam.startAt > now ? "[未开始]" : ""}}{{exam.name}}</div>
        <div>
          去作答
          <a-icon type="arrow-right" />
        </div>
      </router-link>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  name: "ExamList",
  props: {
    exams: Array,
    now: {
      type: Number
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