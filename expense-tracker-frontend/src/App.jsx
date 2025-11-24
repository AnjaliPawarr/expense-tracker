import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/NavBar";

const API_BASE_URL = "http://localhost:8080/api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);
function App() {
  return (
    <>
      <Navbar />
      {/* Baaki pages */}
    </>
  );
}

  // ================== A. Fetch All Data ==================
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE_URL);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
      setError("API Error. Check backend and CORS.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ================== B. Handle Input Change ==================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================== C. Create or Update ==================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!newExpense.name || !newExpense.amount || !newExpense.category || !newExpense.date) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      if (editingId) {
        // ---------- UPDATE ----------
        const res = await axios.put(`${API_BASE_URL}/${editingId}`, newExpense);

        setExpenses((prev) =>
          prev.map((exp) => (exp.id === editingId ? res.data : exp))
        );

        setEditingId(null);
      } else {
        // ---------- CREATE ----------
        const res = await axios.post(API_BASE_URL, newExpense);
        setExpenses((prev) => [...prev, res.data]);
      }

      // clear form
      setNewExpense({
        name: "",
        amount: "",
        category: "",
        description: "",
        date: "",
      });

    } catch (err) {
      console.error(err);
      setError("Save/Update failed.");
    }
  };

  // ================== D. Delete ==================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      console.error(err);
      setError("Delete failed.");
    }
  };

  // ================== E. Edit ==================
  const handleEdit = (expense) => {
    setNewExpense({
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date ? expense.date.substring(0, 10) : "",
    });

    setEditingId(expense.id);
  };

  // ================== Render ==================
  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <h1>💰 House Owl</h1>

      {error && <div className="error-message">{error}</div>}

      {/* ========== Form ========== */}
      <div className="form-section">
        <h2>{editingId ? "📝 Edit Expense" : "➕ Add Expense"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Expense Name"
            value={newExpense.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newExpense.category}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description (Optional)"
            value={newExpense.description}
            onChange={handleInputChange}
          />

          <button type="submit">
            {editingId ? "Save Changes" : "Add Expense"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setEditingId(null);
                setNewExpense({
                  name: "",
                  amount: "",
                  category: "",
                  description: "",
                  date: "",
                });
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* ========== List ========== */}
      <div className="list-section">
        <h2>📊 Expense List</h2>

        {expenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          <ul className="expense-list">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                className={editingId === expense.id ? "editing" : ""}
              >
                <div>
                  <strong>{expense.name}</strong> {`(₹${expense.amount})`}
                  <span className="category-tag">[{expense.category}]</span>
                  <span className="date-display">
                    Date: {expense.date?.substring(0, 10)}
                  </span>

                  {expense.description && (
                    <p className="description-text">Note: {expense.description}</p>
                  )}
                </div>

                <div className="actions">
                  <button
                    onClick={() => handleEdit(expense)}
                    disabled={editingId && editingId !== expense.id}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(expense.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
