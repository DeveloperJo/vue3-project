<template>
	<div>
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<router-link class="navbar-brand" :to="{ name: 'Home' }"
					>Dev. Jo</router-link
				>

				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<router-link
							class="nav-link active"
							aria-current="page"
							:to="{ name: 'Todos' }"
							>Todos</router-link
						>
					</li>
				</ul>
			</div>
		</nav>
		<div class="container">
			<router-view />
		</div>
		<transition name="slide">
			<Toast v-if="showToast" :message="toastMessage" :type="toastType" />
		</transition>
	</div>
</template>

<script>
import Toast from '@/components/ToastAlert.vue';
import { useToast } from '@/composables/toast';

export default {
	components: {
		Toast,
	},
	setup() {
		const { showToast, toastMessage, toastType, sendToast } = useToast();

		return {
			showToast,
			toastMessage,
			toastType,
			sendToast,
		};
	},
};
</script>

<style scoped>
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
