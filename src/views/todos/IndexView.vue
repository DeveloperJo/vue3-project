<template>
	<div>
		<div class="d-flex justify-content-between">
			<h2>To-Do List</h2>
			<button class="btn btn-primary" @click="moveToCreatePage">Create</button>
		</div>

		<hr />
		<input
			class="form-control"
			type="text"
			v-model="searchText"
			placeholder="Search"
			@keyup.enter="searchTodo"
		/>
		<hr />
		<div v-if="!todos.length">To-Do가 없습니다.</div>
		<TodoList
			:todos="todos"
			@toggle-todo="toggleTodo"
			@delete-todo="deleteTodo"
		/>
		<hr />

		<PaginationList
			v-if="todos.length"
			:numberOfPages="numberOfPages"
			:currentPage="currentPage"
			@page-click="getTodos"
		/>
	</div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import TodoList from '@/components/TodoList.vue';
import PaginationList from '@/components/PaginationList.vue';
import axios from '@/axios';
import { useRouter } from 'vue-router';
import { useToast } from '@/composables/toast';

export default {
	components: {
		TodoList,
		PaginationList,
	},
	setup() {
		const todos = ref([]);

		const searchText = ref('');
		const router = useRouter();

		const { sendToast } = useToast();

		const numberOfTodos = ref(0);
		let limit = 5;
		const currentPage = ref(1);
		const numberOfPages = computed(() => {
			return Math.ceil(numberOfTodos.value / limit);
		});

		const getTodos = async (page = currentPage.value) => {
			try {
				const res = await axios.get(
					`todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
				);
				numberOfTodos.value = res.headers['x-total-count'];
				todos.value = res.data;
				currentPage.value = page;
			} catch (err) {
				sendToast('danger', 'Get Todo - Something went wrong. ' + err.message);
			}
		};
		getTodos();

		let timeout = null;
		const searchTodo = () => {
			clearTimeout(timeout);
			getTodos(1);
		};

		watch(searchText, () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				getTodos(1);
			}, 500);
		});

		watch([currentPage, numberOfPages], () => {
			//console.log(currentPage.value, numberOfPages.value);
			if (currentPage.value > numberOfPages.value)
				getTodos(numberOfPages.value);
		});

		const toggleTodo = async (index, checked) => {
			console.log(checked);
			const id = todos.value[index].id;

			try {
				await axios.patch('todos/' + id, {
					completed: checked, // !todos.value[index].completed,
				});
				todos.value[index].completed = checked; // !todos.value[index].completed;
			} catch (err) {
				sendToast(
					'danger',
					'Toggle Todo - Something went wrong. ' + err.message
				);
			}
		};

		const deleteTodo = async (id) => {
			// const id = todos.value[index].id;

			try {
				await axios.delete('todos/' + id);
				//todos.value.splice(index, 1);
				getTodos(currentPage.value);
			} catch (err) {
				sendToast(
					'danger',
					'Delete Todo - Something went wrong. ' + err.message
				);
			}
		};

		const moveToCreatePage = () => {
			router.push({
				name: 'TodoCreate',
			});
		};

		// const filteredTodos = computed(() => {
		// 	if (searchText.value) {
		// 		return todos.value.filter((todo) => {
		// 			return todo.subject.includes(searchText.value);
		// 		});
		// 	}

		// 	return todos.value;
		// });

		return {
			todos,
			getTodos,
			searchTodo,
			// addTodo,
			toggleTodo,
			deleteTodo,
			searchText,
			// filteredTodos,
			numberOfPages,
			currentPage,
			moveToCreatePage,
		};
	},
};
</script>

<style></style>
