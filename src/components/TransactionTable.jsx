import React from 'react';

function TransactionTable({ transactions, onDelete }) {
  const formatRupiah = (amount) => {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="overflow-x-auto px-12 pb-10">
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-blue-500 text-white text-center">
            <th className="text-center px-4 py-2">No.</th>
            <th className="px-4 py-2 text-center ">Type</th>
            <th className="px-4 py-2 text-center ">Amount</th>
            <th className="px-4 py-2 text-center ">Category</th>
            <th className="px-4 py-2 text-center ">Date</th>
            <th className="px-4 py-2 text-center ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.number || index} className="border-t">
              <td className="px-4 py-2 text-center ">{transaction.number}</td>
              <td className="px-4 py-2 text-center ">{transaction.type}</td>
              <td className="px-4 py-2 text-center ">{formatRupiah(transaction.amount)}</td>
              <td className="px-4 py-2 text-center ">{transaction.category}</td>
              <td className="px-4 py-2 text-center ">{transaction.date}</td>
              <td className="px-4 py-2 text-center ">
                <button
                  onClick={() => onDelete(transaction)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
