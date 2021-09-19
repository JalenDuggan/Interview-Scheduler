# Interview Scheduler

## Project
The development focuses on a single page application (SPA) called Interview Scheduler, built using React. The data that the user submits is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format. Lastly, during development Jest test where use throughout the project.

## Tech Specs
* React
* Axios
* Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.
```sh
User is able to have multiply appointments depending on the day. With the ability to create an appointment.
```
|![Setting Appoinment](https://raw.githubusercontent.com/JalenDuggan/scheduler/master/docs/SettingAppoinment.gif)|
|:--:| 
| *User is able to have multiply appointments depending on the day. With the ability to create an appointment.* |

|![Delete Appointment](https://raw.githubusercontent.com/JalenDuggan/scheduler/master/docs/deleteAppointment.gif)|
|:--:| 
| *User is able to edit and delete appointments created with the amount of spots available updating.* |

|![Error Handling](https://raw.githubusercontent.com/JalenDuggan/scheduler/master/docs/ErrorHandling.gif)|
|:--:| 
| *When an error ocurrs the user is shown an error component which brings them back to the previous view.* |

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
