import { useState, useEffect } from "react";
import type { WidgetProps } from "../../types";
import "./WidgetBase.css";

type Transaction = { description: string; amount: number };

export default function FeesAndFinancesWidget({ widget, onChange }: WidgetProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(widget.content || []);

  useEffect(() => onChange(transactions), [transactions]);

  const addTransaction = () => setTransactions([...transactions, { description: "", amount: 0 }]);

  function updateTransaction<K extends keyof Transaction>(index: number, field: K, value: Transaction[K]) {
    const updated = [...transactions];
    updated[index][field] = value;
    setTransactions(updated);
  }

  return (
    <div>
      {transactions.map((t, i) => (
        <div key={i} style={{ display: "flex", marginBottom: 4 }}>
          <input
            placeholder="Description"
            value={t.description}
            onChange={(e) => updateTransaction(i, "description", e.target.value)}
            style={{ flex: 2, marginRight: 4 }}
          />
          <input
            placeholder="Amount"
            type="number"
            value={t.amount}
            onChange={(e) => updateTransaction(i, "amount", Number(e.target.value))}
            style={{ flex: 1 }}
          />
        </div>
      ))}
      <button onClick={addTransaction}>+ Add Transaction</button>
    </div>
  );
}
