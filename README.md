# ETH SERVICE

## RUNNING THE APPLICATION

This project was created with NestJS, web3.js, MongoDB for data persistence and Ganache for a local node.

To run it locally:

1. Install Docker on your local machine if you haven't already. You can download the installer for your operating system from the Docker website.
2. Clone your NestJS project from your Git repository to your local machine.
3. Create a new file in the root directory of your project called `.env`, this file will contain all env variables. For the sake of this project, you can use the exact same variables in `sample.env`.
4. In the root directory of your project there is a file called `docker-compose.yml`. This file will define the services that Docker will run:
    * `mongo`: A MongoDB container that will run on port 27017 and persist data to the database volume.
    * `mongo_express`: A mongo express container to act as an admin panel for your mongo db database.
    * `mongo_test`: A MongoDB container that will run on port 27019 for running e2e tests.
    * `node`: A Ganache container that will run on port 8545 with some default settings.
    * `api`: Your NestJS application container that will be built from the Dockerfile in the root directory of your project. This container depends on the MongoDB and Ganache containers, and will run on port 8000.
    The environment variables `MONGODB_URI` and `WEB3_PROVIDER_URL` are set to point to the MongoDB and Ganache containers respectively.
5. Open a terminal in the root directory of your project and run the command `docker-compose up -d`. Docker will start up the MongoDB, Ganache, and NestJS containers.
6. To view application logs, run `docker logs api`.
7. Your NestJS application will be available at <http://localhost:8000>.

That's it! You now have the project running locally.

## TESTING THE APPLICATION

Make sure the `mongo_test` service is running in Docker Compose before testing.

Two accounts are automatically created for you on project bootstrap and funded with 2 ETH each.

The Postman documentation for the API can be found at <https://documenter.getpostman.com/view/21328169/2s93RUtXNK>.

To run tests, open a terminal in the root directory of your project and run the command `npm run test` for unit and integration tests and `npm run test:e2e` for end-to-end tests.

## COVERAGE REPORT

To generate a coverage report, run the command `npm run test:cov`. The `npm run test:cov` script runs Jest and generates a coverage report in the `coverage` folder. Run the command `cd coverage/lcov-report` and open `index.html` in your browser to view the report.

## CLEANUP

Finally, don't forget to run `docker-compose down` to stop all containers.
