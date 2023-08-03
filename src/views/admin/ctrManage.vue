<template>
    <div class="container">
        <div class="default-config">
            <p>默认CPU: {{ defaultConfig.cpuValue }}</p>
            <p>默认内存: {{ defaultConfig.memoryValue }}</p>
            <p>默认可用时间: {{ defaultConfig.timeOfLife }}</p>
            <p>目前端口分配到: {{ defaultConfig.port }}</p>
            <el-button type="primary" @click="showEditDefaultConfigDialog">修改默认配置</el-button>
        </div>
        <el-table :data="podData" style="width: 100%">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="cpu" label="CPU(毫核)"></el-table-column>
            <el-table-column prop="memory" label="内存(Mi)"></el-table-column>
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

    <el-dialog v-model="editDefaultConfigDialogVisible" title="编辑默认配置">
        <el-form>
            <el-form-item label="默认CPU(单位毫核,默认为：100m)">
                <el-input-number v-model="editedDefaultConfig.cpuValue"></el-input-number>
            </el-form-item>
            <el-form-item label="默认内存(单位兆,默认为：100Mi)">
                <el-input-number v-model="editedDefaultConfig.memoryValue"></el-input-number>
            </el-form-item>
            <el-form-item label="默认可用时间(单位秒,默认为：10000)">
                <el-input-number v-model="editedDefaultConfig.timeOfLife"></el-input-number>
            </el-form-item>
            <el-form-item label="目前端口(随意修改可能会导致系统崩溃) ">
                <el-input disabled v-model="editedDefaultConfig.port" label="默认端口值"></el-input>

            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDefaultConfigDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveEditedDefaultConfig">保存</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus';


export default {
    data() {
        return {
            username: '',
            podData: [],
            defaultConfig: {},
            editDefaultConfigDialogVisible: false,
            editedDefaultConfig: {},
            submitConifg: {}
        };
    },
    methods: {
        getDefaultConfig() {
            this.$axios.get("/admin/pod/getDefaultConfig/ctr").then((response) => {
                if (response.data.code == 200) {
                    this.defaultConfig = response.data.data;
                } else {
                    ElMessage.error(response.data.message);
                }
            })
        },
        getPodData() {
            this.$axios.get("/admin/pod/getAllPods/ctr").then((response) => {
                this.podData = response.data;
            });
        },
        confirmShutDown(row) {
            console.log(row)
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
        showEditDefaultConfigDialog() {
            this.editedDefaultConfig = { ...this.defaultConfig };
            this.editedDefaultConfig.cpuValue = this.extractNumber(this.editedDefaultConfig.cpuValue);
            this.editedDefaultConfig.memoryValue = this.extractNumber(this.editedDefaultConfig.memoryValue);
            this.editedDefaultConfig.timeOfLife = this.extractNumber(this.editedDefaultConfig.timeOfLife);
            this.editDefaultConfigDialogVisible = true;
        },
        extractNumber(valueWithUnit) {
            return parseInt(valueWithUnit.replace(/\D/g, ""));
        },
        saveEditedDefaultConfig() {
            this.submitConifg.port = this.defaultConfig.port
            this.submitConifg.cpuValue = this.editedDefaultConfig.cpuValue + "m"
            this.submitConifg.memoryValue = this.editedDefaultConfig.memoryValue + "Mi"
            this.submitConifg.timeOfLife = this.editedDefaultConfig.timeOfLife + ""
            console.log(this.submitConifg)
            this.$axios.post("/admin/pod/setCtrDefaultResource/", this.submitConifg).then(response => {
                console.log(response)
                if (response.data.code == 200) {
                    ElMessage.info(response.data.message)
                    this.editDefaultConfigDialogVisible = false;
                    location.reload();
                } else {
                    ElMessage.error(response.data.message)
                    this.editDefaultConfigDialogVisible = false;
                }
            })
        }
    },
    created() {
        this.username = this.$cookies.get('username');
        if (this.username === '') {
            ElMessage('请先登录');
            this.$router.push('/login');
        }
        this.getPodData();
        this.getDefaultConfig();
    },
};
</script>

<style>
.container {
    padding: 20px;
}
</style>
