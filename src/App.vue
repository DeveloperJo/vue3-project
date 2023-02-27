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

<style>
.slide-enter-active {
	transition: all 0.3s ease-out;
}

.slide-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	transform: traslateX(30px);
}
/*
.slide-enter-to .slide-leave-from {
	opacity: 1;
	transform: traslateY(0px);
}
*/
</style>
