import React, { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import './index.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState({ name: "", age: "", occupation: "" });
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal hanya terbuka jika data user belum ada
  const [isEditing, setIsEditing] = useState(false); // Untuk kontrol mode edit profil

  // Memuat data dari LocalStorage
  useEffect(() => {
    const localTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(localTransactions);

    // Memuat data user dari LocalStorage jika ada
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      setUser(localUser);
    } else {
      setIsModalOpen(true); // Menampilkan modal jika data user belum ada
    }
  }, []);

  // Menyimpan data transaksi ke LocalStorage
  const saveTransaction = (transaction) => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.unshift(transaction); // Menambahkan transaksi terbaru ke awal array
    localStorage.setItem("transactions", JSON.stringify(transactions));
  };

  const addTransaction = (formData) => {
    const { type, amount, category, date } = formData;

    // Membuat transaksi baru dengan nomor 1
    const newTransaction = {
      type,
      amount,
      category,
      date,
      number: 1, // Transaksi baru selalu mendapat nomor 1
    };

    // Menyimpan transaksi baru dan menggeser transaksi lama
    const updatedTransactions = [
      newTransaction,
      ...transactions.map((t, index) => ({
        ...t,
        number: index + 2, // Menambah nomor urut untuk transaksi lama (nomor mulai dari 2)
      })),
    ];

    // Menyimpan semua transaksi yang telah diupdate ke LocalStorage
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    // Memperbarui state transaksi
    setTransactions(updatedTransactions);
  };

  const deleteTransaction = (transactionToDelete) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.number !== transactionToDelete.number
    );

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setTransactions(updatedTransactions);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (user.name && user.age && user.occupation) {
      // Menyimpan data user ke LocalStorage
      localStorage.setItem("user", JSON.stringify(user));
      setIsModalOpen(false);
    } else {
      alert("Please fill out all fields!");
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
  };

  const handleChangeUserProfile = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="relative">
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Hi! Tell us about yourself</h2>
            <form onSubmit={handleUserSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={handleChangeUserProfile}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={user.age}
                onChange={handleChangeUserProfile}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={user.occupation}
                onChange={handleChangeUserProfile}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Submit</button>
            </form>
          </div>
        </div>
      )}
  
      {!isModalOpen && (
        <div>
          <header className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center rounded-b-lg">
            <h1 className="text-4xl font-bold">BudgetIn Finance Tracker</h1>
            <h3 className="text-lg">Solusi Monitoring Finansialmu!</h3>
            <div className="user-info mt-4 text-md font-medium gap-2">
              <p>{user.name} |</p>
              <p>{user.age} Tahun |</p>
              <p>{user.occupation}</p>
            </div>
            <button onClick={handleEditProfile} className="mt-4 px-6 py-2 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-500 transition">
              Edit Profile
            </button>
          </header>
  
          {isEditing && (
            <div className="edit-profile-modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="modal bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChangeUserProfile}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    name="age"
                    value={user.age}
                    onChange={handleChangeUserProfile}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    name="occupation"
                    value={user.occupation}
                    onChange={handleChangeUserProfile}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <button type="button" onClick={handleSaveProfile} className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                    Save
                  </button>
                </form>
              </div>
            </div>
          )}
  
          <TransactionForm onSubmit={addTransaction} />
          <TransactionTable
            transactions={transactions}
            onDelete={deleteTransaction}
          />
        </div>
      )}
    </div>
  );
  
}

export default App;
