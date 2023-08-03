<template>
    <div class="container">
        <el-table :data="podData" style="width: 100%">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="cpu" label="CPU(毫核)"></el-table-column>
            <el-table-column prop="memory" label="内存(Mi)"></el-table-column>
            <!-- <el-table-column prop="storage" label="存储(Mi)"></el-table-column> -->
            <el-table-column prop="namespace" label="命名空间"></el-table-column>
            <el-table-column prop="ip" label="nodeIp"></el-table-column>
            <el-table-column prop="sshPort" label="sshPort"></el-table-column>
            <el-table-column prop="ttl" label="剩余可用时间"></el-table-column>


            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-popconfirm v-if="row.status" confirm-button-text="Yes" cancel-button-text="No"
                        title="确定关闭这个pod吗？确保您已经保存了重要信息" @confirm="confirmShutDown(row)">
                        <template #reference>
                            <el-button type="primary">关闭</el-button>
                        </template>
                    </el-popconfirm>
                    <el-button disabled v-else v-if="row.status === 'Pending'" type="success" size="small"
                        @click="handleOpen(row)">
                        启动中
                    </el-button>
                    <el-popconfirm v-else confirm-button-text="Yes" cancel-button-text="No" title="确定关闭这个pod吗？确保您已经保存了重要信息"
                        @confirm="confirmShutDown(row)">
                        <template #reference>
                            <el-button type="primary">关闭</el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" title="确定删除这个pod吗？确保您已经保存了重要信息"
                        @confirm="confirmDelete(row)">
                        <template #reference>
                            <el-button type="warning">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
    data() {
        return {
            username: '',
            podData: [],
        };
    },
    methods: {
        getPodData() {
            this.$axios.get(`/pod/selectPodByUserName/${this.username}`).then((response) => {
                this.podData = response.data;
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

        handleClose(row) {
            // 处理关闭按钮点击事件
            // row是当前行的数据
            // 在这里可以发送请求关闭对应的pod
        },
        handleOpen(row) {
            // 处理开启按钮点击事件
            // row是当前行的数据
            // 在这里可以发送请求开启对应的pod
        },
        confirmDelete(row) {
            // 处理删除按钮点击事件
            // row是当前行的数据
            // 在这里可以发送请求删除对应的pod
            this.$axios.post(`/pod/deletePod/${row.name}`).then((response) => {
                console.log(response)
                if (response.data.code == 200) {
                    ElMessage.info("删除成功")
                }
            })
        },
    },
    created() {
        this.username = this.$cookies.get('username');
        if (this.username === '') {
            ElMessage('请先登录');
            this.$router.push('/login');
        }
        this.getPodData();
    },
};
</script>

<style>
.container {
    padding: 20px;
}
</style>
