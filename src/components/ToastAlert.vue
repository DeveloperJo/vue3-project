<template>
	<div class="toast-box">
		<transition-group name="slide">
			<div
				v-for="toast in toasts"
				:key="toast.id"
				class="alert"
				:class="`alert-${toast.type}`"
				role="alert"
			>
				{{ toast.message }}
			</div>
		</transition-group>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue';
import { useToast } from '@/composables/toast';
// import { ref } from '@vue/reactivity';
export default {
	setup() {
		const { props } = getCurrentInstance();
		const alertClass =
			props.type == 'success' ? 'alert-success' : 'alert-danger';

		const { toasts } = useToast();

		return {
			alertClass,
			toasts,
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
.slide-enter-active,
.slide-leave-active {
	transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	transform: traslateY(-30px);
}

.slide-enter-to .slide-leave-from {
	opacity: 1;
	transform: traslateY(0px);
}
</style>
