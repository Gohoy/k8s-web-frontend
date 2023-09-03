<template>
    <div class="user-info">
        <h2>用户信息</h2>
        <div>
            <p>用户名：{{ userInfo.username }}</p>
            <p>已申请的 Container 数量：{{ userInfo.ctrOccupied }}</p>
            <p>可用的 Container 数量：{{ userInfo.ctrMax }}</p>
            <p>已申请的虚拟机数量：{{ userInfo.vmOccupied }}</p>
            <p>可用的虚拟机数量：{{ userInfo.vmMax }}</p>
            <p>是否管理员：{{ userInfo.isAdmin === 1 ? '是' : '否' }}</p>
            <p>最后登录时间：{{ userInfo.lastLogin }}</p>

            <!-- 添加退出登录按钮 -->
            <button @click="logout">退出登录</button>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.username = this.$cookies.get("username");
        if (this.username === '') {
            this.$router.push("/login");
        }
        this.getUserInfo();
    },
    data() {
        return {
            userInfo: {},
            username: ''
        };
    },

    methods: {
        getUserInfo() {
            this.$axios.get(`/user/getUserDTO/${this.username}`).then(response => {
                this.userInfo = response.data.data;
            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    // 如果接收到401响应，说明用户未授权，提示用户重新登录
                    this.$message.error('您的登录已过期，请重新登录');
                    this.logout();
                }
            });
        },
        logout() {
            // 清除 cookies 中的 token 和 username
            this.$cookies.remove('token');
            this.$cookies.remove('username');

            // 重定向到登录页面
            this.$router.push('/login').then(() => {
                // 在路由切换后执行一些操作，例如清除状态
                // 这里可以根据您的需要进行适当的处理
                location.reload()
            });
        }
    }
};
</script>

<style>
.user-info {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

h2 {
    text-align: center;
}

p {
    margin: 5px 0;
}
</style>
