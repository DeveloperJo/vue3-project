<template>
	<div>
		<List :items="todos">
			<template #default="{ item, index }">
				<div
					class="card-body p-2 d-flex align-items-center"
					style="cursor: pointer"
					@click="moveToPage(item.id)"
				>
					<div class="flex-grow-1">
						<input
							class="ml-2 mr-2"
							type="checkbox"
							id="check"
							:checked="item.completed"
							@change.stop="toggleTodo(index, $event)"
							@click.stop
						/>
						<span :class="{ todo: item.completed }">{{ item.subject }}</span>
					</div>
					<div>
						<button
							class="btn btn-danger btn-small"
							@click.stop="openModal(item.id)"
						>
							Delete
						</button>
					</div>
				</div>
			</template>
		</List>
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
import List from '@/components/ListCard.vue';

export default {
	// props: ['todos'],
	components: {
		DeleteModal,
		List,
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
