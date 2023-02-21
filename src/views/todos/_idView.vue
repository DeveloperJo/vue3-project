<template>
	<div>
		<h2>Todo Page</h2>
		<hr />
		<TodoForm :editing="true" />
	</div>
</template>

<script>
import TodoForm from '@/components/TodoForm.vue';

export default {
	components: {
		TodoForm,
	},
};
</script>

<style></style>
