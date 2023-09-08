type HandlerFunc = (
  event: import("aws-lambda").APIGatewayEvent,
  context: import("aws-lambda").Context
) => Promise<import("aws-lambda").APIGatewayProxyResult>;
