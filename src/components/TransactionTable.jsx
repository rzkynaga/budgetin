import React from 'react';

function TransactionTable({ transactions, onDelete }) {
  const formatRupiah = (amount) => {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={transaction.number || index}> {/* Menggunakan index sebagai fallback */}
            <td>{transaction.number}</td>
            <td>{transaction.type}</td>
            <td>{formatRupiah(transaction.amount)}</td>
            <td>{transaction.category}</td>
            <td>{transaction.date}</td>
            <td>
              <button onClick={() => onDelete(transaction)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;
