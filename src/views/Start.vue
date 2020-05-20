<template>
  <div class="home">
    <a-row :gutter="40" type="flex" v-if="courses.length > 0">
      <!-- <a-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" :span="20" class="card">
        <menu-link
          title="测验与考试"
          to="/exams"
          src="http://www.zhizhentech.com/wp-content/uploads/2019/02/%E5%9C%A8%E7%BA%BF%E8%80%83%E8%AF%95%E8%AF%84%E6%B5%8B%E7%B3%BB%E7%BB%9F-2.jpg"
        />
      </a-col>
      <a-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" :span="20" class="card">
        <menu-link
          title="考试历史"
          to="/history"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </a-col>-->
      <a-col
        v-for="item in courses"
        :key="item.id"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
        :span="20"
        class="card"
      >
        <menu-link
          :title="item.name"
          :to="{
            path: '/exams',
            query: {
              id: item.id
            }
          }"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </a-col>
    </a-row>
    <a-empty
      v-else
      style="flex: 2;align-items: center;
    justify-content: center;
    display: flex;"
    />
  </div>
</template>

<script>
import MenuLink from "@/components/MenuLink.vue";
import { GET } from "@/lib/fetch";
export default {
  name: "home",
  components: {
    MenuLink
  },
  data() {
    return {
      courses: []
    };
  },
  created() {},
  methods: {
    init: function() {
      GET("/client/courses").then(res => {
        this.courses = res.data;
      });
    }
  },
  computed: {
    user: function() {
      return this.$root.user;
    }
  },
  watch: {
    user: {
      handler: function(newValue, oldValue) {
        if (newValue && Object.keys(newValue).length > 0) {
          console.log("here");
          this.init();
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.home {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;
}

a-col {
  margin-bottom: 20px;
}
.card {
  /* text-decoration: none;
  display: block;
  height: 300px;
  background: #555;
  color: #eee;
  display: flex;
  justify-content: center;
  align-items: center; */
  margin-bottom: 24px;
}
</style>
