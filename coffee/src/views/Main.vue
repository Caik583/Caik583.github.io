<template>
  <div class="main">
    <div>
      <!-- 二级路由 -->
      <!-- include="Home,Menu" Home组件和Menu组件被缓存 -->
      <keep-alive include="Home,Menu">
        <router-view></router-view>
      </keep-alive>
    </div>

    <van-tabbar v-model="tabbarIndex" active-color="#0C34BA" :route="true">
      <van-tabbar-item v-for="(item,index) in tabbarData" :key="index" :to="item.url">
        <span>{{item.title}}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive" alt />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbarIndex: 0,
      tabbarData: [
        {
          title: "首页",
          icon: {
            active: require("../assets/images/tabbar_18.png"),
            inactive: require("../assets/images/tabbar_03.png"),
          },
          url: {
            name: "Home",
          },
        },
        {
          title: "菜单",
          icon: {
            active: require("../assets/images/tabbar_19.png"),
            inactive: require("../assets/images/tabbar_05.png"),
          },
          url: {
            name: "Menu",
          },
        },
        {
          title: "购物袋",
          icon: {
            active: require("../assets/images/tabbar_21.png"),
            inactive: require("../assets/images/tabbar_09.png"),
          },
          url: {
            name: "Shopbag",
          },
        },
        {
          title: "我的",
          icon: {
            active: require("../assets/images/tabbar_22.png"),
            inactive: require("../assets/images/tabbar_11.png"),
          },
          url: {
            name: "My",
          },
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.main {
  padding-bottom: 50px;
}
</style>