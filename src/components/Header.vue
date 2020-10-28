<template>
  <div class="header-main">
    <!-- <div class="header-wrap"> -->
    <a-layout-header
      class="header"
      style="background: transparent; height: auto; padding: 0px 18px 12px 18px"
    >
      <router-link to="/" style="display: flex; justify-content: center; flex-wrap: wrap;">
        <img :src="require('../assets/logo.png')" class="logo" />
        <h1 class="title" style="color: white;padding: 0; margin: 0px 12px;font-size: 24px">思政课考试系统</h1>
      </router-link>

      <router-link to="/info" style="display: flex; justify-content: center;">
        <a-avatar
          size="large"
          @click="goUserInfo"
          style="cursor: pointer; color: #005752; backgroundColor: 00a79e"
        >
          {{
          $root.user.name ? $root.user.name : "登录"
          }}
        </a-avatar>
        <span
          style="font-size: 16pt; margin-left: 18px; height: 40px; line-height: 40px"
        >{{$root.user.idnumber}}</span>
      </router-link>
    </a-layout-header>
    <!-- </div> -->
    <div
      class="header"
      style="background: transparent; height: auto; padding: 0 0px 0 0px; width: 100%; max-width: 1200px; margin: auto"
    >
      <!-- <a-affix :offsetTop="0" style="width: 100%"> -->
      <p
        class="frost"
        style="padding: 6px; margin: 0; cursor: pointer;font-size: 12px; color: white"
        @click="goBack"
        v-if="
          $route.matched instanceof Array &&
            $route.matched.length > 0 &&
            $route.matched[0].path !== ''
        "
      >
        <a-icon type="caret-left" theme="filled" />返回上一步
      </p>
      <p style="padding: 0; margin: 0;height: 18px" v-else></p>
      <!-- </a-affix> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    handler: function() {
      this.$router.push("/");
    },
    goBack: function() {
      // console.log(this.$route.matched, this.$route.matched[0]);
      this.$router.go(-1);
    },
    goUserInfo: function() {
      if (this.$router.history.current.path !== "/info")
        this.$router.push("/info");
    }
  }
};
</script>

<style scoped>
.header-main {
  background: #005752;
  width: 100%;
}

.header {
  /* margin: 16pt 40pt 16pt 40pt !important; */
  margin: 0;
  padding: 0;
  color: #443535;
  display: flex;
  width: 80vw;
  max-width: 1200px; /* !px */
  flex-direction: row;
  /* justify-content: flex-start; */
  justify-content: space-between;
  align-items: center;
  margin: auto;
}
/* 
.header-wrap {
  max-width: 1200px;
  width: 100%;
  margin: auto;
} */

.title {
  font-size: 24pt;
  display: inline-block;
  text-align: center;
}
.logo {
  height: 100px;
  margin: 0;
  position: relative;
}

.frost {
  position: relative;
  position: sticky;
  overflow: hidden;
  width: 100%;
}
.frost::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: inherit;
  background-attachment: fixed;
}
.frost::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  filter: blur(16px);
  overflow: hidden;
  background: rgba(0, 0, 0, 0.25);
}

a {
  text-decoration: none;
  color: white;
}
</style>
