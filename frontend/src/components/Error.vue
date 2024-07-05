<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps(['title', 'subtitle']);
</script>

<template>
    <a-result
        status="error"
        :title="props.title || 'Ошибка при запросе к серверу'"
        :sub-title="props.subtitle || 'Пожалуйста попробуйте обновить страницу или свяжитесь с поддержкой.'"
    >
        <template #extra>
            <a-button type="primary" href="https://google.com">Яснопонятно</a-button>
        </template>
    </a-result>
</template>
