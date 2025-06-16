import { useState, useEffect } from "react";
import api from "./api";

const App = () => {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        description: "",
        is_income: false,
        date: "",
    });

    const fetchTransactions = async () => {
        const response = await api.get("/transactions/");
        setTransactions(response.data);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleInputChange = (event) => {
        const value =
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value;
        setFormData({ ...formData, [event.target.name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        api.post("/transactions/", formData);
        fetchTransactions();
        setFormData({
            amount: "",
            category: "",
            description: "",
            is_income: false,
            date: "",
        });
    };

    return (
        <div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Finance App
                    </a>
                </div>
            </nav>

            <div>
                <form onSubmit={handleFormSubmit} className="container mt-4">
                    <div className="mb-3 mt-3">
                        <label htmlFor="amount" className="form-label">
                            Amount
                        </label>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="is_income" className="form-label">
                            Is Income?
                        </label>
                        <input
                            type="checkbox"
                            id="is_income"
                            name="is_income"
                            checked={formData.is_income}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                            Date
                        </label>
                        <input
                            type="text"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add Transaction
                    </button>
                </form>
            </div>
            <div className="container mt-4">
                <h2 className="mt-4">Transactions</h2>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Is Income?</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.amount}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.is_income ? "Yes" : "No"}</td>
                                <td>{transaction.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
