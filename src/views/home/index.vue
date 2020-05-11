<template>
  <!-- 人生删除手册 -->
  <div class="delete-home">
    <div class="page-content">
      <!-- 顶部图片 -->
      <div class="home-top">
        <div class="top-box">
          <van-image lazy-load :src="topImg || defaultImg" />
        </div>
      </div>
      <div class="top-word">{{ headData.value || "愿你成为最好的自己" }}</div>
      <!-- 首页列表 -->
      <div class="home-list" v-for="(items, j) in mainList" :key="j">
        <van-row>
          <van-col span="5">{{ items.time | comTime }}</van-col>
          <van-col span="5">
            <van-image lazy-load :src="items.img" />
          </van-col>
          <van-col span="14">{{ items.value || "" }}</van-col>
        </van-row>
      </div>
    </div>
    <!-- 弹框 -->
    <!-- <van-popup v-model="popFlag">{{popContent}}</van-popup> -->
  </div>
</template>

<script>
import transferDom from "@/directives/transferDom";
import baseMenuInfo from "./menuList";
import XLSX from "xlsx";
export default {
  name: "home",
  components: {},
  data() {
    return {
      headData: [],
      defaultImg: baseMenuInfo.moduleList.topMenu[0].img,
      topImg: baseMenuInfo.moduleList.homeUrl + 'img/home/0.jpg',
      menuList: baseMenuInfo.moduleList,
      mainList: [],
      baseUrl: baseMenuInfo.moduleList.homeUrl,
      popFlag: false,
      popContent: ''
    };
  },
  mounted() {
    this.loadRemoteFile('head'); // 远程加载head
    this.loadRemoteFile('list'); // 远程加载list
  },
  activated() {},
  destroyed() {},
  methods: {
    loadRemoteFile(type) {
      let url = '';
      if (type === 'list') {
        url = this.baseUrl + "ex/home.xlsx"; // excel地址
      } else if (type === 'head') {
        url = this.baseUrl + "ex/home-head.xlsx"; // head地址
      }
      let that = this;
      this.readWorkbookFromRemoteFile(url, function(workbook) {
        that.readWorkbook(workbook, type);
      });
    },
    readWorkbookFromRemoteFile(url, callback) {
      // url必须同域，否则报错
      var xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function() {
        if (xhr.status == 200) {
          let data = new Uint8Array(xhr.response);
          let workbook = XLSX.read(data, { type: "array" });
          if (callback) callback(workbook);
        }
      };
      xhr.send();
    },
    readWorkbook (workbook, type) {
      let sheetNames = workbook.SheetNames; // 工作表名称集合
      let worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
      let json = XLSX.utils.sheet_to_json(worksheet);
      if (type === 'list') {
        this.getMain(json);
      } else if (type === 'head') {
        this.getHead(json);
      }
    },
    // 获取列表数据
    getMain(i) {
      let res = i || [];
      if (res.length > 0) {
        res.forEach((item) => {
          let url = this.baseUrl + "img/" + item.time + '/' + item.img + '.jpg'; // excel地址
          item.img = url;
        })
      }
      this.mainList = res;
    },
    getHead(i) {
      let res = i || [];
      if (res.length > 0) { // last
        let url = this.baseUrl + 'img/home/' + res[res.length - 1].img + '.jpg';
        res[res.length - 1].img = url;
        this.headData[0] = res[res.length - 1];
      }
    }
  },
  directives: {
    transferDom
  },
  filters: {
    comTime(val) {
      val = typeof val === 'number' ? val + '' : val;
      let time = val.slice(0, 4) + '-' + val.slice(4, 6) + '-' + val.slice(6, 8);
      return time;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./style.less";
</style>
