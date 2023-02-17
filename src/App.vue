<template>
	<div>
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<router-link class="navbar-brand" :to="{ name: 'Home' }"
					>Dev. Jo</router-link
				>

				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<router-link
							class="nav-link active"
							aria-current="page"
							:to="{ name: 'Todos' }"
							>Todos</router-link
						>
					</li>
				</ul>
			</div>
		</nav>
		<div class="container">
			<router-view />
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
