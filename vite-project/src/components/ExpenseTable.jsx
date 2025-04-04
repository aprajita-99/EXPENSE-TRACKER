import React, { useState } from "react";
import { useFilter } from "../hooks/useFilter";
import ContextMenu from "./ContextMenu";
import styled, { css } from "styled-components";

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin: 2rem 0;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 500;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
    background: #f9f9f9;

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #4a5568;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const SortArrow = styled.svg`
  fill: white;
  opacity: 0.7;
  transition: all 0.2s ease;
  cursor: pointer;
    opacity: 1;
    transform: scale(1.1);
`;

const CategoryFilter = styled.select`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  padding: 0.3rem 0.5rem;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
  }

  option {
    color: #2d3748;
    background: white;
  }
`;

const TotalRow = styled(TableRow)`
  background: #f8f9fa;
  font-weight: 600;

  th {
    padding: 1rem;
    color: #2d3748;
  }
`;

const ClearSortButton = styled.th`
  padding: 1rem;
  color: #667eea;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
    color: #764ba2;
    text-decoration: underline;
`;

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
  const [sortCallback, setsortCallback] = useState(() => () => {});

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
      <TableContainer>
        <StyledTable
          onClick={(e) => {
            setX(0);
            setY(0);
          }}
        >
          <TableHeader>
            <tr>
              <TableHeaderCell>
                <SortContainer>
                  <span>Title</span>
                  <SortArrow
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    viewBox="0 0 384 512"
                    onClick={(e) => {
                      setsortCallback(() => (a, b) => a.title.localeCompare(b.title));
                    }}
                  >
                    <title>Ascending</title>
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                  </SortArrow>
                  <SortArrow
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    viewBox="0 0 384 512"
                    onClick={(e) => {
                      setsortCallback(() => (a, b) => b.title.localeCompare(a.title));
                    }}
                  >
                    <title>Descending</title>
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </SortArrow>
                </SortContainer>
              </TableHeaderCell>
              <TableHeaderCell>
                <CategoryFilter
                  onChange={(e) => setQuery(e.target.value)}
                >
                  <option value="">All Categories</option>
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
                </CategoryFilter>
              </TableHeaderCell>
              <TableHeaderCell>
                <SortContainer>
                  <span>Amount</span>
                  <SortArrow
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    viewBox="0 0 384 512"
                    onClick={(e) => {
                      setsortCallback(() => (a, b) => a.amount - b.amount);
                    }}
                  >
                    <title>Ascending</title>
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                  </SortArrow>
                  <SortArrow
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    viewBox="0 0 384 512"
                    onClick={(e) => {
                      setsortCallback(() => (a, b) => b.amount - a.amount);
                    }}
                  >
                    <title>Descending</title>
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </SortArrow>
                </SortContainer>
              </TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {fExpenses.sort(sortCallback).map((item) => {
              return (
                <TableRow
                  key={item.id}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setX(e.clientX);
                    setY(e.clientY);
                    setRowid(item.id);
                  }}
                >
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>₹{item.amount}</TableCell>
                </TableRow>
              );
            })}
            <TotalRow>
              <TableCell>Total</TableCell>
              <ClearSortButton
                onClick={(e) => {
                  setsortCallback(() => () => {});
                }}
              >
                Clear Sort
              </ClearSortButton>
              <TableCell>₹{fExpenses.reduce((sum, item) => sum + +item.amount, 0)}</TableCell>
            </TotalRow>
          </tbody>
        </StyledTable>
      </TableContainer>
    </>
  );
}
