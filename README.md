# React/Go App

I would like to start saying that I decided to do the application in React/Go for two main reasons. The first one is that doing it in C++ would have been quite complicated in my opinion, and the second one is that, I would like to demostrate that even though I don't have experience in Go and React (This is the first time I actually put some code togheter for a proper Go application and my first time with React), I'm a quick learner. I code this application in my 2 evenings, and a bit of spare time that I got since I received the test (I was not able to spend more time on the application because I'm currently working)

## React App

The React App provides a front-end to be able to perform the CRUD operations. It allows to:
* Add a Person to the "database"
* Retrieve the people listed in the "database"
* Delete a person from the "database"
* Update a person from the "database"

The App offers some Links to be able to perform this operations, and some routing.
The App will also offer a checkbox that is able to maintain its state after the app is refreshed.

There is not alot of CSS involved. I know that presentation is important but I though (I hope I was not mistake) that due to the knowledge and time constrains, it will be better to deliver something that is functional, so my focus was on having an application that could achieve the goals of the stackeholders.

The Forms for Update/Create perform some basic validation before sending the information to the server (GoApp)

### Structure

The structure of the App is as follows:
|
|-Component
|-Routes
|App.js

The Component folder contains the data types for the checkbox, the person and a personList and their renders
The Routes folder contains all the Components for the pages to be displayed with their render methods and their handlers
The App.js only contains the Inclusion to the Routes.

I tried to maintain a separation from the data / components / main as we will do on C++ but it could be possible that this is not the best way to do things in the react world. I tried to check a few guides and they _look_ similar to what I present here.

### Notes
As I mention, this is my first time with react so you may find that there are some inconsistencies in the code. This is due to myself doing some experimentation through the code while I was coding. As an example I have

`handleUserInput = (e) => {` and ` handleSubmit(event){`. I was playing with different ways to invoke this functions.

Although I can't present automated tests for this part of the application (This is purely for the lack of time) I performed some manual test:
* Check checkbox and refresh
* Check all the checkbox and refresh
* Refresh without checkbox
* Add wrong values in the POST and PUT forms and be sure that validation was working

Lastly there are a few assumptions (known and unknown) that I could have made without knowing what is the best approach for X or Y situation, but that is because this is my first react-app and I don't know all the standars/conventions that could be applied. 

The main 2 assumptions were around the use of 2 frameworks:
- The use of https://github.com/facebook/create-react-app to create the scafolding
- The use of react-router-dom to perform Route operations

## Go App
The Go App serves as a server end-point serving data when the client hits the end-point. The endpoints created for the application are
* /app/people/all -> GET
* /app/people/{id} -> GET
* /app/people -> POST
* /app/people/all/{id} -> DELETE
* /app/people/all/{id} -> PUT
They
* Get all the people from the "database"
* Get a specific personfrom the "database"
* Post a new person to the "database"
* Delete a new person from the "database"
* Modify a person from the "database"

As you may noticed, the "database" is between quotes. This is because for this PoC I create an "in-memory" database, basically an array with mocked values, so all the operations in the "database" are operations done in the Array. So, for a production code (of with a bit more of time and/or experience) I would have implemented a proper database implementation. This would have been:
- Get All will query the database and retrieve all the elements in the database
- Get X will query the database and retrieve the element that matches with the query
    - Multiples queries could be implemented: Search all the elements with the same name, search for email (that I think should be the element to be considered along the Id as the unique_key)...etc
- Add new person to the database
- Delete person from the database
- Retrieve person from the database (using the unique_key) and update the value in the database

Because now we would be operating with a proper database, error handling would also be implemented. If a person can't be Added/Retrieved/Updated, an error code with a proper message should be sent

### Structure

The structure of the App is as follows:
|
|- Routes
|- Types
|- utilitydatabase
|main.go

The Routes folder contains the routes and the code that generates the endpoint
The types provides the type for the person
The utilitydatabase "loads the hardcoded database" on memory. This will be where I will probably add all the functions mentioned before if we were working with a database

Again, I know that this may not be the standars for go libraries (I actually found this article: https://github.com/golang-standards/project-layout) but due to my limitations I decided to present this layout knowing that improvement can be made

This part of the application contains some unittest. I know that they are basic and I had to do something that would bring me shame if I were doing that with c++/gtest and that was, make the methods that I was testing Public. Again, because is my first contact with the testing framework, I don't know if that is how it has to be or if there is a better way to do it but at least the test are functional.

I also did some manual testing with Postman to be sure that I was hitting the endpoints properly


### Prerequisites

I organized the 2 apps in 2 different folders, client for the react_app and server for the go_app.

In the server folder you need to run
`go run main.go`. That will start the server in the localhost:8000


In the client app you need to run

`npm install`

After all the dependencies are installed, run `npm run` . That will start the client in the localhost:3000

