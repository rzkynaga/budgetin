import React, { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";

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
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Welcome! Tell us about yourself</h2>
            <form onSubmit={handleUserSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={handleChangeUserProfile}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={user.age}
                onChange={handleChangeUserProfile}
                required
              />
              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={user.occupation}
                onChange={handleChangeUserProfile}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {!isModalOpen && (
        <div>
          <header>
            <h1>Personal Finance Tracker</h1>
            <h3>Solusi Monitoring Finansialmu!</h3>
            <div className="user-info">
              <p>{user.name}, </p>
              <p>{user.age} Tahun,</p>
              <p>Seorang {user.occupation}</p>
              <button onClick={handleEditProfile}>Edit Profile</button>
            </div>
          </header>

          {isEditing && (
            <div className="edit-profile-modal">
              <h2>Edit Profile</h2>
              <form onSubmit={handleSaveProfile}>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChangeUserProfile}
                  required
                />
                <input
                  type="number"
                  name="age"
                  value={user.age}
                  onChange={handleChangeUserProfile}
                  required
                />
                <input
                  type="text"
                  name="occupation"
                  value={user.occupation}
                  onChange={handleChangeUserProfile}
                  required
                />
                <button type="button" onClick={handleSaveProfile}>
                  Save
                </button>
              </form>
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
