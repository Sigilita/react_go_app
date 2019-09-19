package routes

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"sort"
	"strconv"
	"time"

	"github.com/Sigilita/GoTest/types"
	"github.com/Sigilita/GoTest/utilitydatabase"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

var people []types.Person

// On start up, load the database in memory. For the first version we are using a mock database
func init() {
	people = utilitydatabase.LoadDatabase()
}

// HandleRequests will handle all the request of the server
func HandleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.Host("app/")
	//Create the handlers for the endpoint

	//GET
	myRouter.HandleFunc("/app/people/all", ReturnAllpeople).Methods("GET")
	myRouter.HandleFunc("/app/people/sort", ReturnSortByEmail).Methods("GET")
	myRouter.HandleFunc("/app/people/{id}", ReturnPerson).Methods("GET")

	//POST
	myRouter.HandleFunc("/app/people", CreateNewPerson).Methods("POST")
	//DELETE
	myRouter.HandleFunc("/app/people/{id}", DeletePerson).Methods("DELETE")
	//UPDATE
	myRouter.HandleFunc("/app/people/{id}", UpdatePerson).Methods("PUT")
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "DELETE", "PUT"},
		AllowedHeaders: []string{"Bearer", "Content_Type"}})

	handler := c.Handler(myRouter)

	srv := &http.Server{
		Handler:      handler,
		Addr:         ":8000", //My localhost
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

// ReturnPerson public for testing purposes
func ReturnPerson(responseWriter http.ResponseWriter, httpRequest *http.Request) {
	//Call to enableCors
	fmt.Println("Return Person")
	enableCors(&responseWriter)
	// Get the query id
	vars := mux.Vars(httpRequest)
	key := vars["id"]

	for _, person := range people {
		if person.ID == key {
			// Return the person that matches with the ID
			//json.NewEncoder(responseWriter).Encode(person)
			respondWithJSON(responseWriter, http.StatusOK, person)
		}
	}
}

//CreateNewPerson public for testing purposes
func CreateNewPerson(responseWriter http.ResponseWriter, httpRequest *http.Request) {
	//Call to enableCors
	fmt.Println("Create Person")
	enableCors(&responseWriter)
	// There is validation on the server side for the test application. Validation on
	// the client side should be needed also in a production code. Due to time constrains
	// I'm not able to add a better validation here

	requestBody, errorMessage := ioutil.ReadAll(httpRequest.Body)
	if errorMessage != nil {
		fmt.Fprintf(responseWriter, "Error in the request")
		return
	}
	var person types.Person
	err := json.Unmarshal(requestBody, &person)
	if err != nil {
		fmt.Println(err)
	} else {
		// Add the person to the database. Again, this should be a call to the database class
		// but because for this PoC the database is in memory, we append the value to the array
		var index = len(people)
		person.ID = strconv.Itoa(index + 1)
		people = append(people, person)
		respondWithJSON(responseWriter, http.StatusOK, person)
	}
}

// DeletePerson public for testing purposes
func DeletePerson(responseWriter http.ResponseWriter, httpRequest *http.Request) {
	//Call to enableCors
	fmt.Println("Delete Person")
	enableCors(&responseWriter)

	// Get the query id
	vars := mux.Vars(httpRequest)
	id := vars["id"]

	for index, person := range people {
		if person.ID == id {
			// Delete the person from the database. Mocked to be removed from the array
			people = append(people[:index], people[index+1:]...)
			respondWithJSON(responseWriter, http.StatusOK, "")
		}
	}
}

// ReturnAllpeople is public for testing purposes
func ReturnSortByEmail(responseWriter http.ResponseWriter, httpRequest *http.Request) {
	//Call to enableCors
	fmt.Println("Return by Email")
	enableCors(&responseWriter)

	// There are 2 sort methods defined in the person_type file.
	sort.Sort(types.ByEmail(people))
	// Return the values recovered from the database.
	//json.NewEncoder(responseWriter).Encode(people)
	respondWithJSON(responseWriter, http.StatusOK, people)
}

func ReturnAllpeople(responseWriter http.ResponseWriter, httpRequest *http.Request) {
	//Call to enableCors
	fmt.Println("Return all")
	enableCors(&responseWriter)

	// There are 2 sort methods defined in the person_type file.
	sort.Sort(types.ByName(people))
	// Return the values recovered from the database.
	//json.NewEncoder(responseWriter).Encode(people)
	respondWithJSON(responseWriter, http.StatusOK, people)
}

// UpdatePerson public for testing purposes
func UpdatePerson(responseWriter http.ResponseWriter, httpRequest *http.Request) {
	//Call to enableCors
	fmt.Println("Update Person")
	enableCors(&responseWriter)

	requestBody, errorMessage := ioutil.ReadAll(httpRequest.Body)
	if errorMessage != nil {
		fmt.Fprintf(responseWriter, "Error in the update request")
		return
	}
	var personToUpdate types.Person
	err := json.Unmarshal(requestBody, &personToUpdate)

	if err != nil {
		fmt.Println(err)
	} else {
		// Check the person on the database and retrieve its values. Then modify
		// the values of the record and submit to the database.
		// Again, due to the database been an array the only operation performed
		// is a change in the array
		for index, person := range people {
			if person.ID == personToUpdate.ID {
				fmt.Println("Updating")
				people[index].Name = personToUpdate.Name
				people[index].Age = personToUpdate.Age
				people[index].Balance = personToUpdate.Balance
				people[index].Email = personToUpdate.Email
				people[index].Address = personToUpdate.Address
			}
		}
		respondWithJSON(responseWriter, http.StatusOK, personToUpdate)
	}

}

// Enabling Cors to be able to test this in my local machine
func enableCors(responseWriter *http.ResponseWriter) {
	(*responseWriter).Header().Set("Access-Control-Allow-Origin", "*")
}

// Aux function to send a response. I found this better than my first approach
// of using json.NewEncoder(responseWriter).Encode(people) because this could
// be expanded to also send responses with error codes.
func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	//encode payload to json
	response, _ := json.Marshal(payload)

	// set headers and write response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}
