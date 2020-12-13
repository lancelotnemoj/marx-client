<template>
  <div
    style="
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    "
  >
    <a-result :title="current < 2 ? '正在处理中' : `你的成绩：${grade}`">
      <template #icon>
        <a-icon type="smile" theme="twoTone" />
      </template>
      <template #extra>
        <a-button type="primary" @click="save">导出原始作答数据</a-button>
        <a-button type="primary" @click="home">回到首页</a-button>
      </template>
    </a-result>
    <a-steps :current="current">
      <a-step
        title="答卷上交"
        description="原始答卷已经保存在本地，请勿关闭浏览器"
      />
      <a-step title="系统判卷" description="判卷会花费一些时间，请耐心等待" />
      <a-step title="获取成绩" description="如有异常，请立即与监考老师联系" />
    </a-steps>
  </div>
</template>

<script>
// @ is an alias to /src
import { POST, DOWNLOAD } from "@/lib/fetch";
import { notification } from "ant-design-vue";

export default {
  name: "Judge",
  components: {},
  computed: {},
  data() {
    return {
      current: 0,
      grade: -1,
    };
  },
  async mounted() {
    const that = this;
    // try {
    if (
      !this.$route.params ||
      Object.keys(this.$route.params).length === 0 ||
      this.$route.params.paper === undefined
    ) {
      this.$router.go(-1);
    }

    const list = ["multi", "trueFalse", "single"]
      .map((type) => {
        try {
          return Object.keys(this.$route.params.paper[type] || {});
        } catch (error) {
          return {};
        }
      })
      .reduce((prev, item) => [...prev, ...item], []);

    const res = await POST("/client/finishup", {
      data: this.$route.params.paper,
      exam: this.$route.params.exam.id,
      list,
    });
    if (res.success) {
      notification.success({
        message: "交卷成功",
        duration: 2,
      });
      that.current = 1;
    } else {
      notification.error({
        message: "系统繁忙,请稍后",
      });
    }

    const rightAnswer = res.answer.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.id]: Array.from(JSON.parse(curr.right)).sort((a, b) =>
          a.localeCompare(b)
        ),
      }),
      {}
    );

    const judgeResult = ["multi", "trueFalse", "single"].map((type) => {
      const typePaper = this.$route.params.paper[type];
      return Object.keys(typePaper).map((quezKey) => {
        try {
          let answer = typePaper[quezKey].filter((item) => item && item !== "");
          let right = rightAnswer[quezKey].filter(
            (item) => item && item !== ""
          );
          if (right.length === 2) {
            answer = answer
              .map((item) => item.toUpperCase())
              .sort((a, b) => a.charCodeAt() - b.charCodeAt());
            right = right
              .map((item) => item.toUpperCase())
              .sort((a, b) => a.charCodeAt() - b.charCodeAt());

            return (
              String(right[0]).toUpperCase() ===
                String(answer[0]).toUpperCase() &&
              String(right[1] === answer[1]).toUpperCase()
            );
          } else {
            answer = String(answer).toUpperCase();
            right = String(right[0]).toUpperCase();

            return right === answer;
          }
        } catch (error) {
          return true;
        }
      });
    });

    const grade = judgeResult.reduce(
      (prev, curr) =>
        prev +
        curr.reduce(
          (_prev, _curr) =>
            _prev + (String(_curr).toUpperCase() === "TRUE" ? 1 : 0),
          0
        ),
      0
    );

    await POST("/client/report", {
      exam: this.$route.params.exam.id,
      grade,
      raw: this.$route.params.paper,
    });

    this.current += 1;
    this.grade = grade;

    // } catch (error) {}
  },
  methods: {
    save() {
      DOWNLOAD(
        `${this.$root.user.name}-${this.$route.params.exam.id}.paper`,
        JSON.stringify(this.$route.params.paper, null, 2)
      );
    },
    home() {
      this.$router.replace({
        name: "home",
      });
    },
  },
};
</script>
