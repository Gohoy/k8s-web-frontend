<template>
    <div class="container">
        <el-table :data="podData" style="width: 100%">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="cpu" label="CPU(毫核)"></el-table-column>
            <el-table-column prop="memory" label="内存(Mi)"></el-table-column>
            <el-table-column prop="storage" label="存储(Mi)"></el-table-column>
            <el-table-column prop="namespace" label="命名空间"></el-table-column>
            <el-table-column prop="ip" label="nodeIp"></el-table-column>
            <el-table-column prop="sshPort" label="sshPort"></el-table-column>

            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-popconfirm v-if="row.status" confirm-button-text="Yes" cancel-button-text="No"
                        title="确定关闭这个pod吗？确保您已经保存了重要信息" @confirm="confirmShutDown(row)">
                        <template #reference>
                            <el-button type="primary">关闭</el-button>
                        </template>
                    </el-popconfirm>
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
            this.$axios.get("/admin/pod/getAllPods").then((response) => {
                this.podData = response.data;
            });
        },
        confirmShutDown(row) {
            console.log(row)
        },
        confirmDelete(row) {
            console.log(row)
        }
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
