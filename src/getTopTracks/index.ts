import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const ApiEndpoint: string = process.env.DEEZERENDPOINT!;
const ApiKey: string = process.env.DEEZERKEY!;

export const handler: HandlerFunc = async (event, context) => {
  try {
    const pathSearch = event.queryStringParameters?.artistid;
    const queryParams = new URLSearchParams({ values: `${pathSearch}` });
    const valueQuery = queryParams.toString().split("=")[1];

    console.log(queryParams.toString().split("=")[1]);

    const response = await fetch(
      `${ApiEndpoint}artist/${valueQuery}/top?limit=5`
    );

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
