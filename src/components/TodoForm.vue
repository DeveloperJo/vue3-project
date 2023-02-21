<template>
	<div>
		<div v-if="loading">Loading ...</div>
		<form v-else @submit.prevent="onSave">
			<div class="row">
				<div class="col-6">
					<div class="form-group">
						<label>Subject</label>
						<input type="text" class="form-control" v-model="todo.subject" />
					</div>
				</div>
				<div v-if="editing == true" class="col-6">
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
				<div class="col-12">
					<div class="form-group">
						<label>Body</label>
						<textarea
							v-model="todo.body"
							class="form-control"
							cols="30"
							rows="10"
						></textarea>
					</div>
				</div>
			</div>

			<button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
				{{ editing == true ? 'Update' : 'Create' }}
			</button>
			<button
				type="button"
				class="btn btn-outline-dark ml-2"
				@click="moveToTodoListPage"
			>
				Cancel
			</button>
		</form>
		<Toast v-if="showToast" :message="toastMessage" :type="toastType" />
	</div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import _ from 'lodash';
import Toast from '@/components/ToastAlert.vue';
import { useToast } from '@/composables/toast';

export default {
	components: {
		Toast,
	},
	props: {
		editing: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const todo = ref({
			subject: '',
			completed: false,
		});
		const originalTodo = ref(null);
		const loading = ref(false);

		const route = useRoute();
		const router = useRouter();

		const id = route.params.id;

		const { showToast, toastMessage, toastType, sendToast } = useToast();

		const getTodo = async () => {
			loading.value = true;
			try {
				const res = await axios.get(`http://localhost:3000/todos/${id}`);
				todo.value = { ...res.data };
				originalTodo.value = { ...res.data };

				loading.value = false;
				sendToast('success', 'Get Todo - success');

				loading.value = false;
			} catch (err) {
				sendToast('danger', 'Get Todo - Something went wrong. ' + err.message);
				loading.value = false;
			}
		};
		if (props.editing == true) getTodo();

		const toggleTodoStatus = () => {
			try {
				updateTodo(!todo.value.completed);
				todo.value.completed = !todo.value.completed;
				//sendToast('success', '상태값이 변경되었습니다');
			} catch (err) {
				sendToast(
					'danger',
					'toggle Todo Status - Something went wrong. ' + err.message
				);
			}
		};

		const onSave = async () => {
			await updateTodo(todo.value.completed);
			// originalTodo.value = { ...todo.value };
			// moveToTodoListPage();
		};

		const updateTodo = async (completed) => {
			if (todo.value.subject == '') {
				sendToast('danger', 'Subject is required');
				return;
			}
			try {
				const data = {
					subject: todo.value.subject,
					completed: completed,
					body: todo.value.body,
				};
				if (props.editing == true) {
					await axios.patch(`http://localhost:3000/todos/${id}`, data);
				} else {
					await axios.post(`http://localhost:3000/todos`, data);
					todo.value.subject = '';
					todo.value.body = '';
				}

				sendToast(
					'success',
					'Successfully ' + (props.editing ? 'Updated' : 'Created')
				);
			} catch (err) {
				sendToast(
					'danger',
					'Update Todo - Something went wrong. ' + err.message
				);
				//error.value = ;
			}
		};

		const todoUpdated = computed(() => {
			return !_.isEqual(todo.value, originalTodo.value);
		});

		const moveToTodoListPage = () => {
			router.push({
				name: 'Todos',
			});
		};

		return {
			todo,
			loading,
			showToast,
			toastMessage,
			toastType,
			toggleTodoStatus,
			moveToTodoListPage,
			onSave,
			todoUpdated,
		};
	},
};
</script>

<style></style>
