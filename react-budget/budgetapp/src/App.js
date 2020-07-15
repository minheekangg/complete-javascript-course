import React, { Component } from 'react';
// import back.png from './back.png';
import './App.css';
import IncomeList from './IncomeList.js'
import ExpensesList from './ExpensesList.js'
import Transaction from './Transaction.js'

class App extends Component {
  state = {
    totalIncome: 0,
    totalExpenses: 0, 
    incomes: [],
    expenses: []
  }

  calculateTotal = () =>{
    let totalBudget = parseFloat(this.state.totalIncome - this.state.totalExpenses).toFixed(2);
    return totalBudget > 0 ? "+" + totalBudget : "-" + totalBudget
  }

  handleSubmit = ({transDesc, transType, transValue}) => {
    if (transType === 'inc') {
      this.setState({totalIncome: (this.state.totalIncome + transValue), incomes: [...this.state.incomes, {desc: transDesc, value: transValue}]}, ()=>{
        console.log('STATE UPDATED TO', this.state)
      })
    } else if (transType === 'exp'){
      this.setState({ totalExpenses: (this.state.totalExpenses - transValue), expenses: [...this.state.expenses, { desc: transDesc, value: transValue }] }, () => {
        console.log('STATE UPDATED TO', this.state)
      })
    }
  }



  render() {
    return (
      <div className="App">
        <div className="top">
            <div className="budget">
                <div className="budget__title">
                    Available Budget in <span className="budget__title--month">%Month%</span>:
                </div>
                
                <div className="budget__value">{this.calculateTotal()}</div>
                
                <div className="budget__income clearfix">
                    <div className="budget__income--text">Income</div>
                    <div className="right">
                        <div className="budget__income--value">+ ${this.state.totalIncome}</div>
                        <div className="budget__income--percentage">&nbsp;</div>
                    </div>
                </div>
                
                <div className="budget__expenses clearfix">
                    <div className="budget__expenses--text">Expenses</div>
                    <div className="right clearfix">
                        <div className="budget__expenses--value">- ${this.state.totalExpenses}</div>
                        <div className="budget__expenses--percentage">45%</div>
                    </div>
                </div>
            </div>
        </div>
        
        
        
        <div className="bottom">
            <Transaction handleSubmit={this.handleSubmit}/>
            
            <div className="container clearfix">
                <IncomeList incomes={this.state.incomes}/>
                <ExpensesList expenses={this.state.expenses}/>
            </div>
            
            
        </div>
      </div>
    );
  }
}

export default App;
