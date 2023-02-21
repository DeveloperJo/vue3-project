<template>
	<div>
		<div class="card mt-2" :key="t.id" v-for="(t, index) in todos">
			<div
				class="card-body p-2 d-flex align-items-center"
				style="cursor: pointer"
				@click="moveToPage(t.id)"
			>
				<div class="flex-grow-1">
					<input
						class="ml-2 mr-2"
						type="checkbox"
						id="check"
						:checked="t.completed"
						@change.stop="toggleTodo(index, $event)"
						@click.stop
					/>
					<span :class="{ todo: t.completed }">{{ t.subject }}</span>
				</div>
				<div>
					<button
						class="btn btn-danger btn-small"
						@click.stop="deleteTodo(index)"
					>
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
		const toggleTodo = (index, event) => {
			emit('toggle-todo', index, event.target.checked);
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
