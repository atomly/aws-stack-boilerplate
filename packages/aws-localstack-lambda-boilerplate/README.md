# `@atomly/aws-localstack-lambda-boilerplate`

## Resources

- [LocalStack Serverless Plugin](https://github.com/localstack/serverless-localstack)
- [Serverless Localstack](https://www.serverless.com/plugins/serverless-localstack)

## What is LocalStack?

[LocalStack](https://github.com/localstack/localstack) provides an easy-to-use test/mocking framework for developing Cloud applications. This means you can test **AWS cloud** resources locally on your machine.

> Note: [LocalStack](https://github.com/localstack/localstack) **only supports** AWS cloud stack

**LocalStack** spins up the following **core Cloud APIs** on your local machine:

- ACM, API Gateway, CloudFormation, CloudWatch
- CloudWatch Logs, DynamoDB, DynamoDB Streams
- EC2, Elasticsearch Service, EventBridge (CloudWatch Events)
- Firehose, IAM, Kinesis, KMS, Lambda, Redshift
- Route53, S3, SecretsManager, SES, SNS
- SQS, SSM, StepFunctions, STS

### Benefits of Using LocalStack

- Reduce Cost
- Test AWS Cloud Resource Locally
- Learn AWS Cloud Resource Locally
- Debug Locally

## Installation

Run the localstack image by running the monorepo's `docker-compose` file located in the root `setup` directory.

Once the container has started successfully you will see the logs of the LocalStack services.

To check all the services click here: [LocalStack health](http://localhost:4566/health).

## LocalStack and Serverless

To use deploy AWS resources using the Serverless framework to the LocalStack instance, add the ***LocalStack plugin** as shown below to the `serverless.yml`:

```yml
service: aws-localstack-lambda

plugins:
  - serverless-localstack

custom:
  localstack:
    debug: true
    stages: # list of stages for which the plugin should be enabled
      - local
      - dev
    host: http://localhost  # (default) optional - LocalStack host to connect to
    edgePort: 4566  # (default) optional - LocalStack edge port to connect to

frameworkVersion: '2'

provider:
  name: aws
  runtime: nodejs12.x

functions:
  # Invoked through Serverless invoke CLI:
  invoke_hello:
    handler: src/handler.hello

  # Invoked through LocalStack API Gateway:
  http_hello:
    handler: src/handler.hello
    events:
    - http:
        path: hello
        method: get
```

In the above file, the `custom.localstack` property holds respective LocalStack configuration. M[More configuration information can be found here](https://github.com/localstack/serverless-localstack).

### Deploying to LocalStack through Serverless

To deploy the ***hello** function in the **LocalStack** run the following **command**:

```bash
    sls deploy --stage local
```

To check if the service deployed successfully, run the following **command**:

```bash
    sls info --stage local
```

You will see the following **output** as shown below:

```yaml
service: aws-localstack-lambda
stage: local
region: us-east-1
stack: aws-localstack-lambda-local
resources: 12
api keys:
  None
endpoints:
  http://localhost:4566/restapis/mvfn6xa8x9/local/_user_request_
functions:
  invoke_hello: aws-localstack-lambda-local-invoke_hello
  http_hello: aws-localstack-lambda-local-http_hello   
layers:
  None
```

To invoke the `invoke_hello` function locally, **run the following command**:

```bash
    sls invoke --stage local -f invoke_hello -l
```

Then you will see the following **output** as shown below, which means the function run **successfully locally** through **LocalStack**:

```json
{
    "body": "{\n  \"message\": \"Go Serverless v1.0! Your function executed successfully!\",\n  \"input\": {}\n}",
    "statusCode": 200
}
```

We also added an **API Gateway** using **LocalStack**, so that the **hello** function can be accessed through HTTP.

To invoke the `http_hello` function, use the following **URL** in the browser:

**NOTE: Your URL string will likely be different, check the `http://localhost:4566/restapis/{ID}` path.**

[http_hello](http://localhost:4566/restapis/mvfn6xa8x9/local/_user_request_/hello)

```json
{
  "message": "Go Serverless v1.0! Your function executed successfully!",
  "input": {
    "path": "/hello",
    "headers": {
      "Remote-Addr": "172.21.0.1",
      "User-Agent": "vscode-restclient",
      "Accept-Encoding": "gzip, deflate",
      "Host": "localhost:4566",
      "Connection": "close",
      "X-Forwarded-For": "172.21.0.1, localhost:4566, 127.0.0.1, localhost:4566",
      "x-localstack-edge": "http://localhost:4566",
      "Authorization": "AWS4-HMAC-SHA256 Credential=__internal_call__/20160623/us-east-1/apigateway/aws4_request, SignedHeaders=content-type;host;x-amz-date;x-amz-target, Signature=1234",
      "x-localstack-tgt-api": "apigateway"
    },
    "multiValueHeaders": {
      "Remote-Addr": [
        "172.21.0.1"
      ],
      "User-Agent": [
        "vscode-restclient"
      ],
      "Accept-Encoding": [
        "gzip, deflate"
      ],
      "Host": [
        "localhost:4566"
      ],
      "Connection": [
        "close"
      ],
      "X-Forwarded-For": [
        "172.21.0.1, localhost:4566, 127.0.0.1, localhost:4566"
      ],
      "x-localstack-edge": [
        "http://localhost:4566"
      ],
      "Authorization": [
        "AWS4-HMAC-SHA256 Credential=__internal_call__/20160623/us-east-1/apigateway/aws4_request, SignedHeaders=content-type;host;x-amz-date;x-amz-target, Signature=1234"
      ],
      "x-localstack-tgt-api": [
        "apigateway"
      ]
    },
    "body": "",
    "isBase64Encoded": false,
    "httpMethod": "GET",
    "queryStringParameters": {},
    "multiValueQueryStringParameters": {},
    "pathParameters": {},
    "resource": "/hello",
    "requestContext": {
      "path": "/local/hello",
      "resourcePath": "/hello",
      "apiId": "mvfn6xa8x9",
      "domainPrefix": "mvfn6xa8x9",
      "domainName": "mvfn6xa8x9.execute-api.localhost.localstack.cloud",
      "accountId": "000000000000",
      "resourceId": "d5o5hautn7",
      "stage": "local",
      "identity": {
        "accountId": "000000000000",
        "sourceIp": "127.0.0.1",
        "userAgent": "vscode-restclient"
      },
      "httpMethod": "GET",
      "protocol": "HTTP/1.1",
      "requestTime": "2021-05-17T01:40:01.969Z",
      "requestTimeEpoch": 1621215601969
    },
    "stageVariables": {}
  }
}
```
