import React from 'react';

const History = ({ transactions }) => {
  return (
    <div>
      <p className="metadata">History</p>
      <table className="collection-desc w-full text-left mb-20">
        <thead>
          <tr className="v3-txt black-bg">
            <th>Event</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>
                {transaction.eventType}
              </td>
              <td>
                {transaction.from.substr(0,4) +
                '...' + 
                transaction.from.substr(transaction.from.length - 4, transaction.from.length)}
              </td>
              <td>
                {transaction.to.length > 0 ? transaction.to.substr(0,4) +
                '...' + 
                transaction.to.substr(transaction.to.length - 4, transaction.to.length) : "---"}
              </td>
              <td>
                {transaction.amount > 0 ? transaction.amount + "Ξ" : "---"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;      