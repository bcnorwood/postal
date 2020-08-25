# Postal
Postal is a barebones email message (**.msg** file) viewer built with React and Express. It runs inside a self-contained Docker application built using the standard **nginx** and **node** images from DockerHub, leveraging Parcel and Babel to bundle and transpile the ES6 and Sass code into browser- and node-friendly packages.

## Dependencies
You'll need [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) as well as [Docker](https://www.docker.com/) in order to build and deploy Postal.

Environment-targeted versions of the remaining dependencies (NPM modules and DockerHub images) will be installed automatically.

## Getting Started
Check out the repo from GitHub to your preferred directory:

`git checkout git@github.com:bcnorwood/postal.git`

Install the NPM dependencies, build the JavaScript bundles, and start the Docker application:

|npm|yarn|
|---|---|
|`npm install`|`yarn`|
|`npm run build`|`yarn build`|
|`npm start`|`yarn start`|

Postal should be accessible at http://localhost:22592.

To stop the application, run `npm stop` or `yarn stop`.

## Usage and Features
The messages already stored will be visible in Postal's simple, responsive interface. Simply click on one to view it (don't worry - the HTML is sanitized). While viewing a message, you can click **Export** to download the original **.msg** file, or **Delete** to erase it forever.

To import more, click on the **Import** button in the top-right corner of the screen (while not viewing a message) and select one or more **.msg** files to upload. The message list will update to reflect the new messages.

Your history will be tracked through React Router while you use Postal, so you can hit the back and forward buttons to assist in browsing.

## Testing
Postal sports a unit testing suite powered by Jest. These tests are located in the `test` folder at the root of the project and can be executed by running `npm test` or `yarn test`.

As with most real-world projects, test coverage is not where I'd like it to be. Currently, back-end routes and the data store are tested. Front-end testing will likely require significant refactoring.
