<template>
	<div>
		<div class="alert toast-box" :class="alertClass" role="alert">
			{{ message }}
		</div>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue';
// import { ref } from '@vue/reactivity';
export default {
	props: {
		message: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
	},
	setup() {
		const { props } = getCurrentInstance();
		const alertClass =
			props.type == 'success' ? 'alert-success' : 'alert-danger';

		return {
			alertClass,
		};
	},
};
</script>

<style scoped>
.toast-box {
	position: fixed;
	top: 10px;
	right: 10px;
}
</style>
