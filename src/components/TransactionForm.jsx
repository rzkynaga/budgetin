import React, { useState } from 'react';

function TransactionForm({ onSubmit }) {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const rawAmount = amount.replace(/\./g, ''); // Hapus format sebelum submit
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
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="" disabled>
          Pilih Tipe
        </option>
        <option className='opsi' value="income">Pemasukan</option>
        <option className='opsi' value="expense">Pengeluaran</option>
      </select>
      <input
        type="text"
        placeholder="Jumlah (Rp)"
        value={amount}
        onChange={handleAmountChange}
        required
      />
      <input
        type="text"
        placeholder="Deskripsi"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className='tgl'
      />
      <button type="submit">Tambah Transaksi</button>
    </form>
  );
}

export default TransactionForm;
