# atomly

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [TODOs](#todos)
- [Packages](#packages)
- [Installation](#installation)
- [Developing Locally with LocalStack](#developing-locally-with-localstack)
  - [What is LocalStack?](#what-is-localstack)
  - [Benefits of Using LocalStack](#benefits-of-using-localstack)
  - [Installing LocalStack](#installing-localstack)
- [Commiting code changes](#commiting-code-changes)
- [Versioning a package](#versioning-a-package)
- [Creating a new package](#creating-a-new-package)
- [Add a dependency](#add-a-dependency)
- [Building](#building)
- [EOL](#eol)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## TODOs

- [ ] Update/improve collections and improve the `template-api` (GraphQL API) and `template-services` (REST API) as well as rename them to be more self explaining.

## Packages

<!-- START custom generated Lerna Packages please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN `npm run doc` TO UPDATE -->

- [@atomly/aws-stack-boilerplate](https://github.com/atomly/aws-stack-boilerplate/tree/master/packages/api-graphql-boilerplate "@atomly/aws-stack-boilerplate package homepage")
- [@atomly/api-rest-boilerplate](https://github.com/atomly/aws-stack-boilerplate/tree/master/packages/api-rest-boilerplate "@atomly/api-rest-boilerplate package homepage")
- [@atomly/aws-localstack-lambda-boilerplate](https://github.com/atomly/aws-stack-boilerplate/tree/master/packages/aws-localstack-lambda-boilerplate "@atomly/aws-localstack-lambda-boilerplate package homepage")
- [@atomly/entities-lib-boilerplate](https://github.com/atomly/aws-stack-boilerplate/tree/master/packages/entities-lib-boilerplate "@atomly/entities-lib-boilerplate package homepage")
- [@atomly/stripe-lib-boilerplate](https://github.com/atomly/aws-stack-boilerplate/tree/master/packages/stripe-lib-boilerplate "@atomly/stripe-lib-boilerplate package homepage")

<!-- END custom generated Lerna Packages please keep comment here to allow auto update -->

## Installation

```cli
npm install -g lerna commitizen
git clone git@github.com:atomly/atomly.git
npm install
npm run bootstrap
```

## Developing Locally with LocalStack

### What is LocalStack?

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

### Installing LocalStack

[Click here to read about installing LocalStack and using it with Serverless](https://github.com/atomly/aws-stack-boilerplate/tree/master/tree/master/packages/aws-localstack-lambda-boilerplate#readme).

## Commiting code changes

This monorepo uses Conventional Changelog specification for commit messages which will be used by Lerna for versioning, and for generating/creating `README.md` files.

In order to commit changes you **must** use the command `git cz` instead of `git commit` to use the `commitizen` command line utility under the hood.

## Versioning a package

Use the command `lerna version`.

## Creating a new package

Before creating a new package using lerna you need to set up git:

```cli
git config user.name <your-name>
git config user.email <your-email>
```

Then `lerna create <package-name>`. See [@lerna/create](https://github.com/lerna/lerna/tree/master/commands/create) for more options.

## Add a dependency

See [@lerna/add](https://github.com/lerna/lerna/tree/master/commands/add) for more options.

## Building

To build all the packages `lerna run build`. To build an specify package `lerna run build --scope=@atomly/<package-name>`.

See [`@lerna/run`](https://github.com/lerna/lerna/tree/master/commands/run) for more options.

## EOL

This monorepo uses `LF` line endings **only**. If your local copy of this repository is using `CRLF` line endings, follow this answer:

[Force LF eol in git repo and working copy](https://stackoverflow.com/a/42135910/10246377).
