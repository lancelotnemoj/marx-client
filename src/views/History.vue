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
      examList: []
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