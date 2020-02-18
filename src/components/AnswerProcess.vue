<template>
  <div class="progress">
    <div v-for="(item, index) in status" v-bind:key="index">
      <span>{{item.name}}</span>
      <a-progress
        :percent="item.progress"
        size="small"
        :status="item.progress === 100 ? 'success' : item.progress < 40 ? 'exception' : 'active'"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: { status: Array }
};
</script>

<style scoped>
.progress {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 150px;
}
</style>