<template>
	<div class="container">
		<h2>To-Do List</h2>
		<input
			class="form-control"
			type="text"
			v-model="searchText"
			placeholder="Search"
		/>
		<hr />
		<TodoSimpleForm @add-todo="addTodo" />
		<div v-if="error != ''" class="text-danger">{{ error }}</div>
		<div v-if="!filteredTodos.length">To-Do가 없습니다.</div>
		<TodoList
			:todos="filteredTodos"
			@toggle-todo="toggleTodo"
			@delete-todo="deleteTodo"
		/>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
	components: {
		TodoSimpleForm,
		TodoList,
	},
	setup() {
		const todos = ref([]);
		const error = ref('');

		const getTodos = async () => {
			error.value = '';
			try {
				const res = await axios.get('http://localhost:3000/todos');
				todos.value = res.data;
				console.log(res.data);
			} catch (err) {
				error.value = 'Get Todo - Something went wrong. ' + err.message;
			}
		};
		getTodos();

		const addTodo = async (todo) => {
			// 데이터베이스 Todo 저장 - 비동기
			error.value = '';
			try {
				const res = await axios.post('http://localhost:3000/todos', {
					//id: todo.id,
					subject: todo.subject,
					completed: todo.completed,
				});
				todos.value.push(res.data);
				console.log(res);
			} catch (err) {
				error.value = 'Add Todo - Something went wrong. ' + err.message;
			}

			// .then((res) => {
			// 	console.log(res);
			// 	if (res.status == 201) {
			// 		// todo에 array 저장
			// 		todos.value.push(res.data);
			// 	}
			// })
			// .catch((err) => {
			// 	console.log(err);
			// 	error.value = 'Something went wrong. ' + err.message;
			// });
		};

		const toggleTodo = (index) => {
			filteredTodos.value[index].completed =
				!filteredTodos.value[index].completed;
		};

		const deleteTodo = async (index) => {
			const id = filteredTodos.value[index].id;

			error.value = '';
			try {
				await axios.delete('http://localhost:3000/todos/' + id);
				filteredTodos.value.splice(index, 1);
			} catch (err) {
				error.value = 'Delete Todo - Something went wrong. ' + err.message;
			}
		};

		const searchText = ref('');
		const filteredTodos = computed(() => {
			if (searchText.value) {
				return todos.value.filter((todo) => {
					return todo.subject.includes(searchText.value);
				});
			}

			return todos.value;
		});

		return {
			todos,
			addTodo,
			toggleTodo,
			deleteTodo,
			searchText,
			filteredTodos,
			error,
		};
	},
};
</script>

<style></style>
