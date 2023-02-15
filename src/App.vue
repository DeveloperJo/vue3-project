<template>
	<div class="container">
		<h2>To-Do List</h2>
		<TodoSimpleForm @add-todo="addTodo" />
		<div v-if="!todos.length">추가된 To-Do가 없습니다.</div>
		<div class="card mt-2" :key="t.id" v-for="(t, index) in todos">
			<div class="card-body p-2 d-flex align-items-center">
				<div class="form-check flex-grow-1">
					<input
						class="form-check-input"
						type="checkbox"
						id="check"
						v-model="t.completed"
					/>
					<label
						class="form-check-label"
						:class="{ todo: t.completed }"
						for="check"
						>{{ t.subject }}</label
					>
				</div>
				<div>
					<button class="btn btn-danger btn-small" @click="deleteTodo(index)">
						Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';

export default {
	components: {
		TodoSimpleForm,
	},
	setup() {
		const todos = ref([]);

		const todoStyle = {
			textDecoration: 'line-through',
			color: 'gray',
		};

		const addTodo = (todo) => {
			console.log(todo);
			todos.value.push(todo);
		};

		const deleteTodo = (index) => {
			todos.value.splice(index, 1);
		};

		return {
			todos,
			todoStyle,
			addTodo,
			deleteTodo,
		};
	},
};
</script>

<style>
.todo {
	color: gray;
	text-decoration: line-through;
}
</style>
