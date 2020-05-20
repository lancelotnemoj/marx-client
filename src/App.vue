<template>
  <a-locale-provider :locale="zh_CN">
    <a-layout class="app">
      <Login
        :show="
        afterChecked && (!$root.user || Object.keys($root.user).length === 0)
      "
      />

      <div class="layout pc-layout">
        <Header />
        <hr class="divider pc-divider" style="height: 1px; width: calc(100% - 40px)" />

        <a-layout-content style="padding: 0 24px;flex-grow:2" class="content">
          <!-- <BreadCrumb /> -->
          <router-view />
        </a-layout-content>

        <a-layout-footer style="text-align: center">Marx ©2019 Created by Zato</a-layout-footer>
      </div>
    </a-layout>
  </a-locale-provider>
</template>


<script>
import Header from "@/components/Header.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { POST } from "@/lib/fetch";
import { notification } from "ant-design-vue";
import Login from "./components/Login";

import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

export default {
  name: "Index",
  components: {
    Header,
    BreadCrumb,
    Login
  },
  async created() {
    const { success, data } = await POST("/user/info");
    if (!success) {
      notification.error({
        message: "未登录"
      });
      this.$route.path !== "/" && this.$router.push("/");
    } else {
      this.$root.$data.user = data;
    }
    this.afterChecked = true;
    window.addEventListener("toHome", () => {
      this.$route.path !== "/" && this.$router.push("/");
      // this.$root.$data.user = {};
    });
  },
  data() {
    return {
      afterChecked: false,
      zh_CN
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+SC|Noto+Serif+SC&display=swap");

h1,
h2,
h3,
h4 {
  font-family: "Noto Serif SC", sans-serif;
}

p {
  font-family: "Noto Sans SC", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.layout {
  min-height: 100vh !important;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.pc-layout {
  max-width: 1200px; /* px */
  width: 100%;
}
.divider {
  border: none;
  height: 1px;
  background: gainsboro;
}
.pc-divider {
  max-width: 1200px; /* px */
  width: 100%;
}
</style>

<style scoped>
.content {
  display: flex !important;
  flex-direction: column !important;
  align-items: space-around;
}
</style>
