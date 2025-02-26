import { useState } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import ExpenseData from './ExpenseData'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {

  const [Expenses , setExpenses] = useLocalStorage('ExpensesData',ExpenseData);
  const [Form, setForm] = useLocalStorage('FormData',{ title: "", category: "", amount: "" });
  const [editing , setediting] = useLocalStorage('editing',0);
  const [rowid,setRowid] = useLocalStorage('rowid',"");
  // const [localStorage , setLocalStorage] = useLocalStorage('ExpensesData',Expenses);


  return (
    <>
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm  setExpenses = {setExpenses} Formdata = {[Form,setForm]} editing = {editing} setediting = {setediting} ROW = {[rowid,setRowid]}/>
        <ExpenseTable Expenses = {Expenses} setExpenses = {setExpenses} Formdata = {[Form,setForm]}  editing = {editing} setediting = {setediting} ROW = {[rowid,setRowid]} />
      </div>
    </main>
    </>
  )
}

export default App
