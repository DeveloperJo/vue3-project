import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Todos from '../views/todos/IndexView.vue';

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
			name: 'todos',
			component: Todos,
		},
	],
});

// 1 /home
// 2 /todos
// 3 /todos/create
// 4 /todos/:id

export default router;
