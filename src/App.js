import moment from "moment";
import { useState } from "react";
import "./App.css";
import customerOne from "./data/customerOne";
import {
  calculatedRewardsGroupedByMonth,
  calculateTotalRewards,
} from "./util/rewardsCalculator";

const renderRow = ({ transaction_date, transaction_amount, reward }) => (
  <tr>
    <td>{transaction_date}</td>
    <td>{transaction_amount}</td>
    <td>{reward}</td>
  </tr>
);

const App = () => {
  const [showData, setShowData] = useState(false);
  const records = calculatedRewardsGroupedByMonth(customerOne);
  const handleDataDisplay = () => {
    setShowData(!showData);
  };
  return (
    <>
      <h1>Rewards Summary</h1>
      <table>
        <tr>
          <th>Transaction Date</th>
          <th>Transaction Amount</th>
          <th>Reward</th>
        </tr>
        {Object.keys(records).map((month) => (
          <>
            <tr>
              <th colspan="3">{moment().month(month).format("MMMM")}</th>
            </tr>
            {records[month].map(renderRow)}
          </>
        ))}
        <tfoot>
          <tr>
            <th colspan="2">Total Rewards</th>
            <th>{calculateTotalRewards(records)}</th>
          </tr>
        </tfoot>
      </table>
      <button onClick={handleDataDisplay}>{`${
        showData ? "Hide" : "Show"
      } Customer Transaction Mock Data`}</button>
      {showData && <p>{JSON.stringify(customerOne)}</p>}
    </>
  );
};

export default App;
