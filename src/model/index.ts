// import * as AWS from "aws-sdk";
import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const dynamoDBClient = (): DocumentClient => {
  if (process.env.IS_OFFLINE) {
    return new DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:5000",
    });
  }
  return new DynamoDB.DocumentClient();
};

export default dynamoDBClient;