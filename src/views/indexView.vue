<template>
    <div class="container">
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <el-header class="header">
                    <div class="header-content">
                        <span class="header-span">K8s-Web-FrontEnd</span>
                        <div class="header-buttons">
                            <el-button type="primary">登录</el-button>
                            <el-button type="success">注册</el-button>
                        </div>
                    </div>
                </el-header>
                <el-main>
                    <!-- Your main content goes here -->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
// Your script goes here
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
}

.header-content {
    display: flex;
    align-items: center;
    width: 100%;
}

.header-span {
    flex-grow: 1;
    /* Allow the <span> to take up available space */
    display: flex;
    justify-content: center;
    align-items: center;
}

.header-buttons {
    display: flex;
    gap: 10px;
}
</style>
