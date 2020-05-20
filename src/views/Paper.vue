<template>
  <div class="home">
    <a-row type="flex" justify="center" align="top">
      <h1>{{exam.name || "树人大学考试系统"}}</h1>
    </a-row>
    <a-row type="flex" justify="center" align="top">
      <a-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
        <div>
          <AnswerProcess :status="status" />
          <h2 v-if="single.length > 0">单项选择题</h2>
          <a-divider />
          <div v-for="item in single" :key="item.id">
            <SingleMulti
              :title="item.title"
              :choices="JSON.parse(item.detail)"
              v-model="paper.single[item.id]"
            />
          </div>

          <h2 v-if="multi.length > 0">双项选择题</h2>
          <a-divider />
          <div v-for="item in multi" :key="item.id">
            <DoubleMulti
              :title="item.title"
              :choices="JSON.parse(item.detail)"
              v-model="paper.multi[item.id]"
            />
          </div>

          <h2 v-if="trueFalse.length > 0">判断题</h2>
          <a-divider />
          <div v-for="item in trueFalse" :key="item.id">
            <TrueFalse :title="item.title" v-model="paper.trueFalse[item.id]" />
          </div>
        </div>
        <a-button type="danger" ghost style="width:100%" @click="finishup">提交</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
import SingleMulti from "@/components/SingleMulti.vue";
import DoubleMulti from "@/components/DoubleMulti.vue";
import TrueFalse from "@/components/TrueFalse.vue";
import AnswerProcess from "@/components/AnswerProcess.vue";
import { GET, POST } from "@/lib/fetch";
import { notification } from "ant-design-vue";

export default {
  name: "Answer",
  components: {
    SingleMulti,
    DoubleMulti,
    TrueFalse,
    AnswerProcess
  },
  computed: {
    status: function() {
      // console.log("here", Object.values(this.paper.multi), this.paper.multi);
      return [
        {
          name: "单项选择题",
          progress:
            (Object.keys(this.paper.single).length / this.single.length) * 100
        },
        {
          name: "双项选择题",
          progress:
            (Object.values(this.paper.multi).reduce(
              (prev, now) =>
                now instanceof Array && now.length > 0 ? prev + 1 : prev,
              0
            ) /
              this.multi.length) *
            100
        },
        {
          name: "判断题",
          progress:
            (Object.keys(this.paper.trueFalse).length / this.trueFalse.length) *
            100
        }
      ];
    }
  },
  data() {
    return {
      single: [],
      multi: [],
      trueFalse: [],
      paper: {
        single: {},
        multi: {},
        trueFalse: {}
      },
      exam: {},
      unSaveSteps: 0
    };
  },
  watch: {
    paper: {
      handler: function(newValue) {
        this.unSaveSteps += 1;
        if (this.unSaveSteps === 5) {
          this.backup();
          this.unSaveSteps = 0;
        }
      },
      deep: true
    }
  },
  methods: {
    backup: function() {
      POST("/client/backup", {
        data: this.paper,
        exam: this.exam.id
      });
    },
    finishup: function() {
      POST("/client/finishup", {
        data: this.paper,
        exam: this.exam.id
      }).then(res => {
        if (res.success) {
          notification.success({
            message: "交卷成功",
            duration: 2
          });
          this.$router.push("/");
        } else {
          notification.error({
            message: "系统繁忙,请稍后"
          });
        }
      });
    }
  },
  created() {
    // console.log(this.$route.query);
    // 打散逻辑
    setTimeout(() => {
      GET("/client/paper", {
        id: this.$route.query.id
      }).then(res => {
        // console.log(res.current);
        this.single = res.paper.single || [];
        this.multi = res.paper.multi || [];
        this.trueFalse = res.paper.trueFalse || [];
        this.paper =
          res.current !== undefined && typeof res.current === "string"
            ? JSON.parse(res.current)
            : {
                single: {},
                multi: {},
                trueFalse: {}
              };
        this.exam = res.exam;
      });
    }, Math.random());
  }
};
</script>
