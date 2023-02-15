<template>
	<div>
		<div class="card mt-2" :key="t.id" v-for="(t, index) in todos">
			<div class="card-body p-2 d-flex align-items-center">
				<div class="form-check flex-grow-1">
					<input
						class="form-check-input"
						type="checkbox"
						id="check"
						:checked="t.completed"
						@change="toggleTodo(index)"
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
export default {
	// props: ['todos'],
	props: {
		todos: {
			type: Object,
			required: true,
		},
	},
	emits: ['toggle-todo', 'delete-todo'],
	setup(props, { emit }) {
		const toggleTodo = (index) => {
			emit('toggle-todo', index);
		};

		const deleteTodo = (index) => {
			emit('delete-todo', index);
		};

		return {
			toggleTodo,
			deleteTodo,
		};
	},
};
</script>

<style scoped>
.todo {
	color: gray;
	text-decoration: line-through;
}
</style>
