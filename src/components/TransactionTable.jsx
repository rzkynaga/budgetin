import React from 'react';

const TransactionTable = ({ transactions, onDelete }) => {
  const formatRupiah = (amount) => {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="px-4 sm:px-12 pb-10">
      {/* Tabel untuk Desktop */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.number || index}
                className="border-t hover:bg-gray-100"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{transaction.type}</td>
                <td className="px-4 py-2 text-center">
                  {formatRupiah(transaction.amount)}
                </td>
                <td className="px-4 py-2 text-center">{transaction.category}</td>
                <td className="px-4 py-2 text-center">{transaction.date}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => onDelete(transaction)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabel untuk Mobile */}
      <div className="sm:hidden space-y-4">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.number || index}
            className="bg-gray-900 shadow-md rounded-lg p-4"
          >
            <div className="flex justify-between mb-2">
              <span className="font-semibold">No:</span>
              <span>{index + 1}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Type:</span>
              <span>{transaction.type}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Amount:</span>
              <span>{formatRupiah(transaction.amount)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Category:</span>
              <span>{transaction.category}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Date:</span>
              <span>{transaction.date}</span>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => onDelete(transaction)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
