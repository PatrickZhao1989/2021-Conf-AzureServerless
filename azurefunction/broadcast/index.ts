import { AzureFunction, Context } from "@azure/functions";

const timerTrigger: AzureFunction = async function (
	context: Context,
	myTimer: any
): Promise<void> {
	var timeStamp = new Date().toISOString();

	if (myTimer.isPastDue) {
		context.log("Timer function is running late!");
	}
	context.log("Timer trigger function ran!", timeStamp);

	context.bindings.signalRMessages = [
		{
			target: "newMessage",
			arguments: [
				`This is a piece of signal R message triggered at ${timeStamp}`,
			],
		},
	];

	context.done();
};

export default timerTrigger;
