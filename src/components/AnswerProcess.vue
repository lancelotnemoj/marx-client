<template>
  <div class="progress">
    <h2>答题进度</h2>
    <div v-for="(item, index) in status" v-bind:key="index">
      <span>{{item.name}} {{item.progress}}</span>
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
  props: {
    status: {
      type: Array,
      default: []
    }
  }
};
</script>

<style scoped>
.progress {
  padding-top: 12px;
  width: 100%;
  background: rgba(255, 255, 255);
  z-index: 9999;
}
@media (min-width: 1200px) {
  .progress {
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
}

@media (min-width: 767px) and (max-width: 1199px) {
  .progress {
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
}
@media (min-width: 480px) and (max-width: 768px) {
  .progress {
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
}

@media (max-width: 479px) {
  .progress {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
}
</style>