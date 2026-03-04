
import { useState } from "react";

export default function Home() {
  const [dailyRate, setDailyRate] = useState(400);
  const [otRate, setOtRate] = useState(50);
  const [mode, setMode] = useState(15);

  const createDays = (count) =>
    Array.from({ length: count }, () => ({ work: 0, ot: 0, preuse: 0, spent: 0 }));

  const [days, setDays] = useState(createDays(mode));

  const handleModeChange = (value) => {
    setMode(value);
    setDays(createDays(value));
  };

  const handleChange = (index, field, value) => {
    const updated = [...days];
    updated[index][field] = Number(value);
    setDays(updated);
  };

  const totals = days.reduce(
    (acc, day) => {
      const income = day.work * dailyRate + day.ot * otRate;
      const balance = income - (day.preuse + day.spent);
      acc.work += day.work;
      acc.ot += day.ot;
      acc.income += income;
      acc.preuse += day.preuse;
      acc.spent += day.spent;
      acc.balance += balance;
      return acc;
    },
    { work: 0, ot: 0, income: 0, preuse: 0, spent: 0, balance: 0 }
  );

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Soewana Salary Tracker</h1>

      <div style={{ marginBottom: 20 }}>
        <label>Daily Rate: </label>
        <input type="number" value={dailyRate} onChange={(e) => setDailyRate(Number(e.target.value))} />
        <label style={{ marginLeft: 10 }}>OT Rate: </label>
        <input type="number" value={otRate} onChange={(e) => setOtRate(Number(e.target.value))} />
        <label style={{ marginLeft: 10 }}>Mode: </label>
        <select onChange={(e) => handleModeChange(Number(e.target.value))} value={mode}>
          <option value={15}>15 Days</option>
          <option value={30}>30 Days</option>
        </select>
        <button style={{ marginLeft: 10 }} onClick={() => setDays(createDays(mode))}>
          Reset
        </button>
      </div>

      {days.map((day, index) => {
        const income = day.work * dailyRate + day.ot * otRate;
        const balance = income - (day.preuse + day.spent);

        return (
          <div key={index} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
            <strong>Day {index + 1}</strong><br/>
            Work:
            <input type="number" onChange={(e) => handleChange(index, "work", e.target.value)} />
            OT:
            <input type="number" onChange={(e) => handleChange(index, "ot", e.target.value)} />
            Pre-use:
            <input type="number" onChange={(e) => handleChange(index, "preuse", e.target.value)} />
            Spent:
            <input type="number" onChange={(e) => handleChange(index, "spent", e.target.value)} />
            <div>Income: {income}</div>
            <div>Balance: {balance}</div>
          </div>
        );
      })}

      <h2>Totals</h2>
      <div>Total Work Days: {totals.work}</div>
      <div>Total OT Hours: {totals.ot}</div>
      <div>Total Income: {totals.income}</div>
      <div>Total Pre-use: {totals.preuse}</div>
      <div>Total Spent: {totals.spent}</div>
      <div><strong>Net Balance: {totals.balance}</strong></div>
    </div>
  );
}
