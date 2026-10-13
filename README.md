# lynia-api

lynia api is an application containing JavaScript. The checked-in dependency manifests use Express, MongoDB via Mongoose. Source modules cover `Product`, `Role`, `Service`, `Token`, `User`, `Products`, `Roles`, `Services`, `Tokens`, `Users`.

## Repository layout

- `models/` — 5 tracked file(s); source examples: `models/Product.js`, `models/Role.js`.
- `routes/` — 5 tracked file(s); source examples: `routes/Products.js`, `routes/Roles.js`.
- `utils/` — 1 tracked file(s); source examples: `utils/utils.js`.

## Local setup

Run each package setup block from the repository root. For workspace repositories, install dependencies at the root before running application-specific scripts.

Clone this repository and enter its directory:

```sh
git clone https://github.com/stanleyHayes/lynia-api.git
cd lynia-api
```

### Node package: `package.json`

Use Node.js and npm.

```sh
npm install
```

- `node index.js` — executes the package entry point.
- The package test script is a placeholder and exits with an error; it does not run an automated test suite.

## Configuration

The application declares `dotenv`. Review environment-variable references in the source and supply your own local values before starting it. Keep credentials out of Git; do not reuse committed credentials.

## Source entry points

- [index.js](index.js)
- [models/Product.js](models/Product.js)
- [models/Role.js](models/Role.js)
- [models/Service.js](models/Service.js)
- [models/Token.js](models/Token.js)
- [models/User.js](models/User.js)
- [routes/Products.js](routes/Products.js)
- [routes/Roles.js](routes/Roles.js)

## Development notes

Commands above come from the tracked manifests and source layout. External services and runtime configuration may be required. Documentation updates do not establish that the application is deployed or that its tests pass.
