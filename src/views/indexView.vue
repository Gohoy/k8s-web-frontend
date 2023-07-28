<template>
    <div class="container">
        <div v-if="isLoading">Loading...</div>
        <div v-else v-html="renderedMarkdown"></div>
    </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import axios from 'axios';

export default {
    data() {
        return {
            markdownContent: '',
            renderedMarkdown: '',
            isLoading: true,
        };
    },
    mounted() {
        this.loadMarkdown();
    },
    methods: {
        async loadMarkdown() {
            try {
                const response = await axios.get('/user/index');
                this.markdownContent = response.data;
                this.renderedMarkdown = this.parseMarkdown(this.markdownContent);
                this.isLoading = false;
            } catch (error) {
                console.error('Error loading Markdown:', error);
                this.isLoading = false;
            }
        },
        parseMarkdown(content) {
            const md = new MarkdownIt();
            return md.render(content);
        },
    },
};
</script>

<style>
.container {
    padding: 20px;
}
</style>
