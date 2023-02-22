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
						@click.stop="openModal(t.id)"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
		<Teleport to="#modal">
			<DeleteModal
				:showModal="showModal"
				@close="closeModal"
				@delete="deleteTodo"
			/>
		</Teleport>
	</div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import Modal from '@/components/ModalDialog.vue';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
	// props: ['todos'],
	components: {
		DeleteModal,
	},
	props: {
		todos: {
			type: Array,
			required: true,
		},
	},
	emits: ['toggle-todo', 'delete-todo'],
	setup(props, { emit }) {
		const router = useRouter();
		const showModal = ref(false);
		const deleteTodoId = ref(null);
		const toggleTodo = (index, event) => {
			emit('toggle-todo', index, event.target.checked);
		};

		const openModal = (id) => {
			showModal.value = true;
			deleteTodoId.value = id;
		};

		const closeModal = () => {
			deleteTodoId.value = null;
			showModal.value = false;
		};

		const deleteTodo = () => {
			// console.log(index);
			emit('delete-todo', deleteTodoId.value);

			closeModal();
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
			showModal,
			openModal,
			closeModal,
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
