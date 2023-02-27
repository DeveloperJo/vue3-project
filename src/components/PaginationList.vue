<template>
	<div>
		<nav aria-label="Page navigation example">
			<ul class="pagination">
				<li v-if="currentPage !== 1" class="page-item">
					<a
						class="page-link"
						@click="onClick(currentPage - 1)"
						aria-label="Previous"
					>
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li
					class="page-item"
					:class="currentPage === page ? 'active' : ''"
					v-for="page in numberOfPages"
					:key="page"
				>
					<a class="page-link" @click="onClick(page)">{{ page }}</a>
				</li>
				<li v-if="currentPage !== numberOfPages" class="page-item">
					<a
						class="page-link"
						@click="onClick(currentPage + 1)"
						aria-label="Next"
					>
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
	props: {
		numberOfPages: {
			type: Number,
			required: true,
		},
		currentPage: {
			type: Number,
			required: true,
		},
	},
	emits: ['page-click'],
	setup() {
		const { emit } = getCurrentInstance();

		const onClick = (page) => {
			emit('page-click', page);
		};

		return {
			onClick,
		};
	},
};
</script>

<style scoped>
a.page-link {
	cursor: pointer;
}
</style>
