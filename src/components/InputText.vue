<template>
	<div>
		<div class="form-group">
			<label>{{ label }}</label>
			<input type="text" class="form-control" :value="value" @input="onInput" />
		</div>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue';
export default {
	props: {
		label: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
	},
	emits: ['update-value'],
	setup() {
		const { emit } = getCurrentInstance();
		const onInput = (e) => {
			emit('update-value', e.target.value);
		};

		return {
			onInput,
		};
	},
};
</script>

<style></style>
