import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "lib-flexible/flexible.js";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";

// import fetch from "./lib/fetch";

Vue.use(Antd);

Vue.config.productionTip = false;
// Vue.prototype.$fetch = fetch;

new Vue({
  el: "#app",
  router,
  render: h => h(App),
  data: {
    user: {}
  }
});
