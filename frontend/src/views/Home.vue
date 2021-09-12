<template>
	<div class="home">
		<Dashboard></Dashboard>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Dashboard from "@/components/Dashboard.vue"; // @ is an alias to /src

@Options({
	components: {
		Dashboard,
	},
})
export default class Home extends Vue {}
</script>
