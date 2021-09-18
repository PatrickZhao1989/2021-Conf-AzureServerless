import { AzureFunction, Context } from "@azure/functions";

const getData = (min: any, max: any): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const MIN = 5;
const MAX = 20;

const timerTrigger: AzureFunction = async function (
	context: Context,
	myTimer: any
): Promise<void> {
	const now = new Date();

	context.log("Timer trigger function ran!", now.toISOString());

	// Mock data
	// Partition key is TraceTimeStamp

	const data = {
		traceTimeStamp: `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}_${now.getUTCHours()}-${now.getUTCMinutes()}-${now.getUTCSeconds()}`,
		timeStamp: now.toISOString(),
		deviceDetection: [
			{
				name: "Tiger",
				numberOfDetection: getData(MIN, MAX),
			},
			{
				name: "Elephant",
				numberOfDetection: getData(MIN, MAX),
			},
			{
				name: "Leopad",
				numberOfDetection: getData(MIN, MAX),
			},
			{
				name: "Lion",
				numberOfDetection: getData(MIN, MAX),
			},
		],
	};

	context.log(JSON.stringify(data));
	context.bindings.DeviceDetection = JSON.stringify(data);

	context.done();
};

export default timerTrigger;
