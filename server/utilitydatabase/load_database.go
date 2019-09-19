package utilitydatabase

import "github.com/Sigilita/GoTest/types"

//import "strconv"

// LoadDatabase is a function to be called from main that will simulate the database query
func LoadDatabase() []types.Person {
	//Create the array of people and add each person from the "database"
	people := []types.Person{}

	// Harcoded testing values. In a real implementation this should query the datadabase.
	// For a production environment things as locks, accessing the datase while another application is accesing...etc should be considered
	person := types.Person{ID: "1", Name: "John", Age: "35", Balance: "10.1", Email: "john.doe@gmail.com", Address: "JonhLand"}
	people = append(people, person)

	person = types.Person{ID: "2", Name: "Jane", Age: "30", Balance: "10.2", Email: "jane@doe.com", Address: "JaneLand"}
	people = append(people, person)

	person = types.Person{ID: "3", Name: "Jule", Age: "34", Balance: "10.3", Email: "jule.doe@gmail.com", Address: "JuleLand"}
	people = append(people, person)

	return people

}
