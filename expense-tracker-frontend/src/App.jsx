import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'; // 📊 चार्ट्स के लिए
import Login from './Login';
import './App.css';

const API_BASE_URL = "http://localhost:8080/api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('userId') || null);
  const [newExpense, setNewExpense] = useState({ name: '', amount: '', category: 'Food', description: '', date: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [isCustom, setIsCustom] = useState(false);


  const [searchTerm, setSearchTerm] = useState(""); // सर्च के लिए
  const [monthlyBudget, setMonthlyBudget] = useState(20000); // बजट सेट करने के लिए


  const startVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice. Please use Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.onstart = () => setError("Listening… speak now (for example: Tea 20 Food)");
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const words = transcript.split(" ");
      if (words.length >= 2) {
        setIsCustom(false);
        setNewExpense({
          ...newExpense,
          name: words[0],
          amount: words[1].replace(/[^0-9]/g, ''),
          category: words[2] || "Other",
          date: new Date().toISOString().split('T')[0]
        });
        setError( `catch it: ${words[0]} - ₹${words[1]}`);
      }
    };
    recognition.start();
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const remainingBalance = monthlyBudget - totalExpense;

  // चार्ट के लिए कैटेगरी-वाइज़ डेटा तैयार करना
  const chartData = Object.entries(
    expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];


  const fetchExpenses = async () => {
    if (!currentUserId) return;
    try {
      setError(null);
      const res = await axios.get(`${API_BASE_URL}/user/${currentUserId}`);
      setExpenses(res.data);
    } catch (err) {
      setError("API Error. Backend check karein.");
    }
  };

  const filterByTime = async (type) => {
    let start = new Date();
    let end = new Date().toISOString().split('T')[0];
    if (type === 'today') start = new Date().toISOString().split('T')[0];
    else if (type === 'weekly') start.setDate(start.getDate() - 7);
    else if (type === 'monthly') start.setMonth(start.getMonth() - 1);

    const startDate = typeof start === 'string' ? start : start.toISOString().split('T')[0];
    try {
      const res = await axios.get(`${API_BASE_URL}/user/${currentUserId}/filter?start=${startDate}&end=${end}`);
      setExpenses(res.data);
    } catch (err) {
        console.error("Error saving :",err);
        setError("Filter fail hua.");
         }
  };

  useEffect(() => { fetchExpenses(); }, [currentUserId]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (totalExpense + Number(newExpense.amount) > monthlyBudget) {
      alert("⚠ ALERT: you have exceeded your budget limit.");
    }

    const expenseWithUser = { ...newExpense, userId: currentUserId };
    console.log("button",expenseWithUser);
    try {
      if (editingId) {
        const res = await axios.put(`${API_BASE_URL}/${editingId}`, expenseWithUser);
        setExpenses(expenses.map(exp => exp.id === editingId ? res.data : exp));
        setEditingId(null);
      } else {
        const res = await axios.post(API_BASE_URL, expenseWithUser);
        setExpenses([...expenses, res.data]);
      }
      setEditingId(null);
      setNewExpense({ name: '', amount: '', category: 'Food', description: '', date: '' });
      setIsCustom(false);
    } catch (err) { setError("Save fail hua."); }
  };

  const handleLogin = (id) => { setCurrentUserId(id); localStorage.setItem('userId', id); };
  const handleLogout = () => { setCurrentUserId(null); localStorage.removeItem('userId'); };

  if (!currentUserId) return <Login onLogin={handleLogin} />;

  return (
    <div className="container">
      <h1>💰 Smart Expense Dashboard</h1>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      {/* 🚀 MONTHLY SUMMARY SECTION */}
      <div className="summary-grid">
        <div className="summary-card">
          <h3>Monthly Budget</h3>
          <input type="number" value={monthlyBudget} onChange={(e) => setMonthlyBudget(e.target.value)} className="budget-input" />
        </div>
        <div className="summary-card">
          <h3>Total Spent</h3>
          <p style={{color: 'red', fontWeight: 'bold'}}>₹{totalExpense}</p>
        </div>
        <div className="summary-card">
          <h3>Remaining</h3>
          <p style={{color: remainingBalance < 0 ? 'black' : 'green', fontWeight: 'bold'}}>₹{remainingBalance}</p>
        </div>
      </div>

      <div className="main-content">
        {/* FORM SECTION */}
        <div className="form-section">
          <form onSubmit={handleSubmit} className="expense-form">
            <button type="button" className="voice-btn" onClick={startVoiceCommand}>🎤 Voice Input</button>
            <input type="text" placeholder="Item Name" value={newExpense.name} onChange={(e) => setNewExpense({...newExpense, name: e.target.value})} required />
            <input type="number" placeholder="Amount" value={newExpense.amount} onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})} required />
            <select onChange={(e) => e.target.value === "Custom" ? setIsCustom(true) : (setIsCustom(false), setNewExpense({...newExpense, category: e.target.value}))} value={isCustom ? "Custom" : newExpense.category}>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Rent">Rent</option>
              <option value="Shopping">Shopping</option>
              <option value="Custom">+ Add Custom</option>
            </select>
            {isCustom && <input type="text" placeholder="Custom Category" onChange={(e) => setNewExpense({...newExpense, category: e.target.value})} required />}
            <input type="date" value={newExpense.date} onChange={(e) => setNewExpense({...newExpense, date: e.target.value})} required />
            <button type="submit" className="submit-btn">{editingId ? 'Update' : 'Add Expense'}
                </button>
          </form>
        </div>

        {/* 📊 CHARTS SECTION */}
        <div className="chart-section">
          <h3>Category Wise Split</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔍 SEARCH & FILTER SECTION */}
      <div className="list-section">
        <div className="controls">
          <input type="text" placeholder="🔍 Search items or categories..." className="search-bar" onChange={(e) => setSearchTerm(e.target.value)} />
          <div className="filter-buttons">
            <button onClick={() => filterByTime('today')}>Today</button>
            <button onClick={() => filterByTime('weekly')}>Weekly</button>
            <button onClick={() => filterByTime('monthly')}>Monthly</button>
            <button onClick={fetchExpenses} style={{backgroundColor: '#555'}}>All</button>
          </div>
        </div>

        {expenses.length === 0 ? <p>No data found.</p> : (
          <ul>
            {expenses
              .filter(exp => exp.name.toLowerCase().includes(searchTerm.toLowerCase()) || exp.category.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(exp => (
                <li key={exp.id} className="expense-item">
                  <span><strong>{exp.name}</strong> ({exp.category}) - <span className="amt">₹{exp.amount}</span></span>
                  <button onClick={() => {setNewExpense(exp); setEditingId(exp.id);}}>Edit</button>
                </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default App