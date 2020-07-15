import React from 'react'
import Expense from './Expense';

class ExpensesList extends React.Component{
    

    displayExpenses = ()=>{
        return this.props.expenses.map((e, idx) => {
            return <Expense description={e.desc} key={idx} value={e.value} />
        })
    }

    render(){
        return(<div>I am Expenses
            <div className="expenses">
                <h2 className="expenses__title">Expenses</h2>

                <div className="expenses__list">
                    {this.displayExpenses()}
                </div>
            </div>
        </div>)
    }
}

export default ExpensesList;