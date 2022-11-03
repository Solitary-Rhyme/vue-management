<template>
  <div>
    
    <el-container>
      <!-- 侧边栏组件 -->
      <el-aside width="auto"><Aside/></el-aside>

      <!-- 头部组件 -->
      <el-container>
        <el-header><Header/></el-header>

        <!-- tag组件 -->
        <Tag/>

        <!-- 设置路由出口，渲染主页面 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>
    
  </div>
</template>

<script>
import Aside from '../components/CommonAside.vue'
import Header from '../components/CommonHeader.vue'
import Tag from '../components/CommonTag.vue'
export default {
  data() {
    return {};
  },
  components:{
    Aside,
    Header,
    Tag
  }
};
</script>

<style scoped>
.el-header{
  padding: 0;
}
</style>