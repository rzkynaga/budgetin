import React, { useState } from 'react';

function TransactionForm({ onSubmit }) {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type || !amount || !category || !date) {
      alert("Semua bidang harus diisi!");
      return;
    }
    const rawAmount = amount.replace(/\./g, ''); 
    onSubmit({ type, amount: parseFloat(rawAmount), category, date });
    setType('');
    setAmount('');
    setCategory('');
    setDate('');
  };
  

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ''); // Hanya angka
    setAmount(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')); // Tambahkan titik
  };

  

  return (
    <form onSubmit={handleSubmit} className=" p-6 rounded-lg shadow-lg max-w-lg w-full mx-auto space-y-4">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg"
      >
        <option value="" disabled>
          Pilih Tipe
        </option>
        <option className="opsi" value="income">
          Pemasukan
        </option>
        <option className="opsi" value="expense">
          Pengeluaran
        </option>
      </select>

      <input
        type="text"
        placeholder="Jumlah (Rp)"
        value={amount}
        onChange={handleAmountChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg"
      />

      <input
        type="text"
        placeholder="Deskripsi"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg"
      />

      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Tambah Transaksi
      </button>
    </form>
  );
}

export default TransactionForm;
