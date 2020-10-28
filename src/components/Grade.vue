<template>
  <div class="grade" v-if="value >= 0">
    <h3>{{value}}</h3>
    <div class="under-line-short" />
    <div class="under-line" />
  </div>
</template>

<script>
export default {
  name: "TrueFalse",
  props: ["value"],
  created() {
    // console.log(this.$props);
  }
};
</script>

<style scoped>
.grade {
  color: rgb(223, 35, 35);
  position: absolute;
  top: 0;
  right: 0;
  font-size: 96px;
  text-align: center;
}

.grade h3 {
  color: rgb(223, 35, 35);
  line-height: 1;
  top: 0;
  right: 0;
  font-size: 96px;
  margin: 0;
  text-align: center;
}

.under-line-short {
  background: rgb(223, 35, 35);
  margin-top: 8px;
  height: 3px;
  transform: rotate(-10deg);
  width: 90px;
}

.under-line {
  background: rgb(223, 35, 35);
  margin-top: 8px;
  height: 3px;
  width: 100px;
  transform: rotate(-12deg);
}
</style>
