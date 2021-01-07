# Shortster

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This challenge is for MovingWorlds: looking forward to launching an URL shortening service, so that users may have custom URLs to their profiles.

Title: Shortster
For: MovingWorlds
Developer: Hamada

## Technologies

Project is created with:

- Backend (RestFull Api NodeJS-Express, Db[Mongoose] Doc[Swagger], Validator[Express-Validator], Test[Jest/Supertest]).
- DataBase (NoSQL dev MongoDB-Atlas // prod Docker(I did not have time to docker the challenge)).
- Frontend (Angular 10, Angular Material, API-PreviewLink[https://my.linkpreview.net/]).

## Setup

The repo has two branches, features for dev mode and master, commits of challenge are in the dev branch (dev_features).
To run this challenge, you need to clone the repository [Github](https://github.com/hamada-j/Shortster).

_Italic It is necessary to Navigate to the correct folder for run the command in the CLI_

> Start

1. Navigate to the folder of the 'Backend'

   - `$ cd Shortester` Navigate to the correct
   - `$ npm i` To install the dependency's with NPM.
   - `$ npm start` To start the server running (http://localhost:3000).

![alt text](https://github.com/hamada-j/Shortster/blob/master/img/run-api.png).

_Italic Now the server It is running correct_

> Test

2. Navigate to the folder of the 'Backend'

   - `$ cd Shortster` Navigate to the correct.
   - `$ npm run test` To start the server test.

![alt text](https://github.com/hamada-j/Shortster/blob/master/img/test.png).

_Italic Now that the server pass the test correctly_

> Documentation

3. Take looking of the documentation generated by SwaggerUI to interact with the Api.

   - `$ npm start` With the server running (http://localhost:3000).
   - In your Browser (http://localhost:3000/api-docs/#/).
   - We can use the endpoint flowing the instruction o checking the error.

![alt text](https://github.com/hamada-j/Shortster/blob/master/img/docs.png).

_Italic Be shore the server It is running correctly_

> Frontend

4. Navigate to the folder of the 'Frontend'

   - `$ cd Shortster` Navigate to the correct
   - `$ npm i` To install the dependency's with NPM.
   - `$ npm start` With the server running (http://localhost:3000).
   - `$ ng serve -o` To start app running (http://localhost:4200/home).

![alt text](https://github.com/hamada-j/Shortster/blob/master/img/run-app.png).

_Italic Be shore the server It is running correctly_

- First component it is Home where we can introduce a correct formate URL and it generate for us a doc. Or custom one by input a URL a Short ID with 4 or more characters.

![alt text](https://github.com/hamada-j/Shortster/blob/master/img/front.png).
_Italic input a url_
![alt text](https://github.com/hamada-j/Shortster/blob/master/img/custom.png).
_Italic input a url and short id_

- Second component it is Short-detail where we can see a preview of the URL and all information from our Api and API-PreviewLink.

![alt text](https://github.com/hamada-j/Shortster/blob/master/img/detail.png).
