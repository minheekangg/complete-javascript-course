import React from 'react';
import Income from './Income'

class IncomeList extends React.Component{


    displayIncomes = ()=>{
        return this.props.incomes.map((e, idx)=>{
            return <Income description={e.desc} key={idx} value={e.value} />
        })
    }
    render(){
        return (
            <div>I am Income
                <div className="income">
                    <h2 className="icome__title">Income</h2>

                    <div className="income__list">
                    {this.displayIncomes()}
                    </div>
                </div>
            </div>
        )
    }

}

export default IncomeList;