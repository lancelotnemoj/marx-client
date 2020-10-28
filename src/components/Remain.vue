<template>
  <div v-if="tobj !== undefined">
    <h2>距离考试结束还有</h2>
    <h3 style="font-weight: bold">{{tobj.hh}} 时 {{tobj.mm}} 分 {{tobj.ss}} 秒</h3>
  </div>
</template>

<script>
export default {
  props: ["remainTick"],
  created() {},
  computed: {
    tobj: function() {
      if (!this.remainTick || this.remainTick < 0) {
        return undefined;
      } else {
        var hh = Math.floor((this.remainTick / 1000 / 60 / 60) % 24);
        var mm = Math.floor((this.remainTick / 1000 / 60) % 60);
        var ss = Math.floor((this.remainTick / 1000) % 60);
        return {
          hh,
          mm,
          ss
        };
      }
    }
  }
};
</script>