<template>
	<div class="container">
		<h2>To-Do List</h2>
		<form class="d-flex" @submit.prevent="onSubmit">
			<div class="flex-grow-1 mr-2">
				<input
					class="form-control"
					type="text"
					v-model="todo"
					placeholder="Type new To-Do"
				/>
			</div>
			<div>
				<button type="submit" class="btn btn-primary">Click</button>
			</div>
		</form>
		{{ todos }}
	</div>
</template>

<script>
import { ref } from 'vue';

export default {
	setup() {
		const todo = ref(''); // ref는 string, int, object, list 모든 타입을 사용할 수 있다. 값을 치환할 때는 value를 이용해야 한다.
		const todos = ref([]);

		const onSubmit = () => {
			console.log(todo.value);
			todos.value.push({
				id: Date.now(),
				subject: todo.value,
			});
		};

		return {
			todo,
			todos,
			onSubmit,
		};
	},
};
</script>

<style>
.name {
	color: red;
}
</style>
