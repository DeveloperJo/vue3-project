<template>
	<div>
		<div class="card mt-2" :key="t.id" v-for="(t, index) in todos">
			<div class="card-body p-2 d-flex align-items-center">
				<div class="form-check flex-grow-1">
					<input
						class="form-check-input"
						type="checkbox"
						id="check"
						:value="t.completed"
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
	setup(props, context) {
		const toggleTodo = (index) => {
			context.emit('toggle-todo', index);
		};

		return {
			toggleTodo,
		};
	},
};
</script>

<style></style>
