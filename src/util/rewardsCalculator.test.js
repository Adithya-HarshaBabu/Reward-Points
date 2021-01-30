import {
  calculatedRewardsGroupedByMonth,
  calculateReward,
  calculateTotalRewards,
} from "./rewardsCalculator";
import customerOne from "../data/customerOne";

describe("unit tests", () => {
  it("caluclates reward correctly", () => {
    expect(calculateReward(0)).toEqual(0);
    expect(calculateReward(49)).toEqual(0);
    expect(calculateReward(50)).toEqual(0);
    expect(calculateReward(51)).toEqual(1);
    expect(calculateReward(99)).toEqual(49);
    expect(calculateReward(100)).toEqual(50);
    expect(calculateReward(101)).toEqual(52);
    expect(calculateReward(120)).toEqual(90);
  });
  it("caluclates rewards and groups records correctly", () => {
    expect(calculatedRewardsGroupedByMonth(customerOne)).toEqual({
      0: [
        { reward: 50, transaction_amount: 100, transaction_date: "01/01/2021" },
        { reward: 0, transaction_amount: 49, transaction_date: "01/05/2021" },
        { reward: 0, transaction_amount: 50, transaction_date: "01/21/2021" },
      ],
      1: [
        { reward: 1, transaction_amount: 51, transaction_date: "02/02/2021" },
        { reward: 70, transaction_amount: 110, transaction_date: "02/11/2021" },
        { reward: 0, transaction_amount: 0, transaction_date: "02/27/2021" },
      ],
      2: [
        {
          reward: 1384,
          transaction_amount: 767,
          transaction_date: "03/01/2021",
        },
        {
          reward: 690,
          transaction_amount: 420,
          transaction_date: "03/07/2021",
        },
      ],
    });
  });

  it("calculates total rewards correctly from grouped records", () => {
    expect(
      calculateTotalRewards({
        0: [
          {
            reward: 50,
            transaction_amount: 100,
            transaction_date: "01/01/2021",
          },
          { reward: 0, transaction_amount: 49, transaction_date: "01/05/2021" },
          { reward: 0, transaction_amount: 50, transaction_date: "01/21/2021" },
        ],
        1: [
          { reward: 1, transaction_amount: 51, transaction_date: "02/02/2021" },
          {
            reward: 70,
            transaction_amount: 110,
            transaction_date: "02/11/2021",
          },
          { reward: 0, transaction_amount: 0, transaction_date: "02/27/2021" },
        ],
        2: [
          {
            reward: 1384,
            transaction_amount: 767,
            transaction_date: "03/01/2021",
          },
          {
            reward: 690,
            transaction_amount: 420,
            transaction_date: "03/07/2021",
          },
        ],
      })
    ).toEqual(2195);
  });
});
