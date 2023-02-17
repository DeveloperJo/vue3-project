<template>
	<div>
		<router-view />
		<div class="container">
			<h2>To-Do List</h2>
			<input
				class="form-control"
				type="text"
				v-model="searchText"
				placeholder="Search"
				@keyup.enter="searchTodo"
			/>
			<hr />
			<TodoSimpleForm @add-todo="addTodo" />
			<div v-if="error != ''" class="text-danger">{{ error }}</div>
			<div v-if="!todos.length">To-Do가 없습니다.</div>
			<TodoList
				:todos="todos"
				@toggle-todo="toggleTodo"
				@delete-todo="deleteTodo"
			/>
			<hr />
			<div>
				<nav aria-label="Page navigation example">
					<ul class="pagination">
						<li v-if="currentPage !== 1" class="page-item">
							<a
								class="page-link"
								@click="getTodos(currentPage - 1)"
								aria-label="Previous"
							>
								<span aria-hidden="true">&laquo;</span>
							</a>
						</li>
						<li
							class="page-item"
							:class="currentPage === page ? 'active' : ''"
							v-for="page in numberOfPages"
							:key="page"
						>
							<a class="page-link" @click="getTodos(page)">{{ page }}</a>
						</li>
						<li v-if="currentPage !== numberOfPages" class="page-item">
							<a
								class="page-link"
								@click="getTodos(currentPage + 1)"
								aria-label="Next"
							>
								<span aria-hidden="true">&raquo;</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoList from '@/components/TodoList.vue';
import axios from 'axios';

export default {
	components: {
		TodoSimpleForm,
		TodoList,
	},
	setup() {
		const todos = ref([]);
		const error = ref('');
		const numberOfTodos = ref(0);
		const limit = 5;
		const currentPage = ref(1);
		const searchText = ref('');

		const numberOfPages = computed(() => {
			return Math.ceil(numberOfTodos.value / limit);
		});

		const getTodos = async (page = currentPage.value) => {
			error.value = '';
			try {
				const res = await axios.get(
					`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
				);
				// console.log(res);
				numberOfTodos.value = res.headers['x-total-count'];
				todos.value = res.data;
				currentPage.value = page;
				// console.log(res.data);
			} catch (err) {
				error.value = 'Get Todo - Something went wrong. ' + err.message;
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

		const addTodo = async (todo) => {
			// 데이터베이스 Todo 저장 - 비동기
			error.value = '';
			try {
				await axios.post('http://localhost:3000/todos', {
					//id: todo.id,
					subject: todo.subject,
					completed: todo.completed,
				});
				getTodos(1);
				//todos.value.push(res.data);
				//console.log(res);
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

		const toggleTodo = async (index, checked) => {
			console.log(checked);
			const id = todos.value[index].id;

			error.value = '';
			try {
				await axios.patch('http://localhost:3000/todos/' + id, {
					completed: checked, // !todos.value[index].completed,
				});
				todos.value[index].completed = checked; // !todos.value[index].completed;
			} catch (err) {
				error.value = 'Toggle Todo - Something went wrong. ' + err.message;
			}
		};

		const deleteTodo = async (index) => {
			const id = todos.value[index].id;

			error.value = '';
			try {
				await axios.delete('http://localhost:3000/todos/' + id);
				//todos.value.splice(index, 1);
				getTodos(currentPage.value);
			} catch (err) {
				error.value = 'Delete Todo - Something went wrong. ' + err.message;
			}
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
			addTodo,
			toggleTodo,
			deleteTodo,
			searchText,
			// filteredTodos,
			numberOfPages,
			currentPage,
			error,
		};
	},
};
</script>

<style scoped>
a.page-link {
	cursor: pointer;
}
</style>
