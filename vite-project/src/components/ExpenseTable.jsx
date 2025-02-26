import React, { useEffect, useRef, useState } from "react";
import { useFilter } from "../hooks/useFilter";
import ContextMenu from "./ContextMenu";

export default function ExpenseTable({
  Expenses,
  setExpenses,
  Formdata,
  editing,
  setediting,
  ROW,
}) {
  const [Form, setForm] = Formdata;
  const [fExpenses, setQuery] = useFilter(Expenses, (data) => data.category);
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);
  const [rowid, setRowid] = ROW;
  const [sortCallback , setsortCallback] = useState(()=>{return ()=>{}});

  return (
    <>
      <ContextMenu
        X={X}
        Y={Y}
        setX={setX}
        setY={setY}
        setExpenses={setExpenses}
        Expenses={Expenses}
        rowid={rowid}
        setForm={setForm}
        editing={editing}
        setediting={setediting}
      />
      <table
        className="expense-table"
        onClick={(e) => {
          setX(0);
          setY(0);
        }}
      >
        <thead>
          <tr>
          <th className="amount-column">
              <div>
                <span>Title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick=
                  {(e) => {
                    setsortCallback(()=>(a,b)=>a.title.localeCompare(b.title));}}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={(e) => {
                    setsortCallback(()=>(a,b)=>b.title.localeCompare(a.title));}}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
            <th>
              <select
                /*value={filter}*/ onChange={(e) => setQuery(e.target.value)}
              >
                <option value="">All</option>
                {Array.from(
                  Expenses.reduce(
                    (map, item) => map.set(item.category, item.id),
                    new Map()
                  )
                ).map(([category, id]) => (
                  <option key={id} id={id} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick=
                  {(e) => {
                    setsortCallback(()=>(a,b)=>a.amount - b.amount);}}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={(e) => {
                    setsortCallback(()=>(a,b)=> b.amount - a.amount);}}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {fExpenses.sort(sortCallback).map((item) => {
            return (
              <tr
                key={item.id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setX(e.clientX);
                  setY(e.clientY);
                  setRowid(item.id);
                }}
              >
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>₹ {item.amount}</td>
              </tr>
            );
          })}
          <tr>
            <th>Total</th>
            <th style = {{marginLeft:"40px" , cursor:"pointer"}} onClick=
                  {(e) => {
                    setsortCallback(()=>()=>{});}} >Clear Sort</th>
            <th>₹ {fExpenses.reduce((sum, item) => sum + +item.amount, 0)}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}
