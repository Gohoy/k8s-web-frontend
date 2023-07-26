<template>
    <div class="user-info">
        <h2>用户信息</h2>
        <div>
            <p>用户名: {{ userInfo.username }}</p>
            <p>Container 已申请: {{ userInfo.ctrOccupied }}</p>
            <p>Container 可用数量: {{ userInfo.ctrMax }}</p>
            <p>虚拟机 已申请: {{ userInfo.vmOccupied }}</p>
            <p>虚拟机 可用数量: {{ userInfo.vmMax }}</p>
            <p>是否管理员: {{ userInfo.isAdmin === 1 ? '是' : '否' }}</p>
            <p>最后登录时间: {{ userInfo.lastLogin }}</p>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.username = this.$cookies.get("username")
        if (this.username == '') {
            this.$router.push("/login");
        }
        this.getUserInfo()
    },
    data() {
        return {
            userInfo: {},
            username: ''
        }
    },

    methods: {
        getUserInfo() {
            this.$axios.get(`/user/getUserDTO/${this.username}`).then(response => {
                this.userInfo = response.data.data
            })
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
