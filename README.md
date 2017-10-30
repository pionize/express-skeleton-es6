# Project Assessment

### Documentation
#### Directory Structure
Each module will be placed under `src/modules` directory. As a rule of thumb, split modules into small chunks. All public API should be exposed via `index.js`, even there is no limitation in NodeJS, it is considered best practice as it will prevent us to import something unknown and prevent tightly-coupled modules. Think the `index.js` as a gateway to exchange things.

Example:

```js
// src/modules/users/product.js
export class Person {
  static id: Int;
  static name: String;
}
```

```js
// src/modules/users/index.js
import * as model from './model';
export model;
```

```js
// src/modules/comments/product.js
import { model } from '../users';

class Comment {
  static id: Int;
  static person: model.Person;
}
```

#### Configuration
Base configuration file is located inside `/config` directory, the `index.js` will be overriden by the local configuration. Local configuration is excluded from the repository and depends on the `NODE_ENV` value. For example, in development environment, the local config file should be `development.js`.

#### Migrations & Seed
- To create new migration script, use `node_modules/.bin/sequelize migration:generate --name {NAME}`
- To run the migration script, `babel-node node_modules/.bin/sequelize db:migrate`
  a. If you wish to undo most recent migration: `node_modules/.bin/sequelize db:migrate:undo`
  b. If you wish to undo all migrations: `node_modules/.bin/sequelize db:migrate:undo:all`
  b. If you wish to undo specific migration: `node_modules/.bin/sequelize db:migrate:undo:all --to {NAME}`
- To create new seed, use `node_modules/.bin/sequelize seed:generate --name {NAME}`
- To runing the seeds, use `node_modules/.bin/sequelize db:seed:all`
  a. If you wish to undo most recent seed: `node_modules/.bin/sequelize db:seed:undo`
  b. If you wish to undo all seeds: `node_modules/.bin/sequelize db:seed:undo:all`

#### CLI Commands
Here's list of commands you can use:
- `yarn run lint` run linter (eslint with airbnb config)
- `yarn run check` run flow static typing check. https://github.com/facebook/flow
- `yarn run test` run jest test
- `yarn run test:coverage` run jest test with code coverage
- `yarn run build` transpile all js files under `src` directory into `build` folder
- `yarn run build:watch` build with watcher enabled
- `yarn run start` run app server
