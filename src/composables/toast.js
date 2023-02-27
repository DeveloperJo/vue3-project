import { useStore } from 'vuex';
import { computed } from 'vue';

export const useToast = () => {
	const store = useStore();

	// const toastMessage = computed(
	// 	() => store.getters['toast/toastMessageWithSmile']
	// );
	// const toastType = computed(() => store.state.toast.type);
	// const showToast = computed(() => store.state.toast.showToast);
	const toasts = computed(() => store.state.toast.toasts);

	const sendToast = (type = 'success', message) => {
		store.dispatch('toast/sendToast', { type, message });
	};

	return {
		toasts,
		sendToast,
	};
};
