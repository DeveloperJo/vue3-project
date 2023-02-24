<template>
	<div>
		<h1>Create Todo</h1>
		<hr />
		<TodoForm :editing="false" />
	</div>
</template>

<script>
import { ref } from 'vue';
import axios from '@/axios';
import { useToast } from '@/composables/toast';
import TodoForm from '@/components/TodoForm.vue';

export default {
	components: {
		TodoForm,
	},
	setup() {
		const todo = ref(''); // ref는 string, int, object, list 모든 타입을 사용할 수 있다. 값을 치환할 때는 value를 이용해야 한다.
		// const hasError = ref(false);
		const { showToast, toastMessage, toastType, sendToast } = useToast();

		const onSubmit = () => {
			const keyword = todo.value;
			if (keyword == '') sendToast('danger', 'This fied cannot be empty');
			else {
				addTodo({
					id: Date.now(),
					subject: todo.value,
					completed: false,
				});

				// hasError.value = false;
				todo.value = '';
			}
		};

		const addTodo = async (todo) => {
			// 데이터베이스 Todo 저장 - 비동기
			try {
				await axios.post('todos', {
					//id: todo.id,
					subject: todo.subject,
					completed: todo.completed,
				});
				// getTodos(1);
				// todos.value.push(res.data);
				// console.log(res);
			} catch (err) {
				//error.value = 'Add Todo - Something went wrong. ' + err.message;
				sendToast('danger', 'Add Todo - Something went wrong. ' + err.message);
			}

			// .then((res) => {
			// 	console.log(res);
			// 	if (res.status == 201) {
			// 		// todo에 array 저장
			// 		todos.value.push(res.data);
			// 	}
			// })
			// .catch((err) => {
			// 	console.log(err);
			// 	error.value = 'Something went wrong. ' + err.message;
			// });
		};

		return {
			todo,
			onSubmit,
			// hasError,
			showToast,
			toastMessage,
			toastType,
		};
	},
};
</script>

<style></style>
