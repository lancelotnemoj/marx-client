<template>
  <a-breadcrumb style="margin: 16px 0" class="path">
    <a-breadcrumb-item>
      <router-link to="/">开始</router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item v-if="$route.path !== '/'">
      <router-link :to="$route.path">{{ $route.name }}</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  name: "BreadCrumb",
  data() {
    return {};
  },
  components: {},
  methods: {},
  model: {},
  watch: {}
};
</script>

<style scoped></style>
