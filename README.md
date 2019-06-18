# ir-api

A lean, functional Javascript client for the Independent Reserve API.

[![Greenkeeper badge](https://badges.greenkeeper.io/davesag/ir-api.svg)](https://greenkeeper.io/)

<!-- prettier-ignore -->
| branch | status | coverage | notes |
| ------ | ------ | -------- | ----- |
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/ir-api/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/ir-api/tree/develop) | [![codecov](https://codecov.io/gh/davesag/ir-api/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/ir-api) | Work in progress |
| `master` | [![CircleCI](https://circleci.com/gh/davesag/ir-api/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/ir-api/tree/master) | [![codecov](https://codecov.io/gh/davesag/ir-api/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/ir-api) | Latest stable release |

[![NPM](https://nodei.co/npm/ir-api.png)](https://nodei.co/npm/ir-api/)

## Usage

`ir-api` has no dependencies of its own but requires `axios` as a peer dependency.

```sh
npm install axios ir-api
```

The API calls follow the documentation set out at https://www.independentreserve.com/api but start with a lower case letter instead of upper case.

Similarly all returned data will have keys that start with lower case instead of upper case.

### Public Methods

```js
const ir = require('ir-api')

const { getValidPrimaryCurrencyCodes } = ir()

getValidPrimaryCurrencyCodes().then(codes => {
  console.log('codes', codes)
})
```

### Private Methods

```js
const ir = require('ir-api')

const { getOpenOrders } = ir('my-api-key', 'my-api-secret')

getOpenOrders().then(data => {
  console.log('data', data)
})
```

### Passing parameters to methods

Parameters are passed as an object, so for example

```js
getOpenOrders({
  primaryCurrencyCode: 'Xbt',
  secondaryCurrencyCode: 'Usd'
}).then(data => {
  console.log('data', data)
})
```

### Configuring `axios`

Under the hood the `ir-api` uses [`axios`](https://github.com/axios/axios) as its transport layer with the following defaults:

```js
{
  baseURL: 'https://api.independentreserve.com',
  timeout: 2500
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Independent Reserve Javascript API (github.com/davesag/ir-api)'
  }
}
```

You can change this by passing your own configuration object into the `ir` function.

```js
const ir = require('ir-api')

const { getAccounts } = ir('my-api-key', 'my-api-secret', {
  timeout: 500,
  headers: { 'User-Agent': 'My amazing app' }
})
```

You can supply any [configuration options that `axios` supports](https://github.com/axios/axios#axioscreateconfig), however if you change the `baseURL`, or `Content-Type` you will find the API calls stop working, so I don't advise doing that.

If your app needs to run integration tests against a mock IR server (maybe you built one for this purpose) then this is where you'd override the `baseURL`.

Independent Reserve's public API server can be quite slow which is why the `timeout` is set to `2500` by default. It's much faster if you use an `apiKey` and `apiSecret` however.

### Default parameters

- `nonce`: computed for you
- `pageIndex`: `1`
- `pageSize`: `25`
- `signature`: computed for you

### using `async` / `await`

All methods return a resolved promise so you can safely use `async` / `await`

### example

See [this gist](https://gist.github.com/davesag/3567876481344419827e514bae78a02b) for an example of using the API to retrieve your IR balance, then get the market rates for each of your coins, convert to Australian Dollars and display a simple ASCII table with the results and a total.

### Errors

If an API call returns an error we return it as

```js
{
  code: 'some code', // an error code or numeric status
  message: 'some message' // some helpful message
}
```

## Development

### Prerequisites

- [NodeJS](htps://nodejs.org), version 8.10.0 or better (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)

### Initialisation

```sh
npm install
```

### Test it

- `npm test` — runs the unit tests
- `npm run test:unit:cov` — runs the unit tests with code coverage
- `npm run test:mutants` — runs the mutation tests

### Lint it

```sh
npm run lint
```

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
