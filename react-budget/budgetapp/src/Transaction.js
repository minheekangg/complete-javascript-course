import React from 'react';

class Transaction extends React.Component{
    state = {
        transDesc: '',
        transType: 'inc',
        transValue: 0

    }

    handleChange = event => {

        if (event.target.className === "add__type") {
          this.setState({ transType: event.target.value });
        } else if (event.target.className === "add__description") {
          this.setState({ transDesc: event.target.value });
        } else if (event.target.className === "add__value") {
          this.setState({
            transValue: parseFloat(event.target.value, 10)
          });
        }
        console.log('%c NEW STATE', 'color: purple', this.state)
    }

    handleSubmit = ()=>{
        console.log(this.state)
        this.props.handleSubmit(this.state)
    }

render(){
    return (
        <div className="add">
            <div className="add__container">
                <select onChange={this.handleChange} className="add__type">
                    <option value="inc">+</option>
                    <option value="exp">-</option>
                </select>
                <input onChange={this.handleChange} type="text" className="add__description" placeholder="Add description" />
                <input onChange={this.handleChange}type="number" className="add__value" placeholder="Value" />
                <button onClick={this.handleSubmit}className="add__btn"><i className="ion-ios-checkmark-outline"></i></button>
            </div>
        </div>
    )
}
}

export default Transaction;