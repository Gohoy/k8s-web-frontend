# SpringBoot-Vue实现对k8s的管理设计方案

## 0.开发背景

应实验室需求，开发此前后端分离Web项目，实现用户在网页对Pod申请，得到Pod信息后可以使用ssh连接。管理员可以简单管理用户和Pod。

## 1.开发环境

操作系统：windows11

使用的工具：Git+IDEA+VSCode+MySQLWorkBrench+docker

使用的框架（组件）：Maven+MybatisPlus+Swagger+JWT+SpringCloudKubernetes

数据库：MySQL
## 3.前端部分

使用vue3+elementPlus

### 3.1跨域问题：

设置axios拦截器，令Referrer-Policy = no-referrer

```js
axios.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    const username = Cookies.get('username');
    if (token) {
        config.headers['Authorization'] = token;
    }

    if (username) {
        config.headers['X-Username'] = username;
    }

    config.headers['Referrer-Policy'] = 'no-referrer'
    return config;
});
```

其他是将token和username装在header中传递，以便后端用来鉴权。

### 3.2chatgpt：

这些前端的页面代码几乎都是chatgpt完成的，它提供的页面比我自己写的要好看得多。我只需要手动处理对后端发起的请求和数据处理部分就可以了。