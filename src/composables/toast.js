import { useStore } from 'vuex';
import { computed } from 'vue';

export const useToast = () => {
	const store = useStore();

	const toastMessage = computed(
		() => store.getters['toast/toastMessageWithSmile']
	);
	const toastType = computed(() => store.state.toast.toastType);
	const showToast = computed(() => store.state.toast.showToast);

	const sendToast = (type = 'success', message) => {
		store.dispatch('toast/sendToast', message, type);
	};

	return {
		showToast,
		toastMessage,
		toastType,
		sendToast,
	};
};
