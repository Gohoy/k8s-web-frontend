<template>
    <div class="container el-responsive-table">
        <el-table :data="userData" style="width: 100%" stripe>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="ctrOccupied" label="已申请容器数量"></el-table-column>
            <el-table-column prop="ctrMax" label="最大可用容器数量"></el-table-column>
            <el-table-column prop="vmOccupied" label="已申请虚拟机数量"></el-table-column>
            <el-table-column prop="vmMax" label="最大可用虚拟机数量"></el-table-column>
            <el-table-column prop="isAdmin" label="是否管理员"></el-table-column>
            <el-table-column prop="lastLogin" label="最后登录时间"></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-popconfirm v-if="!row.isAdmin" confirm-button-text="Yes" cancel-button-text="No"
                        title="确定要给该用户管理员权限吗?" @confirm="confirmSetAdmin(row, 1)">
                        <template #reference>
                            <el-button type="primary">设置管理员</el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm v-if="row.isAdmin" confirm-button-text="Yes" cancel-button-text="No"
                        title="确定取消该用户管理员权限吗?" @confirm="confirmSetAdmin(row, 0)">
                        <template #reference>
                            <el-button type="primary">取消管理员</el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" title="确定删除该用户吗?"
                        @confirm="confirmDelete(row)">
                        <template #reference>
                            <el-button type="warning">删除用户</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="userData.length" />

    </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
    data() {
        return {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            userData: [],
            selectedUser: null,
            showConfirm: false,
            updateUserInfo: {}
        };
    },
    methods: {
        getUserData() {
            this.$axios.get(`/admin/getUsersByPage/${this.pageNum}/${this.pageSize}`).then((response) => {
                const data = response.data;
                this.userData = data.data;
                this.total = data.total;
            });
        },

        handlePageNumChange(pageNum) {
            this.pageNum = pageNum;
            this.getUserData();
        },
        handlePageSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.pageNum = 1; // 切换每页条数后，将当前页重置为第1页
            this.getUserData();
        },
        confirmSetAdmin(row, updateAdmin) {
            this.updateUserInfo = row
            this.updateUserInfo.isAdmin = updateAdmin;
            this.$axios.post("/admin/updateUser", this.updateUserInfo).then(response => {
                if (response.data.code == 200) {
                    ElMessage.info(response.data.message)
                    location.reload();
                } else {
                    ElMessage.error(response.data.message)
                }
            })
        },
        confirmDelete(row) {
            this.$axios.post(`/admin/deleteUser/${row.id}`).then(response => {
                if (response.data.code == 200) {
                    ElMessage.info(response.data.message)
                    location.reload();
                } else {
                    ElMessage.error(response.data.message)
                }
            })
        }
    },
    created() {
        this.getUserData();
    },
};
</script>

<style>
.container {
    padding: 20px;
}

.el-table {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-table th {
    background-color: #f5f7fa;
}

.el-button {
    margin-right: 10px;
}
</style>
