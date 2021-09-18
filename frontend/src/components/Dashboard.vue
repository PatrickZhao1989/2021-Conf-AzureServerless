<template>
	<h3>{{ state.title }}</h3>
	<apexchart
		type="heatmap"
		height="500"
		:options="chart?.chartOptions"
		:series="chart?.series"
	></apexchart>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import * as signalR from "@microsoft/signalr";

const generateData = (count: number, yrange: { min: number; max: number }) => {
	var i = 0;
	var series = [];
	while (i < count) {
		var x = (i + 1).toString();
		var y =
			Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
			yrange.min;
		series.push({
			x: x,
			y: y,
		});
		i++;
	}
	return series;
};

export default defineComponent({
	props: {
		title: String,
	},
	setup(props, context) {
		const state = reactive({
			title: "Demo heatmap",
		});
		let chart = reactive({
			options: {},
			series: [
				{
					name: "Room 1",
					data: generateData(5, { min: 20, max: 60 }),
				},
				{
					name: "Room 2",
					data: generateData(5, { min: 20, max: 60 }),
				},
				{
					name: "Room 3",
					data: generateData(5, { min: 20, max: 60 }),
				},
			],
			chartOptions: {
				chart: {
					height: 350,
					type: "heatmap",
				},
				plotOptions: {
					heatmap: {
						shadeIntensity: 0.5,
						radius: 0,
						useFillColorAsStroke: true,
						colorScale: {
							ranges: [
								{
									from: 20,
									to: 30,
									name: "low",
									color: "#00A100",
								},
								{
									from: 30,
									to: 40,
									name: "medium",
									color: "#128FD9",
								},
								{
									from: 40,
									to: 50,
									name: "high",
									color: "#FFB200",
								},
								{
									from: 50,
									to: 60,
									name: "extreme",
									color: "#FF0000",
								},
							],
						},
					},
				},
				dataLabels: {
					enabled: false,
				},
				// xaxis: {
				// 	type: "category",
				// 	categories: ["13:00", "14:00", "15:00", "16:00", "17:00"],
				// },
				stroke: {
					width: 1,
				},
				title: {
					text: "HeatMap Chart with Color Range",
				},
			},
		});

		const updateData = (): void => {
			const max = 90;
			const min = 20;
			const newData0 = chart.series[0].data.map(() => {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			});
			// chart.series[0].data = newData0;

			const newData1 = chart.series[0].data.map(() => {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			});
			//chart.series[1].data = newData1;
		};

		// onMounted(() => {
		// 	console.log("dynamically update data ");

		// 	// start(0);
		// 	// Test signal R connection
		// 	const connection = new signalR.HubConnectionBuilder()
		// 		.withUrl(`${process.env.VUE_APP_BACKENDURL}/api`)
		// 		.configureLogging(signalR.LogLevel.Information)
		// 		.build();
		// 	connection.on("newMessage", (message) => {
		// 		console.log(`new message arrived ${JSON.stringify(message)}`);
		// 		chart.series = message.data;
		// 	});
		// 	connection.start().catch(console.error);
		// });

		return { state, updateData, chart };
	},
});
</script>
