<template>
  <div class="progress">
    <Remain :remainTick="remainTick" />
    <h2>答题进度</h2>
    <div v-for="(item, index) in status" v-bind:key="index">
      <div v-if="item.progress === item.progress">
        <span>{{item.name}}</span>
        <a-progress
          :percent="Number(item.progress.toFixed(2))"
          size="small"
          :status="item.progress === 100 
            ? 'success'
            : Number(item.progress) < 40
              ? 'exception'
              : 'active'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Remain from "../components/Remain.vue";

export default {
  props: {
    status: {
      type: Array,
      default: () => []
    },
    remainTime: {
      type: Number,
      default: -1
    }
  },
  components: { Remain },
  computed: {
    remainTick: function() {
      return parseInt(this.remainTime || -1);
    }
  }
};
</script>

<style scoped>
.progress {
  position: relative;
  position: sticky;
  top: 0;
  left: 0;
  padding-top: 12px;
  width: 300px;
  margin-bottom: -300px;
  background: rgba(255, 255, 255);
  z-index: 999;
  height: 300px;
}
/* @media (min-width: 1200px) {
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
} */

@media (max-width: 479px) {
  .progress {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
}
</style>