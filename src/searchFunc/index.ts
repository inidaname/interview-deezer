import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const ApiEndpoint: string = process.env.DEEZERENDPOINT!;
const ApiKey: string = process.env.DEEZERKEY!;

export const handler: HandlerFunc = async (event, context) => {
  try {
    const querySearch = event.queryStringParameters?.search;
    const queryParams = new URLSearchParams({
      q: `track:"${querySearch}"`,
    });

    if (queryParams.toString() === undefined) {
      throw new Error("You provided an emtpy query");
    }
    const response = await fetch(`${ApiEndpoint}?${queryParams?.toString()}`);

    if (!response.ok) {
      throw new Error(
        `Deezer API request failed with status ${response.status}`
      );
    }

    const responseData = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(responseData || []),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
