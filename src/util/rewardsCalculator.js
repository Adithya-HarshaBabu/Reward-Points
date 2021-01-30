import moment from "moment";

export const calculateReward = (amount) =>
  2 * (amount > 100 ? amount - 100 : 0) +
  (amount > 100 ? 50 : amount > 50 ? amount - 50 : 0);

export const calculateTotalRewards = (records) => {
  let result = 0;
  for (const month in records) {
    result =
      result + records[month].reduce((acc, { reward }) => acc + reward, 0);
  }
  return result;
};

export const calculatedRewardsGroupedByMonth = (records) => {
  let result = {};

  records.forEach(({ transaction_date, transaction_amount }) => {
    const month = moment(transaction_date).get("month");
    if (month in result) {
      result = {
        ...result,
        [month]: [
          ...result[month],
          {
            transaction_amount,
            transaction_date,
            reward: calculateReward(transaction_amount),
          },
        ],
      };
    } else {
      result = {
        ...result,
        [month]: [
          {
            transaction_amount,
            transaction_date,
            reward: calculateReward(transaction_amount),
          },
        ],
      };
    }
  });

  return result;
};
