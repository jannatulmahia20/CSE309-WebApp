import type { Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
}

function TransactionList({ transactions }: Props) {
  return (
    <div className="table-wrap">
      <table>
        <caption className="sr-only">Transaction history</caption>
        <thead>
          <tr>
            <th>Title</th>
            <th className="col-amount">Amount</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={4} className="empty-state">
                No transactions yet.
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td
                  className={`col-amount ${
                    transaction.type === "Income"
                      ? "amount-income"
                      : "amount-expense"
                  }`}
                >
                  {transaction.type === "Income" ? "+" : "-"}৳{" "}
                  {transaction.amount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>{transaction.category}</td>
                <td>
                  <span
                    className={`badge ${
                      transaction.type === "Income"
                        ? "badge-income"
                        : "badge-expense"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
