<template>
	<div>
		<form @submit.prevent="onSubmit">
			<div class="d-flex">
				<div class="flex-grow-1 mr-2">
					<input
						class="form-control"
						type="text"
						v-model="todo"
						placeholder="Type new To-Do"
					/>
				</div>
				<div>
					<button type="submit" class="btn btn-primary">Add</button>
				</div>
			</div>
			<div class="text-danger" v-show="hasError">
				This field cannot be empty
			</div>
		</form>
	</div>
</template>

<script>
export default {
	setup() {},
};
</script>

<style></style>
