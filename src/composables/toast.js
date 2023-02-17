import { ref, onUnmounted } from 'vue';

export const useToast = () => {
	const showToast = ref(false);
	const toastMessage = ref('');
	const toastType = ref('');

	const timeout = ref(null);

	const sendToast = (type = 'success', message) => {
		showToast.value = true;
		toastType.value = type;
		toastMessage.value = message;

		timeout.value = setTimeout(() => {
			toastMessage.value = '';
			showToast.value = false;
		}, 2000);
	};

	// view 나가기 전에, 메모리 정리
	onUnmounted(() => {
		clearTimeout(timeout.value);
	});

	return {
		showToast,
		toastMessage,
		toastType,
		sendToast,
	};
};
