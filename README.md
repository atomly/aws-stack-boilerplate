# atomly

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [TODOs](#todos)
- [Packages](#packages)
- [Installation](#installation)
- [Commiting code changes](#commiting-code-changes)
- [Versioning a package](#versioning-a-package)
- [Creating a new package](#creating-a-new-package)
- [Add a dependency](#add-a-dependency)
- [Building](#building)
- [EOL](#eol)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## TODOs

- [ ] Update/improve collections and improve the `template-api` (GraphQL API) and `template-services` (REST API).

## Packages

<!-- START custom generated Lerna Packages please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN `npm run doc` TO UPDATE -->

- [@atomly/template-api](https://github.com/atomly/template/tree/master/packages/template-api "@atomly/template-api package homepage")
- [@atomly/template-collections-lib](https://github.com/atomly/template/tree/master/packages/template-collections-lib "@atomly/template-collections-lib package homepage")
- [@atomly/template-services](https://github.com/atomly/template/tree/master/packages/template-services "@atomly/template-services package homepage")
- [@atomly/template-payments-lib](https://github.com/atomly/template/tree/master/packages/template-stripe-lib "@atomly/template-payments-lib package homepage")

<!-- END custom generated Lerna Packages please keep comment here to allow auto update -->

## Installation

```cli
npm install -g lerna commitizen
git clone git@github.com:atomly/atomly.git
npm install
npm run bootstrap
```

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
