<template>
	<div class="container">
		<h4>count : {{ count }}</h4>
		<h4>double count computed : {{ doubleCountComputed }}</h4>
		<h4>double count method : {{ doubleCountMethod() }}</h4>
		<button @click="count++">Add one</button>
		<h2>To-Do List</h2>
		<TodoSimpleForm @add-todo="addTodo" />
		<div v-if="!todos.length">추가된 To-Do가 없습니다.</div>
		<TodoList
			:todos="todos"
			@toggle-todo="toggleTodo"
			@delete-todo="deleteTodo"
		/>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';

export default {
	components: {
		TodoSimpleForm,
		TodoList,
	},
	setup() {
		const todos = ref([]);

		const todoStyle = {
			textDecoration: 'line-through',
			color: 'gray',
		};

		const addTodo = (todo) => {
			console.log(todo);
			todos.value.push(todo);
		};

		const toggleTodo = (index) => {
			todos.value[index].completed = !todos.value[index].completed;
		};

		const deleteTodo = (index) => {
			todos.value.splice(index, 1);
		};

		const count = ref(1);
		// computed vs method
		// 1) method는 인자값을 받아서 처리가 가능. computed는 불가능
		// 2) computed는 reactive되는 값이 있어야 한다.
		// 3) computed는 캐시에 저장이 되어, 한번 계산을 하고 값을 저장을 하고 있다. 두번 연달아 사용하는 경우 한번만 호출한다
		const doubleCountComputed = computed(() => {
			return count.value * 2;
		});

		const doubleCountMethod = () => {
			return count.value * 2;
		};

		return {
			todos,
			todoStyle,
			addTodo,
			toggleTodo,
			deleteTodo,
			count,
			doubleCountComputed,
			doubleCountMethod,
		};
	},
};
</script>

<style>
.todo {
	color: gray;
	text-decoration: line-through;
}
</style>
