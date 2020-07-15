import React from 'react'

class Expenses extends React.Component{

    render(){
        return (<div class="item clearfix" id="expense-0">
            <div class="item__description">{this.props.desc}</div>
            <div class="right clearfix">
                <div class="item__value">- {this.props.value}</div>
                <div class="item__percentage">21%</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>)
    }
}

export default Expenses;