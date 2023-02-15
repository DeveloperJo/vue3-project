<template>
	<div class="container">
		<h2>To-Do List</h2>
		<form @submit.prevent="onSubmit">
			<div class="d-flex">
				<div class="flex-grow-1 mr-2">
					<input
						class="form-control"
						type="text"
						v-model="todo"
						placeholder="Type new To-Do"
					/>
				</div>
				<div>
					<button type="submit" class="btn btn-primary">Add</button>
				</div>
			</div>
			<div class="text-danger" v-show="hasError">
				This field cannot be empty
			</div>
		</form>
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

export default {
	setup() {
		const todo = ref(''); // ref는 string, int, object, list 모든 타입을 사용할 수 있다. 값을 치환할 때는 value를 이용해야 한다.
		const todos = ref([]);
		const hasError = ref(false);
		const todoStyle = {
			textDecoration: 'line-through',
			color: 'gray',
		};

		const onSubmit = () => {
			const keyword = todo.value;
			if (keyword == '') hasError.value = true;
			else {
				todos.value.push({
					id: Date.now(),
					subject: todo.value,
					completed: false,
				});
				hasError.value = false;
				todo.value = '';
			}
		};

		const deleteTodo = (index) => {
			todos.value.splice(index, 1);
		};

		return {
			todo,
			todos,
			todoStyle,
			onSubmit,
			deleteTodo,
			hasError,
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
