import type { Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
}

function TransactionList({ transactions }: Props) {
  return (
    <div>
      <h2>Transactions</h2>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;