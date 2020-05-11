<template>
  <div id="app">
    <div class="pages">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="page"></router-view>
      </keep-alive>
      <router-view class="page" v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <div class="main-bot">
      <p>© 2019-2020 sttsg.com</p>
      <p>版权所有 ICP证:浙ICP备17044724号-2</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "~@/assets/less/app.less";
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
