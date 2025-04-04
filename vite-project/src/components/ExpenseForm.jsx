import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components
const FormContainer = styled.form`
  animation: ${fadeIn} 0.5s ease-out;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  max-width: 500px;
  margin: 2rem auto;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
`;

const FormTitle = styled.h2`
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(to right, #667eea, #764ba2);
    margin: 0.5rem auto 0;
    border-radius: 2px;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(to right, #667eea, #764ba2);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #e2e8f0;
    cursor: not-allowed;
    transform: none;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const ExpenseForm = function ExpenseForm({ setExpenses, Formdata, editing, setediting, ROW }) {
  const [Form, setForm] = Formdata;
  const [errors, setErrors] = useState({});
  const newexpense = {};
  const [rowid, setRowid] = ROW;

  const validationConfig = {
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
        if (rules.required && !value) {
          errorsData[key] = rules.message;
          return true;
        }
        if (rules.minLength !== undefined && value.length < rules.minLength) {
          errorsData[key] = rules.message;
          return true;
        }
        if (rules.pattern !== undefined && !rules.pattern.test(value)) {
          errorsData[key] = rules.message;
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
    
    if (editing === 1) newexpense.id = rowid;
    else newexpense.id = crypto.randomUUID();

    if (editing === 1) {
      setediting(0);
      setExpenses((prevstate) => {
        return prevstate.map((item) => {
          if (item.id === rowid) {
            return newexpense;
          }
          return item;
        });
      });
    } else {
      setExpenses((prevstate) => [...prevstate, newexpense]);
    }
    setForm({ title: "", category: "", amount: "" });
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>{editing === 1 ? "Edit Expense" : "Add New Expense"}</FormTitle>
      
      <FormGroup>
        <Input
          id="title"
          name="title"
          label="Expense Title"
          value={Form.title}
          onChange={handleChange}
          error={errors.title}
          refer={editing === 1 ? 1 : 0}
          placeholder="e.g., Grocery shopping"
        />
      </FormGroup>
      
      <FormGroup>
        <Select
          name="category"
          id="category"
          label="Category"
          value={Form.category}
          onChange={handleChange}
          options={["", "Grocery", "Medicine", "Bills", "Education", "Clothes"]}
          error={errors.category}
        />
      </FormGroup>
      
      <FormGroup>
        <Input
          id="amount"
          name="amount"
          label="Amount ($)"
          value={Form.amount}
          onChange={handleChange}
          error={errors.amount}
          refer={0}
          placeholder="e.g., 125"
          type="number"
        />
      </FormGroup>
      
      <SubmitButton type="submit">
        {editing === 1 ? "Save Changes" : "Add Expense"}
      </SubmitButton>
    </FormContainer>
  );
};

export default ExpenseForm;
