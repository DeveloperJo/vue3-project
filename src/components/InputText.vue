<template>
	<div>
		<div class="form-group">
			<label>{{ label }}</label>
			<input type="text" class="form-control" :value="value" @input="onInput" />
		</div>
	</div>
</template>

<script>
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
	setup(props, { emit }) {
		const onInput = (e) => {
			emit('update:value', e.target.value);
		};

		return {
			onInput,
		};
	},
};
</script>

<style></style>
