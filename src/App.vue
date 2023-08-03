<template>
  <div class="container">
    <el-container>
      <!-- 左侧列菜单 -->
      <el-aside width="200px">
        <el-menu :default-active="activeMenu" @select="handleMenuSelect">
          <template #title>
            <i class="el-icon-location"></i>
            <span>Pod</span>
          </template>
          <el-menu-item index="/index">主页</el-menu-item>
          <el-menu-item v-if="hasLogin" index="/createPod">pod申请</el-menu-item>
          <el-menu-item v-if="hasLogin" index="/managePod">pod管理</el-menu-item>
          <el-menu-item v-if="!hasLogin" index="/login">登录</el-menu-item>
          <el-menu-item v-if="!hasLogin" index="/register">注册</el-menu-item>
          <el-menu-item v-if="hasLogin" index="/userInfo">用户信息</el-menu-item>
          <el-divider></el-divider>
          <el-menu-item v-if="isAdmin" index="/userManage">管理员：用户管理</el-menu-item>
          <el-menu-item v-if="isAdmin" index="/ctrManage">管理员：ctr管理</el-menu-item>
          <el-menu-item v-if="isAdmin" index="/vmManage">管理员：vm管理</el-menu-item>

        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="header">
          <div class="header-content">
            <span class="header-span">K8s-Web-FrontEnd</span>
          </div>
        </el-header>
        <el-main>
          <!-- Your main content goes here -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  created() {
    // 从 Cookie 中读取用户名和 Token
    this.username = this.$cookies.get('username');
    this.token = this.$cookies.get('token');

    // 判断用户名和 Token 是否存在，若存在则表示用户已登录
    if (this.username != null && this.token) {
      this.hasLogin = true;
    } else {
      this.hasLogin = false;
    }
    this.getUserInfo()
  },
  data() {
    return {
      activeMenu: "/index", // 默认选中菜单
      hasLogin: false,
      isAdmin: false,
      username: '',
      token: ''
    };
  },
  methods: {

    handleMenuSelect(index) {
      this.$router.push(index)
      // 根据index进行相关处理，比如跳转到相应的页面
    },
    getUserInfo() {
      if (!this.username) {
        return;
      }
      this.$axios.get(`/user/getUserDTO/${this.username}`).then(response => {
        this.isAdmin = response.data.data.isAdmin
      })

    }
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: #f2f2f2;
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.header-span {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}


.el-menu {
  /* Override the default styling of el-menu */
  background-color: #fff;
}
</style>