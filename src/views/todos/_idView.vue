<template>
	<div>
		<h2>Todo Page</h2>
		<hr />
		<div v-if="loading">Loading ...</div>
		<form v-else @submit.prevent="onSave">
			<div class="row">
				<div class="col-6">
					<div class="form-group">
						<label>Subject</label>
						<input type="text" class="form-control" v-model="todo.subject" />
					</div>
				</div>
				<div class="col-6">
					<div class="form-group">
						<label>Status</label>
						<div>
							<button
								type="button"
								class="btn"
								:class="todo.completed == true ? 'btn-success' : 'btn-danger'"
								@click.prevent="toggleTodoStatus"
							>
								{{ todo.completed == true ? 'Completed' : 'Incompleted' }}
							</button>
						</div>
					</div>
				</div>
			</div>

			<button type="submit" class="btn btn-primary">Save</button>
			<button
				type="button"
				class="btn btn-outline-dark ml-2"
				@click="moveToTodoListPage"
			>
				Cancel
			</button>
		</form>
	</div>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
	setup() {
		const todo = ref(null);
		const loading = ref(true);

		const route = useRoute();
		const router = useRouter();

		const id = route.params.id;

		const error = ref('');

		const getTodo = async () => {
			error.value = '';

			try {
				const res = await axios.get(`http://localhost:3000/todos/${id}`);
				todo.value = res.data;
				loading.value = false;
			} catch (err) {
				error.value = 'Get Todo - Something went wrong. ' + err.message;
			}
		};
		getTodo();

		const toggleTodoStatus = async () => {
			try {
				updateTodo(!todo.value.completed);
				todo.value.completed = !todo.value.completed;
			} catch (err) {
				error.value =
					'toggle Todo Status - Something went wrong. ' + err.message;
			}
		};

		const onSave = () => {
			updateTodo(todo.value.completed);
			moveToTodoListPage();
		};

		const updateTodo = async (completed) => {
			error.value = '';
			try {
				await axios.patch(`http://localhost:3000/todos/${id}`, {
					subject: todo.value.subject,
					completed: completed,
				});
			} catch (err) {
				error.value = 'update Todo - Something went wrong. ' + err.message;
			}
		};

		const moveToTodoListPage = () => {
			router.push({
				name: 'Todos',
			});
		};

		return {
			todo,
			loading,
			toggleTodoStatus,
			moveToTodoListPage,
			onSave,
		};
	},
};
</script>

<style></style>
