<template>
	<h3>{{ state.title }}</h3>

	<apexchart
		width="500"
		type="line"
		:options="chart?.options"
		:series="chart?.series"
	></apexchart>

	<button @click="updateData">Click me to update data</button>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import * as signalR from "@microsoft/signalr";

export default defineComponent({
	props: {
		title: String,
	},
	setup(props, context) {
		const state = reactive({
			title: "Patric's demo",
		});
		let chart = reactive({
			options: {},
			series: [
				{ name: "room 1", data: [44, 55, 41, 17, 15] },
				{ name: "room 2", data: [12, 321, 12, 324, 123] },
			] as Array<any>,
		});

		const updateData = (): void => {
			const max = 90;
			const min = 20;
			const newData0 = chart.series[0].data.map(() => {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			});
			chart.series[0].data = newData0;

			const newData1 = chart.series[0].data.map(() => {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			});
			chart.series[1].data = newData1;
		};

		onMounted(() => {
			console.log("dynamically update data ");

			// start(0);
			// Test signal R connection
			const connection = new signalR.HubConnectionBuilder()
				.withUrl(`${process.env.VUE_APP_BACKENDURL}/api`)
				.configureLogging(signalR.LogLevel.Information)
				.build();
			connection.on("newMessage", (message) => {
				console.log(`new message arrived ${JSON.stringify(message)}`);
				chart.series = message.data;
			});
			connection.start().catch(console.error);
		});

		const start = (counter: number) => {
			if (counter < 1000000000) {
				setTimeout(function () {
					counter++;
					console.log(counter);
					updateData();
					start(counter);
				}, 2000);
			}
		};

		return { state, updateData, chart };
	},
});
</script>
