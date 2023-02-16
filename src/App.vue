<template>
	<div>
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<router-link class="navbar-brand" to="/">Dev. Jo</router-link>

				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<router-link class="nav-link active" aria-current="page" to="/todos"
							>Todos</router-link
						>
					</li>
				</ul>
			</div>
		</nav>
		<router-view />
	</div>
</template>

<script>
export default {};
</script>

<style></style>
