import { AzureFunction, Context } from "@azure/functions";

const max = 90;
const min = 20;
const dataSeed = [44, 55, 41, 17, 15];

const cosmosTrigger: AzureFunction = async function (
	context: Context,
	documents
): Promise<void> {
	var timeStamp = new Date().toISOString();

	context.log("CosmosDB trigger ran!", timeStamp);
	

	// Transform data for frontend to use
	const broadcastMsg = {
		timeStamp: documents[0].timeStamp,
		deviceStats: [...documents[0].deviceDetection],
	};

    context.log("broadcast msg is", JSON.stringify(broadcastMsg));

	context.bindings.signalRMessages = [
		{
			target: "newMessage",
			arguments: [{ triggeredAt: timeStamp, data: broadcastMsg }],
		},
	];

	context.done();
};

export default cosmosTrigger;
