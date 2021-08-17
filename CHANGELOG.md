# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](https://github.com/verkkokauppacom/teams-logger/compare/v3.0.4...v4.0.0) (2021-08-17)


### ⚠ BREAKING CHANGES

* The return type from the Node.js API is now
`Promise<http.IncomingMessage>` instead of `Promise<got.Response>`.

### Features

* remove got as a dependency and use native https.request ([d60f1a2](https://github.com/verkkokauppacom/teams-logger/commit/d60f1a207c379ca75b39ef1e54584f05fbb2cde1))

### [3.0.4](https://github.com/verkkokauppacom/teams-logger/compare/v3.0.3...v3.0.4) (2021-03-02)


### Bug Fixes

* echoing was broken after TypeScript rewrite ([0e30926](https://github.com/verkkokauppacom/teams-logger/commit/0e3092607338ddaecd241a3294b257ea217bd8a0))

### [3.0.3](https://github.com/verkkokauppacom/teams-logger/compare/v3.0.2...v3.0.3) (2021-03-02)


### Bug Fixes

* support new v2 format of webhook URL ([50abca2](https://github.com/verkkokauppacom/teams-logger/commit/50abca22337dd4373dd90e457b2f71aadb6ce2db))

### [3.0.2](https://github.com/verkkokauppacom/teams-logger/compare/v3.0.1...v3.0.2) (2021-02-22)


### Bug Fixes

* extract version number tag from refs/*/<tag> ([7bd45b5](https://github.com/verkkokauppacom/teams-logger/commit/7bd45b58977d5f67578839d62a8f334f50c76a44))

### [3.0.1](https://github.com/verkkokauppacom/teams-logger/compare/v3.0.0...v3.0.1) (2021-02-22)


### Bug Fixes

* run publish jobs on "release published" event, instead of pushed tag ([0089505](https://github.com/verkkokauppacom/teams-logger/commit/0089505b6bc51925db6d788e0e9a1b4d29e1c5c9))

## [3.0.0](https://github.com/verkkokauppacom/teams-logger/compare/v2.2.1...v3.0.0) (2021-02-22)


### ⚠ BREAKING CHANGES

* The rawLogger and simpleLogger methods no longer catch errors, call console.error, or set the process.exitCode. This allows for custom handling of errors and makes for a cleaner API.

### Features

* rewrite application in TypeScript ([6d31373](https://github.com/verkkokauppacom/teams-logger/commit/6d313737ee069bccc56f718e7a6076683e492f7f))


### Bug Fixes

* do not catch errors when using the Node.js API ([af42e81](https://github.com/verkkokauppacom/teams-logger/commit/af42e8191a45109125ec1e361f5c5e11fd65746a))
* suppress errors from importing from .ts extension ([255e44a](https://github.com/verkkokauppacom/teams-logger/commit/255e44a4dea73aae134ab1d02192bdc3d7c5a4a9))
* use SerializableObject type for json structures ([2c6c67c](https://github.com/verkkokauppacom/teams-logger/commit/2c6c67c4ca5956699ffc325b5e821127fb1dc66d))

### [2.2.1](https://github.com/verkkokauppacom/teams-logger/compare/v2.2.0...v2.2.1) (2021-02-19)

## [2.2.0](https://github.com/verkkokauppacom/teams-logger/compare/v2.1.0...v2.2.0) (2020-10-01)


### Features

* add optional --timeout and --allow-failure flags ([cf571ae](https://github.com/verkkokauppacom/teams-logger/commit/cf571aec751a7935fc34cc943ae25be18cdcb5ac))

## [2.1.0](https://github.com/verkkokauppacom/teams-logger/compare/v2.0.0...v2.1.0) (2020-07-29)


### Features

* replace request and request-promise with bent ([61bea8c](https://github.com/verkkokauppacom/teams-logger/commit/61bea8c2416d1d3a93f6210e4e7bda4b89ea9305))

## [2.0.0](https://github.com/verkkokauppacom/teams-logger/compare/v1.0.3...v2.0.0) (2020-04-07)


### ⚠ BREAKING CHANGES

* **deps:** A lot of the dependencies have dropped support for EOL Node.js versions, so also set egines.node to ">= 10"

* **deps:** update dependencies ([6d91dae](https://github.com/verkkokauppacom/teams-logger/commit/6d91dae70cb21c94650a4d97af7dcdabceb4278c))

### [1.0.3](https://github.com/verkkokauppacom/teams-logger/compare/v1.0.2...v1.0.3) (2019-09-30)


### Bug Fixes

* use correct name in cli output ([5fc21b5](https://github.com/verkkokauppacom/teams-logger/commit/5fc21b5))

### [1.0.2](https://github.com/verkkokauppacom/teams-logger/compare/v1.0.1...v1.0.2) (2019-07-23)


### Build System

* add Dockerfile ([ae6e935](https://github.com/verkkokauppacom/teams-logger/commit/ae6e935))



### [1.0.1](https://github.com/verkkokauppacom/teams-logger/compare/v1.0.0...v1.0.1) (2019-07-09)



## 1.0.0 (2019-07-09)


### Bug Fixes

* prettier errors ([72105a7](https://github.com/verkkokauppacom/teams-logger/commit/72105a7))
* update package name ([e4e95a4](https://github.com/verkkokauppacom/teams-logger/commit/e4e95a4))


### Build System

* add version script ([0f0a4ce](https://github.com/verkkokauppacom/teams-logger/commit/0f0a4ce))


### Features

* initial commit ([92e9fae](https://github.com/verkkokauppacom/teams-logger/commit/92e9fae))


### Tests

* add some tests ([6bb58e9](https://github.com/verkkokauppacom/teams-logger/commit/6bb58e9))
