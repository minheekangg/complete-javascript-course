import React from 'react'

class Income extends React.Component{

    render(){
        return (
            <div class="item clearfix" id="income-0">
                <div class="item__description">{this.props.description}</div>
                <div class="right clearfix">
                    <div class="item__value">+ {this.props.value}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Income;