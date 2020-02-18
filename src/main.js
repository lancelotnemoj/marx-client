import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "lib-flexible/flexible.js";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";

Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: h => h(App),
  data: {
    user: {}
  }
});
