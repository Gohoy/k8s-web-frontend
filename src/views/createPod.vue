<template>
    <div class="pod-application">
        <h2>申请 Pod</h2>
        <div class="container">
            <div class="button-group">
                <button @click="handleContainerApplication()">Container 申请</button>
                <button @click="handleVMApplication()">虚拟机申请</button>
            </div>
            <div v-if="userdata.ctrMax">
                <p>当前可用的 Container 数量：{{ this.userdata.ctrMax - this.userdata.ctrOccupied }}</p>
                <p>当前可用的虚拟机数量：{{ this.userdata.vmMax - this.userdata.vmOccupied }}</p>
            </div>

        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
    created() {
        this.username = this.$cookies.get("username")
        if (this.username == '') {
            ElMessage("请先登录")
            this.$router.push("/login");
        } else {
            this.getUserInfo()
        }
    },
    data() {
        return {
            username: '',
            userdata: {},
        };
    },
    methods: {
        getUserInfo() {
            this.$axios.get(`/user/getUserDTO/${this.username}`).then(response => {
                this.userdata = response.data.data
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
            this.$router.push('/login');
        },
        handleContainerApplication() {
            // 处理 Container 申请逻辑
            this.$axios.post(`/pod/createCtr/${this.username}`).then(response => {
                console.log(response)
                if (response.data.code != 200) {
                    ElMessage.error(response.data.message)
                } else {
                    ElMessage.info(response.data.message)
                }
            })
        },
        handleVMApplication() {
            // 处理虚拟机申请逻辑
            this.$axios.post(`/pod/createVM/${this.username}`).then(response => {
                console.log(response)
                if (response.data.code != 200) {
                    ElMessage.error(response.data.message)
                } else {
                    ElMessage.info(response.data.message)
                }
            })
        },
    },
};
</script>

<style>
.pod-application {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.button-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

p {
    font-size: 14px;
}
</style>
