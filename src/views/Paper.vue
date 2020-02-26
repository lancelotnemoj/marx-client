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
              :choices="item.detail"
              v-model="paper.single[item.id]"
            />
          </div>

          <h2 v-if="multi.length > 0">双项选择题</h2>
          <a-divider />
          <div v-for="item in multi" :key="item.id">
            <DoubleMulti :title="item.title" :choices="item.detail" v-model="paper.multi[item.id]" />
          </div>

          <h2 v-if="trueFalse.length > 0">判断题</h2>
          <a-divider />
          <div v-for="item in trueFalse" :key="item.id">
            <TrueFalse :title="item.title" v-model="paper.trueFalse[item.id]" />
          </div>
        </div>
        {{JSON.stringify(paper)}}
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
      return [
        {
          name: "单项选择题",
          progress:
            (Object.keys(this.paper.single).length / this.single.length) * 100
        },
        {
          name: "双项选择题",
          progress:
            (Object.keys(this.paper.multi).length / this.multi.length) * 100
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
    }
  },
  created() {
    GET("/client/paper").then(res => {
      console.log(res.current);
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
  }
};
</script>
