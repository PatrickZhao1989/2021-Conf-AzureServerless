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
	var now = new Date();

	while (i < count) {
		now.setSeconds(now.getSeconds() + 10);
		var x = now.toLocaleString();
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
		// Initial value
		let chart = reactive({
			options: {},
			series: [
				{
					name: "Tiger",
					data: generateData(5, { min: 20, max: 60 }),
				},
				{
					name: "Elephant",
					data: generateData(5, { min: 20, max: 60 }),
				},
				{
					name: "Leopad",
					data: generateData(5, { min: 20, max: 60 }),
				},
				{
					name: "Lion",
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
				stroke: {
					width: 1,
				},
				title: {
					text: "HeatMap Chart with Color Range",
				},
			},
		});

		/* Example
        {
            "timeStamp": "2021-09-18T13:11:50.015Z",
            "deviceStats": [
                {
                    "name": "Tiger",
                    "numberOfDetection": 11
                },
                {
                    "name": "Elephant",
                    "numberOfDetection": 16
                }
            ]
        }
*/
		const parseData = (
			messageData: {
				timeStamp: string;
				deviceStats: [
					{
						name: string;
						numberOfDetection: number;
					}
				];
			},
			currentChartSeries: {
				name: string;
				data: {
					x: string;
					y: number;
				}[];
			}[]
		): [] => {
			currentChartSeries.forEach((i) => {
				const room = messageData.deviceStats.find(
					(x) => x.name === i.name
				);
				if (i.data.length > 5) i.data.shift();
				i.data.push({
					x: new Date(messageData.timeStamp).toLocaleString(),
					y: room?.numberOfDetection ?? 0,
				});
			});

			return currentChartSeries as [];
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
				chart.series = parseData(message.data, chart.series);
			});
			connection.start().catch(console.error);
		});

		return { state, chart };
	},
});
</script>
