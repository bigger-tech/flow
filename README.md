![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-starter

This repo contains example nodes to help you get started building your own custom integrations for [n8n](n8n.io). It includes the node linter and other dependencies.

To make your custom node available to the community, you must create it as an npm package, and [submit it to the npm registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry).

## Prerequisites

You need the following installed on your development machine:

- [git](https://git-scm.com/downloads)
- Node.js and npm. Minimum version Node 16. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).

## Install and run custom nodes

- Install n8n with:
  ```
  npm install n8n@0.218.0 -g
  ```
- Recommended: follow n8n's guide to [set up your development environment](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/).
- Run `git clone https://github.com/ScaleMote/flow.git` to clone the repository to your machine.
- Run `npm install` to install the project dependencies.
- Run `(npm ci) -and (npm build)` to build the project. Note that for Windows users is necessary to delete the `npm run clean` of the `build` script.
- Run `npm link` in the project root. This will link our local project to the global context of NPM. We can check that if we run `npm list -g` we should see our project in the list.
- Run `npm list -g` to see where the global dependencies are installed. For most of the cases should be in `C:\Users\YOUR_WINDOWS_USER_NAME\AppData\Roaming\npm`, but it may vary in every machine.
- Navigate to `GLOBAL_DEPENDENCIES_FOLDER/node_modules/n8n` and run `npm link n8n-nodes-stellar` to link the project. The name passed to `npm link` should be the same as the defined in the `name` property of the project's `package.json` file.
- If you want to use `postgres` as your database, create a `.env` file in the project root copying to contents of the `.env.dist` file. `DB_TYPE` must be set to `postgresdb`. Then you must run `docker-compose up` to run the Postgres local database.
- Run `n8n start` to start the n8n server with the custom nodes.

## Using this starter

These are the basic steps for working with the starter. For detailed guidance on creating and publishing nodes, refer to the [documentation](https://docs.n8n.io/integrations/creating-nodes/).

1. [Generate a new repository](https://github.com/n8n-io/n8n-nodes-starter/generate) from this template repository.
2. Clone your new repo:
   ```
   git clone https://github.com/<your organization>/<your-repo-name>.git
   ```
3. Run `npm i` to install dependencies.
4. Open the project in your editor.
5. Browse the examples in `/nodes` and `/credentials`. Modify the examples, or replace them with your own nodes.
6. Update the `package.json` to match your details.
7. Run `npm run lint` to check for errors or `npm run lintfix` to automatically fix errors when possible.
8. Test your node locally. Refer to [Run your node locally](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/) for guidance.
9. Replace this README with documentation for your node. Use the [README_TEMPLATE](README_TEMPLATE.md) to get started.
10. Update the LICENSE file to use your details.
11. [Publish](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) your package to npm.

## More information

Refer to our [documentation on creating nodes](https://docs.n8n.io/integrations/creating-nodes/) for detailed information on building your own nodes.

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
