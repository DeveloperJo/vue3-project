export default {
	namespaced: true,
	state: {
		toastMessage: '',
		toastType: '',
		showToast: false,
	},
	mutations: {
		UPDATE_TOAST_MESSAGE(state, payload) {
			state.toastMessage = payload;
		},
		UPDATE_TOAST_TYPE(state, payload) {
			state.toastType = payload;
		},
		UPDATE_TOAST_STATUS(state, payload) {
			state.showToast = payload;
		},
	},
	actions: {
		sendToast({ commit }, message, type = 'success') {
			commit('UPDATE_TOAST_TYPE', type);
			commit('UPDATE_TOAST_MESSAGE', message);
			commit('UPDATE_TOAST_STATUS', true);

			setTimeout(() => {
				commit('UPDATE_TOAST_TYPE', '');
				commit('UPDATE_TOAST_MESSAGE', '');
				commit('UPDATE_TOAST_STATUS', false);
			}, 10000);
		},
	},
	getters: {
		toastMessageWithSmile(state) {
			return state.toastMessage + ':)';
		},
	},
};