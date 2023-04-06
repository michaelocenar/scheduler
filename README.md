# Interview Scheduler

Interview Scheduler is a single-page React application that allows users to book and cancel interviews. This app combines a concise API with a WebSocket server to build a realtime experience. The app is tested using Jest and deployed using Webpack Development Server and Storybook Visual Testbed.

# Running tests


## Features

- Book an interview
- Edit an existing interview
- Cancel an interview
- Navigate through days to see available spots
- Real-time updates with WebSocket
- Responsive design
- Error handling

## Technologies Used

- React
- Axios
- WebSockets
- Jest
- Cypress
- Storybook
- Node.js
- Express
- PostgreSQL

## Setup

1. Fork and clone this repository.
2. Install dependencies with npm install.

# Setting up the API server

To set up the API server locally, follow the instructions in the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) repository.

## Running the Application

# Running Tests

## Unit and Integration Tests
To run unit and integration tests with Jest, use the following command:
```npm test```

## End-to-End Tests
To run end-to-end tests with Cypress, use the following command:
```npm run cypress```

## Storybook Visual Testbed
To run Storybook Visual Testbed, use the following command:
```npm run storybook```


To run the Interview Scheduler locally:

1. Start the Webpack Development Server with `npm start`.
2. The app will be served at `http://localhost:8000/`

## Final Product

!["Screenshot appointment clicked"](https://github.com/michaelocenar/scheduler/blob/master/docs/scheduler-appointment-clicked.png?raw=true)
!["cancel edit"](https://github.com/michaelocenar/scheduler/blob/master/docs/scheduler-main-page.png?raw=true)
