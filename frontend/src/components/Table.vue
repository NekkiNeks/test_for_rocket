<script setup lang="ts">
import { ref, watch } from 'vue';
import { TableColumnProps } from 'ant-design-vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { lead } from '../types/lead';
import ErrorComponent from './Error.vue';

const backendUrl = process.env.BACKEND_URL;
const isLoading = ref<boolean>(true);
const error = ref<string | null>();
const data = ref<lead[]>([]);
const search = ref<string | null>(null);

// Настройки столбцов таблицы
const columns: TableColumnProps[] = [
    {
        title: 'Название сделки:',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Бюджет:',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Статус:',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Ответственный:',
        dataIndex: 'responsible',
        key: 'responsible',
    },
    {
        title: 'Дата создания:',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Контакты: ',
        dataIndex: 'contacts',
        key: 'contacts',
    },
];

const tableColumns = ref(columns);

async function fetchData() {
    try {
        isLoading.value = true;
        error.value = null;
        const useSearch = search.value && search.value.length > 3;
        const searchQuery = useSearch ? '?query=' + search.value : '';
        const url = `${backendUrl}/api/leads${searchQuery}`;
        const response = await fetch(url);
        const result = await response.json();
        data.value = result;
    } catch (err: any) {
        console.error(err.message);
        error.value = err.message;
    } finally {
        isLoading.value = false;
    }
}
fetchData();

watch(search, newValue => {
    if (newValue && newValue.length < 4) return;
    fetchData();
});
</script>

<template>
    <div class="container">
        <div class="title">
            <h2>Сделки</h2>
            <a-input
                style="width: 300px"
                :status="search && search.length < 4 ? 'error' : ''"
                v-model:value="search"
                placeholder="Поиск..."
            >
                <template #suffix>
                    <a-tooltip title="Поисковая строка должен включать более трех символов.">
                        <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
                    </a-tooltip>
                </template>
            </a-input>
        </div>

        <!-- При ошибке -->
        <template v-if="error">
            <ErrorComponent />
        </template>

        <!-- Таблица -->
        <a-spin :spinning="isLoading" tip="Загрузка данных...">
            <a-table
                v-if="!error"
                :dataSource="data"
                :columns="tableColumns"
                :pagination="false"
                emptyText="Ничего не найдено..."
                :bordered="true"
            >
                <template #bodyCell="{ column, record }">
                    <!-- Настройка столбца статуса -->
                    <template v-if="column.key === 'status'">
                        <span>
                            <a-tag class="status" :color="record.status.color">
                                {{ record.status.text }}
                            </a-tag>
                        </span>
                    </template>
                    <!-- Настройка столбца контактов -->
                    <template v-if="column.key === 'contacts'">
                        <span>
                            <a-button
                                class="phone-button"
                                v-if="record.contacts.phone"
                                type="primary"
                                :href="`tel:${record.contacts.phone}`"
                            >
                                Позвонить
                            </a-button>
                            <a-button
                                class="email-button"
                                v-if="record.contacts.email"
                                :href="`mailto:${record.contacts.email}`"
                            >
                                Написать
                            </a-button>
                        </span>
                    </template>
                </template>
            </a-table>
        </a-spin>
    </div>
</template>

<style scoped>
.container {
    margin-top: 1rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
    padding: 2rem;
}

.title {
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.phone-button {
    margin-right: 1rem;
}

.status {
    color: #222;
}
</style>
