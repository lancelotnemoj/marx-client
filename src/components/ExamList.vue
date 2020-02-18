<template>
  <a-list size="large" bordered :dataSource="exams">
    <a-list-item slot="renderItem" slot-scope="exam">
      <router-link class="line" to="/paper">
        <div>{{exam.name}}</div>
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
    exams: Array
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