import { createStore } from 'vuex';

export default createStore({
	state: {
		toastMessage: '',
		toastType: '',
		showToast: false,
		timeout: null,
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
		UPDATE_TOAST_TIMEOUT(state, payload) {
			state.timeout = payload;
		},
	},
	actions: {
		sendToast({ commit }, message, type = 'success') {
			commit('UPDATE_TOAST_TYPE', type);
			commit('UPDATE_TOAST_MESSAGE', message);
			commit('UPDATE_TOAST_STATUS', true);

			const timeout = setTimeout(() => {
				commit('UPDATE_TOAST_TYPE', '');
				commit('UPDATE_TOAST_MESSAGE', '');
				commit('UPDATE_TOAST_STATUS', false);
			}, 2000);

			commit('UPDATE_TOAST_TIMEOUT', timeout);
		},
	},
	getters: {
		toastMessageWithSmile(state) {
			return state.toastMessage + ':)';
		},
	},
});
