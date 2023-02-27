export default {
	namespaced: true,
	state: {
		toasts: [],
		// message: '',
		// type: '',
		// showToast: false,
	},
	mutations: {
		// UPDATE_TOAST_MESSAGE(state, payload) {
		// 	state.message = payload;
		// },
		// UPDATE_TOAST_TYPE(state, payload) {
		// 	state.type = payload;
		// },
		// UPDATE_TOAST_STATUS(state, payload) {
		// 	state.showToast = payload;
		// },
		ADD_TOAST(state, payload) {
			state.toasts.push(payload);
		},
		REMOVE_TOAST(state) {
			state.toasts.shift();
		},
	},
	actions: {
		sendToast({ commit }, message, type = 'success') {
			// commit('UPDATE_TOAST_TYPE', type);
			// commit('UPDATE_TOAST_MESSAGE', message);
			// commit('UPDATE_TOAST_STATUS', true);

			commit('ADD_TOAST', {
				id: Date.now(),
				message,
				type,
			});

			setTimeout(() => {
				// commit('UPDATE_TOAST_TYPE', '');
				// commit('UPDATE_TOAST_MESSAGE', '');
				// commit('UPDATE_TOAST_STATUS', false);
				commit('REMOVE_TOAST');
			}, 10000);
		},
	},
	getters: {
		toastMessageWithSmile(state) {
			return state.message + ':)';
		},
	},
};
