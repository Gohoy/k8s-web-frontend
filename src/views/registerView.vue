<template>
    <div class="registration">
        <h2>注册</h2>
        <form @submit.prevent="handleRegistration">
            <label for="username">用户名:</label>
            <input type="text" id="username" v-model="userData.username" required>

            <!-- <label for="email">邮箱:</label>
            <input type="email" id="email" v-model="userData.email" required> -->

            <label for="password">密码:</label>
            <input type="password" id="password" v-model="userData.password" required>

            <button type="submit">注册</button>
        </form>
        <p v-if="showMessage">{{ responseMessage }}}</p>
    </div>
</template>

<script>
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
            showMessage: false,
            responseMessage: "",
        };
    },
    methods: {
        async handleRegistration() {
            const response = await this.$axios.post('/user/register', this.userData);
            this.responseMessage = response.data.message;
            this.showMessage = true;
        },
    },
};
</script>

<style>
.registration {
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
