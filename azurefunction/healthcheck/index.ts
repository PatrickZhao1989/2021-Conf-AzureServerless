import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
	context: Context,
	req: HttpRequest
): Promise<void> {
	context.log("health check executed");

	context.res = {
		// status: 200, /* Defaults to 200 */
		status: 200,
		body: "heal check executed",
	};
};

export default httpTrigger;
