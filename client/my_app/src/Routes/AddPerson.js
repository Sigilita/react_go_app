import React, { Component } from 'react';

// Form class. This form contains all the parameters needed for the creation of
// a person. The class also performs validation on the client side
class AddPerson extends Component {
  constructor (props) {
    super(props);
    this.state = {
        name: '',
        age: '',
        balance: '',
        address: '',
        email: '',

        // Set to true if is valid or false if invalid
        validationError: {
            name:'',
            age:'',
            balance:'',
            address:'',
            email:''
        },

        // Default values as false
        validForm : false,
        validName: false,
        validBalance: false,
        validAge: false,
        validAddress: false,
        validEmail: false
      };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }
  // Check if the field is valid according to the rules created in the switch statement
  validateField(fieldName, value) {
    // Perform validation (TODO: Play with the setState if I can so I can move the variables to the switch statement)
    let checkValidationError = this.state.validationError;
    let CheckName = this.state.validName;
    let CheckAge = this.state.validAge;
    let CheckBalance = this.state.validBalance;
    let CheckAddress = this.state.validAddress;
    let Checkemail = this.state.validEmail;
    // Basic validation is performed here (Just if they are not empty or valid, except for the email, because I wanted to
    // play a bit with a regex expression)
    switch(fieldName) {
        case 'name':
            // Create local variable            
            CheckName = value.length >0 
            // Save the value in the Validator
            checkValidationError.name = CheckName ? '' : ' error';
            break;
        case 'age':
            CheckAge = value > 0 
            checkValidationError.age = CheckAge ? '' : ' error';
            break;
        case 'balance':
            CheckBalance = value > 0 
            checkValidationError.balance = CheckBalance ? '' : ' error';
            break;
        case 'address':
            CheckAddress = value.length > 0 
            checkValidationError.address = CheckAddress ? '' : ' error';
            break;
        case 'email':
            Checkemail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            checkValidationError.email = Checkemail ? '' : ' error';
            console.log("Email check"  + Checkemail)
            break;
        default:
            break;
    }
    this.setState({ formErrors: checkValidationError,
                    validName: CheckName,
                    validBalance: CheckBalance,
                    validAge: CheckAge,
                    validAddress: CheckAddress,
                    validEmail: Checkemail
                  }, this.validateForm);
  }
  // If all the fields are valid, the form is valid
  validateForm() {
    this.setState({validForm: this.state.validName 
                        && this.state.validBalance
                        && this.state.validAge
                        && this.state.validAddress
                        && this.state.validEmail});

    /*console.log("Debug name:" + this.state.validName)
    console.log("Debug balance:" + this.state.validBalance)
    console.log("Debug age:" + this.state.validAge)
    console.log("Debug address:" + this.state.validAddress)
    console.log("Debug email:" + this.state.validEmail)
    console.log("Debug valid form:" + this.state.validForm)*/

  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-an-error');
  }

  // Handle the data that is being submitted when we create a new person
  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    var data_object = {};

    data.forEach((value, key) => {
      data_object[key] = value
    });

    var json_data = JSON.stringify(data_object);
    
    fetch('http://localhost:8000/app/people',{
      method: 'POST',
      body: json_data
    });

    event.target.elements.name.value="";
    event.target.elements.age.value="";
    event.target.elements.balance.value="";
    event.target.elements.address.value="";
    event.target.elements.email.value="";
  }

  render () {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2>Create a new person</h2>
        <div className={`form-group ${this.errorClass(this.state.validationError.name)}`}>
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.validationError.age)}`}>
          <label htmlFor="age">Age</label>
          <input type="text" className="form-control" name="age"
            placeholder="Age"
            value={this.state.age}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.validationError.balance)}`}>
          <label htmlFor="balance">Balance</label>
          <input type="text" className="form-control" name="balance"
            placeholder="Balance"
            value={this.state.balance}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.validationError.address)}`}>
          <label htmlFor="address">Name</label>
          <input type="text" className="form-control" name="address"
            placeholder="Address"
            value={this.state.address}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.validationError.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.state.validForm}>Create!</button>
      </form>
    )
  }
}

export default AddPerson;