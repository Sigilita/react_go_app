package types

//Person type to be exported
type Person struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Age     string `json:"age"`
	Balance string `json:"balance"`
	Email   string `json:"email"`
	Address string `json:"address"`
}

// Persons global variable. This will add as a "Database in memory" for the moment
// (TODO: Use DB or filesystem for permanency if time allows it)
type Persons []Person

// ByName exports values sorted by name
type ByName []Person

// ByEmail exports values sorted by email
type ByEmail []Person

// Sort methods:

// *******By Name*******
func (item ByName) Len() int {
	return len(item)
}

func (item ByName) Less(i, j int) bool {
	return item[i].Name < item[j].Name
}

func (item ByName) Swap(i, j int) {
	item[i], item[j] = item[j], item[i]
}

// *******By Email*******
func (item ByEmail) Len() int {
	return len(item)
}

func (item ByEmail) Less(i, j int) bool {
	return item[i].Email < item[j].Email
}

func (item ByEmail) Swap(i, j int) {
	item[i], item[j] = item[j], item[i]
}
