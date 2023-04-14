# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

following readme instructions from [ekekenta](https://blog.logrocket.com/building-serverless-app-typescript/)'s blog

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS (this repo was only tested with serverless-offline plugin)

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS (this repo was only tested with serverless-offline plugin)

### Install Serverless plugins
- Run `serverless plugin install -n serverless-offline` to allow running the functions locally
- Run `serverless plugin install -n serverless-dynamodb-local` to download and install a local dynamoDB instance.
    Note: As of march 2023, the dynamodb-local plugin is broken. You may need to manually download the .Jar file and extract it into node_modules/dynamodb/bin

## Test your service

This template contains a CRUD lambda functions triggered by an HTTP request made on the provisioned API Gateway REST API `/{{slv-stage}}/todo` route (`GET`, `POST`, `PUT`, `DELETE` are supported with `{id}` path param), where the default stage created by Serverless Framework is _dev_;
The request body must be provided as `application/json`. The body structure is tested by API Gateway against schemas. _title and _description_ are mandatory when creating a new item, otherwise optional.

- requesting any other path than `/{{slv-stage}}/todo` will result in API Gateway returning a `404` HTTP error code
- sending any HTTP request to `/{{slv-stage}}/todo` with a payload **not** conforming to the schema will result in API Gateway returning a `400` HTTP error code
- sending any CRUD HTTP request to `{{slv-stage}}/todo` with a payload conforming to the schema will result in API Gateway returning a `200` HTTP status code with a message saluting the provided name and the detailed event processed by the lambda

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Locally

In order to test the hello function locally, run the following command:

- `npx sls invoke local -f hello --path src/functions/hello/mock.json` if you're using NPM
- `yarn sls invoke local -f hello --path src/functions/hello/mock.json` if you're using Yarn
- `sls offline start` with any CLI to spinup local DynamoDB server

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://myApiEndpoint/dev/todo' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "shopping",
    "description": "get milk and honey"    
}'
```

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas
- `model` - containing entities for the domain
- `service` - using services to be inject into functions

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
