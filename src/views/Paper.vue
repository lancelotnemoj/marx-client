<template>
  <div class="home">
    <div class="loading" v-if="loading === true">
      <a-spin>
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      </a-spin>
      <div class="spin-content">加载中，请稍等</div>
    </div>
    <AnswerProcess :status="status" :remainTime="remain" />

    <a-row type="flex" justify="center" align="top">
      <h1 class="exam-title">{{exam.name || "树人大学考试系统"}}</h1>
    </a-row>

    <a-row type="flex" justify="center" align="top">
      <a-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
        <div>
          <h2 v-if="single.length > 0" class="type-title">单项选择题</h2>

          <a-divider />
          <div v-for="(item, index) in single" :key="item.id">
            <SingleMulti
              :index="index + 1"
              :title="item.title"
              :choices="JSON.parse(item.detail)"
              v-model="paper.single[item.id]"
            />
          </div>

          <h2 v-if="multi.length > 0" class="type-title">双项选择题</h2>
          <a-divider />
          <div v-for="(item, index) in multi" :key="item.id">
            <DoubleMulti
              :index="index + 1"
              :title="item.title"
              :choices="JSON.parse(item.detail)"
              v-model="paper.multi[item.id]"
            />
          </div>

          <h2 v-if="trueFalse.length > 0" class="type-title">判断题</h2>
          <a-divider />
          <div v-for="(item, index) in trueFalse" :key="item.id">
            <TrueFalse :index="index + 1" :title="item.title" v-model="paper.trueFalse[item.id]" />
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row class="finishup">
      <a-button type="primary" class="finishup_btn" @click="finishup">提交</a-button>
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
            (Object.keys(this.paper.single || {}).length / this.single.length) *
            100
        },
        {
          name: "双项选择题",
          progress:
            (Object.values(this.paper.multi || {}).reduce(
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
            (Object.keys(this.paper.trueFalse || {}).length /
              this.trueFalse.length) *
            100
        }
      ];
    },
    remain: function() {
      return (
        this.exam.endAt - this.exam.startAt - this.sum - (this.now - this.start)
      );
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
      loading: true,
      backuping: false,
      exam: {},
      unSaveSteps: 0,
      now: Date.now()
    };
  },
  watch: {
    paper: {
      handler: function() {
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
      if (this.backuping === false) {
        this.backuping = true;
        return POST("/client/backup", {
          data: this.paper,
          exam: this.exam.id
        }).then(() => {
          this.backuping === false;
        });
      } else {
        return Promise.resolve();
      }
    },
    finishup: function() {
      this.$router.replace({
        name: "judge",
        params: {
          paper: JSON.parse(JSON.stringify(this.paper)),
          exam: this.exam
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
        let tempValue =
          res.current !== undefined && typeof res.current === "string"
            ? JSON.parse(res.current)
            : {
                single: {},
                multi: {},
                trueFalse: {}
              };
        this.paper = tempValue;
        this.exam = res.exam;
        this.sum = res.sum;
        this.now = Date.now();
        this.start = Date.now();
        this.loading = false;
      });
    });
  },
  mounted() {
    const that = this;
    setInterval(() => {
      that.now = Date.now();
    }, 1000);

    window.onbeforeunload = async function() {
      await that.backup();
    };
  },
  destroyed() {
    window.onbeforeunload = null;
  }
};
</script>

<style scoped>
.loading {
  background: rgba(32, 32, 32, 0.7);
  color: white;
  font-size: 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home {
  position: relative;
}
.exam-title {
  font-size: 32pt;
}

.type-title {
  background: white;
  z-index: 20;
  position: sticky;
  top: 0;
}

.finishup {
  width: 100%;
  position: fixed;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 99;
}

.finishup_btn {
  width: 100%;
  max-width: 1200px;
  margin: auto;
}
</style>