import React, { Component } from 'react';

class UpdatePerson extends Component {
  constructor (props) {
    super(props);
    this.state = {
        id: '',
        name: '',
        age: '',
        balance: '',
        address: '',
        email: '',

        validationError: {
            id:'',
            name:'',
            age:'',
            balance:'',
            address:'',
            email:''
        },

        validForm : false,
        validId: false,
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

  validateField(fieldName, value) {
    let checkValidationError = this.state.validationError;
    let CheckName = this.state.validName;
    let CheckAge = this.state.validAge;
    let CheckBalance = this.state.validBalance;
    let CheckAddress = this.state.validAddress;
    let Checkemail = this.state.validEmail;
    let CheckId = this.state.validId

    switch(fieldName) {
        case 'id':
            CheckId = value.length >0 
            checkValidationError.name = CheckId ? '' : ' error';
            break
        case 'name':           
            CheckName = value.length >0 
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
                    validId: CheckId,
                    validName: CheckName,
                    validBalance: CheckBalance,
                    validAge: CheckAge,
                    validAddress: CheckAddress,
                    validEmail: Checkemail
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({validForm: this.state.validId
                        && this.state.validName 
                        && this.state.validBalance
                        && this.state.validAge
                        && this.state.validAddress
                        && this.state.validEmail});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-an-error');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    var data_object = {};
    var index;
    data.forEach((value, key) => {
        if (key ==="id") {
            index = value
        }
      data_object[key] = value
    });

    var json_data = JSON.stringify(data_object);
    console.log(json_data)
    fetch('http://localhost:8000/app/people/'+index,{
      method: 'PUT',
      body: json_data
    });

    // Clean the form. I know that there is a better way but I was not able to make it work
    e.target.elements.id.value="";
    e.target.elements.name.value="";
    e.target.elements.age.value="";
    e.target.elements.balance.value="";
    e.target.elements.address.value="";
    e.target.elements.email.value="";
  }

  render () {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2>Update Person</h2>
        <div className={`form-group ${this.errorClass(this.state.validationError.id)}`}>
          <label htmlFor="id">Id</label>
          <input type="text" className="form-control" name="id"
            placeholder="id"
            value={this.state.id}
            onChange={this.handleUserInput}  />
        </div>
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
        <button type="submit" className="btn btn-primary" disabled={!this.state.validForm}>Update</button>
      </form>
    )
  }
}

export default UpdatePerson;