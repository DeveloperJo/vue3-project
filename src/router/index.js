import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Todos from '../views/todos/IndexView.vue';
import Todo from '../views/todos/_idView.vue';
import TodoCreate from '../views/todos/CreateView.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
		},
		{
			path: '/todos',
			name: 'Todos',
			component: Todos,
		},
		{
			path: '/todos/create',
			name: 'TodoCreate',
			component: TodoCreate,
		},
		{
			path: '/todos/:id',
			name: 'Todo',
			component: Todo,
		},
	],
});

// 1 /home
// 2 /todos
// 3 /todos/create
// 4 /todos/:id

export default router;
