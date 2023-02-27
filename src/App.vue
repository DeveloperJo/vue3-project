<template>
	<div>
		<NavbarTop />
		<div class="container">
			<router-view />
		</div>

		<Toast />
	</div>
</template>

<script>
import Toast from '@/components/ToastAlert.vue';
import NavbarTop from '@/components/NavbarTop.vue';

export default {
	components: {
		Toast,
		NavbarTop,
	},
	setup() {},
};
</script>

<style scoped></style>
