#### Link to frontend documentation https://github.com/labseu2-niyon/frontend/blob/master/README.md

# Niyon

You can find the deployed project at https://niyonapp.com/

## Contributors

Check our about page at https://niyonapp.com/about

## Project Overview

[Trello Board] https://trello.com/b/fvJgJWWA/niyon

[Product Canvas] https://www.notion.so/Niyon-c215b4850eaf4cc39162e9c455993155

[UX Design files] https://whimsical.com/51S63ddNuAZB5d7azZ9L9d

Find a mentor.
Niyon is a platform for connecting young professionals with mentors in West Africa.
We connect you with mentors who are located in the same city, town or local government area you are in.

### Key Features

- Create your account or login with your social account
- Connect with mentors and mentees
- Chat with them

## Tech Stack

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm start** to start the local server
- **npm run start:dev** to start the local server with nodemon
- **npm test** to start server using testing environment
- **npm run test:watch** to start server using testing environment in watch mode
- **npm run lint** to lint files using eslint

# Back-end

We use Node.js and it's Express framework to build the server and APIs. For the chat app, we use Socket.IO.

- [**Node.js**](https://nodejs.org/en/) is a JavaScript runtime build on Chrome's V8 engine. Being an interface to the V8 JavaScript runtime, it enables super fast JavaScript interpreter that runs in the Chrome browser. Its non-blocking I/O model is ideal for real-time applications, like chats, even tho it is single threaded. Event loop takes care of all the asynchronous I/O operations without blocking synchronous tasks. That means actions like reading or writing to the database, or network requests can be performed very quickly and not block the process.

- [**Express.js**](https://expressjs.com/) is a flexible Node.js framework that provides robust set of features for web and mobile applications. The pleathora of HTTP utility methods and middleware available allows us to quickly create robust API.

- [**Socket.IO**](https://socket.io/docs/) is a library, that enables real-time bidirectional communication between the server and the browser. This means that the server can push messages to clients. Whenever you write a chat message, the idea is that the server will get it and push it to all other connected clients. The benefits of using Socket.IO instead of vanilla WebSockets are:
  - It supports fallback options
  - It supports broadcasting
  - Connection can be established in presence of proxies and load balancers

## Database

### **PostgreSQL**

PostgreSQL is one of the largest open-source RBMS that comes with many features aimed to help developers build applications, administrators to protect data integrity and build fault-tolerant environments, and help you manage your data no matter how big or small the database is.

We started with comparing SQL vs NoSQL. Our first tech choices were PostgreSQL and MongoDB. We choose PostgreSQL for our project because our application would contain and operate with a lot of relationships, therefore, using a relational database system with a large community that protects data integrity and tolerant environment.

### **Sequelize**

Sequelize is perhaps the most popular and used promised base Javascript SQL ORM that is compatible with PostgreSQL and helps us handle relationships and their query.

Having both our client and server code with the same language is helpful to our team's communication and integration.

We also considered which language all of our team was comfortable to work with, and that's why we settled on Node + Express.

Sequelize is an ORM which can help us handle associations and their queries, and knex is only a query builder. This will make it the setup easier with sequelize.

## APIs query type

### **Rest API**

REST API is a simple and popular architecture type both for client and server-side that helps us perform all CRUD operations. Since REST was covered in the curriculum and also effectively solves our problem in the early circle we would be starting with it.

## Testing

### **Jest Framework**

Jest is a testing framework that focuses on simplicity. It was covered in the curriculum, have awesome documentation and practically covers every aspect of testing; from unit-test to snap-shot test, etc.

Jest have both units test, snap-shot test and react test. It's also simple and simply delightful.

## **Continous Integration**

Using continuous integration for our test helps us deploy our application dynamically, supports our development process by automatically building and testing code changes, providing immediate feedback on the success of the change.

### **Circle CI**

Circle CI is a fast automated triggered continuous integration service.

Circle CI has a hub and automate all process of automated integration, from base to end. Automatically deploy to heroku, etc.

## Hosting & Environments

### **AWS - Production**

AWS is one of the 3 main (and the most used), by using AWS in production as opposed to a platform (such as Heroku) it allows us to have full control of the deployment. It also reduces costs as we are using the underlying platform instead of paying for an additional platform on top of AWS.

# Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

```
DEV_DATABASE_URL=
DATABASE_URL_TEST=
DATABASE_URL=
NODE_ENV=

FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_CALLBACK =

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK =

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK=

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
PLACE_API_KEY=

JWT_SECRET=
FRONT_END_URL=
FRONTEND_BASE_URL=
PORT=
```

## Endpoints

Overview of endpoints
https://documenter.getpostman.com/view/7809999/SVfWKQPW?version=latest

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

