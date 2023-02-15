<template>
	<div>
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
	</div>
</template>

<script>
import { ref } from 'vue';
export default {
	emits: ['add-todo'],
	setup(props, context) {
		const todo = ref(''); // ref는 string, int, object, list 모든 타입을 사용할 수 있다. 값을 치환할 때는 value를 이용해야 한다.
		const hasError = ref(false);

		const onSubmit = () => {
			const keyword = todo.value;
			if (keyword == '') hasError.value = true;
			else {
				context.emit('add-todo', {
					id: Date.now(),
					subject: todo.value,
					completed: false,
				});

				hasError.value = false;
				todo.value = '';
			}
		};

		return {
			todo,
			onSubmit,
			hasError,
		};
	},
};
</script>

<style></style>
