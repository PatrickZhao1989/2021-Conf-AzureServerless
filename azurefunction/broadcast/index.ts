import { AzureFunction, Context } from "@azure/functions";

const max = 90;
const min = 20;
const dataSeed = [44, 55, 41, 17, 15];

const timerTrigger: AzureFunction = async function (
	context: Context,
	myTimer: any
): Promise<void> {
	var timeStamp = new Date().toISOString();

	if (myTimer.isPastDue) {
		context.log("Timer function is running late!");
	}
	context.log("Timer trigger function ran!", timeStamp);

	// Line chart serious data

	const data = [
		{ name: "room 1", data: [] },
		{ name: "room 2", data: [] },
		{ name: "room 3", data: [] },
	];
	data.forEach((element) => {
		element.data = dataSeed.map(() => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		});
	});

	context.bindings.signalRMessages = [
		{
			target: "newMessage",
			arguments: [{ triggeredAt: timeStamp, data: data }],
		},
	];

	context.done();
};

export default timerTrigger;
