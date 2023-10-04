# async-race

## [Task description](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/async-race.md#cross-check) 
Create a SPA that will manage the collection of cars, control their engines and show race statistics.


## [Deploy](https://maxxx1mhr.github.io/async-race/async-race/)
(Note: to be able to watch working version ones need to start up a local server with cars data. The code and instructions can be found [here](https://github.com/mikhama/async-race-api).)


<img  src="https://github.com/Maxxx1mHR/async-race/assets/44443884/6a9c6c23-d79c-4288-8364-458fc0f36344" alt="deploy screenshot garage-view">
<img  src="https://github.com/Maxxx1mHR/async-race/assets/44443884/55fd3bc0-5d23-42f4-8cde-edeb555f4f21" alt="deploy screenshot winners-view">


https://github.com/Maxxx1mHR/async-race/assets/44443884/2266df2e-2348-497b-bcef-a53a541f89d1




## Key skills:
* Сommunication with a server (fetch, REST API)
* Async coding / Promises
* JS Animations
* DOM Api

## Tech stack
* TypeScript
* HTML
* SASS
* Webpack

## Features
* Cars generation & updating with a name and a color, also a random generation of 100 cars to start the app quickly from scratch
* Starting/stopping & position reset for all the cars on the current page (implemented via fetch requests)
* Starting/stopping a particular car
* Car stops if an HTTP 500 status code is returned
* Winner detection
* Pagination
* Winners page gets updated via an HTTP query
