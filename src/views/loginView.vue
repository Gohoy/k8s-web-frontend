<template>
    <div class="login">
        <h2>登录</h2>
        <form @submit.prevent="handleLogin">
            <label for="username">用户名:</label>
            <input type="text" id="username" v-model="userData.username" required>

            <label for="password">密码:</label>
            <input type="password" id="password" v-model="userData.password" required>

            <button type="submit">登录</button>
        </form>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie';
export default {
    created() {
        // 从 Cookie 中读取用户名和 Token
        const username = Cookies.get('username');
        const token = Cookies.get('token');

        // 判断用户名和 Token 是否存在，若存在则表示用户已登录
        if (username && token) {
            this.$router.push("/index")
        }
    },
    data() {
        return {
            userData: {
                username: "",
                password: ""
            },
            responseMessage: "",
        };
    },
    methods: {
        async handleLogin() {
            const response = await this.$axios.post('/user/login', this.userData).then(response => {
                if (response.data.code == "200") {
                    Cookies.set('token', response.data.data);
                    Cookies.set('username', this.userData.username);
                    ElMessage.info(response.data.message)
                    location.reload();
                } else {
                    ElMessage.error(response.data.message)
                }
            })

        },
    },
};
</script>

<style>
.login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

label,
input,
button {
    display: block;
    margin-bottom: 10px;
}

button {
    padding: 8px 16px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
