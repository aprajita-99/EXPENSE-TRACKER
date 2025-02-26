import React, { useRef, useState } from "react";
import Input from "./Input";
import Select from "./Select";

const ExpenseForm = function ExpenseForm({ setExpenses ,Formdata ,editing , setediting ,ROW }) {
  const [Form, setForm] = Formdata;
  const [errors, setErrors] = useState({});
  const newexpense = {};
  const [rowid,setRowid] = ROW;


  const validationConfig = {
    //all the validations required for title
    title: [
      { required: true, message: "Title is required" },
      { minLength: 2, message: "Title should be at least 2 characters long!" },
    ],
    category: [{ required: true, message: "Category is required" }],
    amount: [
      { required: true, message: "Amount is required"},
      { pattern: /^\d+$/, message: "Amount should have digits only!" },
    ],
  };

  const validate = (formData) => {
    const errorsData = {};
    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rules) => {
        if(rules.required && !value){
          errorsData[key] = rules.message;
          return true;
        }
        if(rules.minLength!=undefined && value.length < rules.minLength){
          errorsData[key] = rules.message
          return true;
        }
        if(rules.pattern!=undefined && !rules.pattern.test(value)){
          errorsData[key] = rules.message
          return true;
        }
      });
    });
  setErrors(errorsData);
  return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newexpense["title"] = Form.title.charAt(0).toUpperCase() + Form.title.slice(1).toLowerCase();
    newexpense["category"] = Form.category;
    newexpense["amount"] = Form.amount;
    const validateResult = validate(newexpense);
    if (Object.keys(validateResult).length) return;
    if(editing===1) newexpense.id = rowid;
    else newexpense.id = crypto.randomUUID;

    if(editing === 1){
      setediting(0);
      setExpenses((prevstate) =>{
        return prevstate.map((item)=>{
          if(item.id === rowid){
             return newexpense;
          }
          return item;
        })});
        setediting(0);
    }
    else{setExpenses((prevstate) => [...prevstate, newexpense]);}
    setForm({ title: "", category: "", amount: "" });
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input 
        id="title"
        name="title"
        value={Form.title}
        onChange={handleChange}
        error={errors.title}
        refer = {(editing === 1) ? 1 : 0}
      />
      <Select
        name="category"
        id="category"
        value={Form.category}
        onChange={handleChange}
        options={["Grocery", "Medicine", "Bills", "Education", "Clothes"]}
        error={errors.category}
        defaultValue=""
      />
      <Input
        id="amount"
        name="amount"
        value={Form.amount}
        onChange={handleChange}
        error={errors.amount}
        refer = {0}
      />
      <button  className="add-btn">{editing === 1 ? "Save" : "Add"}</button>
    </form>
  );
};
export default ExpenseForm;
