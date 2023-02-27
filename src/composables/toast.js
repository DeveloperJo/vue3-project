import { useStore } from 'vuex';
import { computed } from 'vue';

export const useToast = () => {
	const store = useStore();

	const toastMessage = computed(() => store.getters.toastMessageWithSmile);
	const toastType = computed(() => store.state.toastType);
	const showToast = computed(() => store.state.showToast);

	const sendToast = (type = 'success', message) => {
		store.dispatch('sendToast', message, type);
	};

	return {
		showToast,
		toastMessage,
		toastType,
		sendToast,
	};
};
