<template>
  <router-link :to="to" class="link">
    <a-card hoverable style="width: 100%; border-radius: 16px; overflow: hidden">
      <div slot="cover" class="cover">
        <img alt="cover" :src="src" />
      </div>
      <a-card-meta :title="title"></a-card-meta>
    </a-card>
  </router-link>
</template>

<script>
export default {
  name: "MenuLink",
  props: {
    title: String,
    to: [String, Object],
    src: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cover {
  width: 100%;
  height: 0px;
  padding-bottom: 33%;
  position: relative;
  overflow: hidden;
  /* border-radius: 10pt; */
}
.cover img {
  position: absolute;
  width: 100%;
  /* border-radius: 10pt; */
}

.link {
  margin-bottom: 32px;
}
</style>
