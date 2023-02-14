<template>
	<div>
		<input type="text" :value="name" @input="updateName" />
		<button class="btn btn-primary" @click="onSubmit">Click</button>
	</div>
</template>

<script>
import { ref } from 'vue';

export default {
	setup() {
		const name = ref('Worksheets 1'); // ref는 string, int, object, list 모든 타입을 사용할 수 있다. 값을 치환할 때는 value를 이용해야 한다.

		const onSubmit = () => {
			console.log(name);
		};

		const updateName = (e) => {
			//console.log('updateName : ' + name.value);
			console.log(e);
		};

		return {
			name,
			updateName,
			onSubmit,
		};
	},
};
</script>

<style>
.name {
	color: red;
}
</style>
