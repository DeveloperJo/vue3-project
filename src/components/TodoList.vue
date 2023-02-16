<template>
	<div>
		<div class="card mt-2" :key="t.id" v-for="(t, index) in todos">
			<div
				class="card-body p-2 d-flex align-items-center"
				@click="moveToPage(t.id)"
			>
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
import { useRouter } from 'vue-router';

export default {
	// props: ['todos'],
	props: {
		todos: {
			type: Array,
			required: true,
		},
	},
	emits: ['toggle-todo', 'delete-todo'],
	setup(props, { emit }) {
		const router = useRouter();
		const toggleTodo = (index) => {
			emit('toggle-todo', index);
		};

		const deleteTodo = (index) => {
			emit('delete-todo', index);
		};

		const moveToPage = (id) => {
			// router.push('/todos/' + id);
			router.push({
				name: 'Todo',
				params: {
					id: id,
				},
			});
		};

		return {
			toggleTodo,
			deleteTodo,
			moveToPage,
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
