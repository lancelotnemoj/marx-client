<template>
  <div class="lists">
    <a-timeline>
      <a-timeline-item
        v-for="(exam, i) in examList"
        v-bind:key="i"
        :color="
        new Date(exam.time).getTime() < new Date().getTime() ? (new Date().getTime() - new Date(exam.time).getTime() < 86400000 ? 'red' :'green' ) : 'blue'"
      >
        <router-link to="/review">{{exam.title}} {{new Date(exam.time).toLocaleDateString()}}</router-link>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script>
export default {
  name: "History",
  data() {
    return {
      examList: [
        {
          title: "马原期中考试",
          time: "Sun Nov 11 2018 08:00:00 GMT+0800 (中国标准时间)"
        },
        {
          title: "现在时刻",
          time: "Tue Oct 15 2019 19:08:43 GMT+0800 (中国标准时间)"
        },
        {
          title: "马原期末考试",
          time: "Mon Nov 11 2019 08:00:00 GMT+0800 (中国标准时间)"
        }
      ]
    };
  }
};
</script>

<style scoped>
.lists {
  flex-grow: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>