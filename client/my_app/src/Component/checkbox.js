import React, { Component } from 'react';

// Checkbox component. This component will store the value
// in the localStorage and it will retrieve the value on construction.
// If the value is set and the app is refreshed, the value will still 
// be set.

class Checkbox extends Component {
    constructor (props) {
        super(props);
        let _isChecked = "false";
        // Get the state of the checkbox
        _isChecked = localStorage.getItem("checkbox" + this.props.id);
        this.state = {
            isChecked: (_isChecked ==="false"),
        }
    }

  // Function to handle the events when the checkbox changes
  handleCheckboxChange = event =>
  {
    // Remember the state of the checkbox
    this.setState({ isChecked: event.target.checked })
    localStorage.setItem("checkbox" + this.props.id, this.state.isChecked);
  }

  // Render component
  render() {
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox"
            checked={this.state.isChecked}
            onChange={this.handleCheckboxChange}
          />
        </label>
      </div>
    );
  }
}

export default Checkbox;