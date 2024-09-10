const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [{movId: '0000', movVal: 200, movDate: "2019-11-18T21:31:17.178Z"},{movId: '0001', movVal: 450, movDate: "2019-12-23T07:42:02.383Z"} ,{movId: '0002', movVal: -400, movDate: "2020-01-28T09:15:04.904Z"}, {movId: '0003', movVal: 3000, movDate: "2020-04-01T10:17:24.185Z"}, {movId: '0004', movVal: -650, movDate: "2020-05-08T14:11:59.604Z"}, {movId: '0005', movVal: -130, movDate: "2024-09-04T17:01:17.194Z"}, {movId: '0006', movVal: 70, movDate: "2024-09-05T23:36:17.929Z"}, {movId: '0007', movVal: 1300, movDate: "2024-09-06T10:51:36.790Z"}],
  interestRate: 1.2, // %
  pin: 1111,
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [{movId: '0000', movVal: 5000, movDate: "2019-11-01T13:15:33.035Z"},{movId: '0001', movVal: 3400, movDate: "2019-11-30T09:48:16.867Z"} ,{movId: '0002', movVal: -150, movDate: "2019-12-25T06:04:23.907Z"}, {movId: '0003', movVal: 790, movDate: "2020-01-25T14:18:46.235Z"}, {movId: '0004', movVal: -3210, movDate: "2020-02-05T16:33:06.386Z"}, {movId: '0005', movVal: -1000, movDate: "2024-09-04T14:43:26.374Z"}, {movId: '0006', movVal: 8500, movDate: "2024-09-05T18:49:59.371Z"}, {movId: '0007', movVal: -30, movDate: "2024-09-06T12:01:20.894Z"}],
  interestRate: 1.5,
  pin: 2222,
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [{movId: '0000', movVal: 200, movDate: "2019-11-01T13:15:33.035Z"},{movId: '0001', movVal: -200, movDate: "2019-11-30T09:48:16.867Z"} ,{movId: '0002', movVal: 340, movDate: "2019-12-25T06:04:23.907Z"}, {movId: '0003', movVal: -300, movDate: "2020-02-05T16:33:06.386Z"}, {movId: '0004', movVal: -20, movDate: "2020-04-01T10:17:24.185Z"}, {movId: '0005', movVal: 50, movDate: "2024-09-04T18:49:59.371Z"}, {movId: '0006', movVal: 400, movDate: "2024-09-05T12:01:20.894Z"}, {movId: '0007', movVal: -460, movDate: "2024-09-06T10:51:36.790Z"}], 
  interestRate: 0.7,
  pin: 3333,
  currency: "INR",
  locale: "en-IN"
};

const account4 = {
  owner: "Sarah Smith",
  movements: [{movId: '0000', movVal: 430, movDate: "2019-11-01T13:15:33.035Z"},{movId: '0001', movVal: 1000, movDate: "2019-11-30T09:48:16.867Z"} ,{movId: '0002', movVal: 700, movDate: "2024-09-04T06:04:23.907Z"}, {movId: '0003', movVal: 50, movDate: "2024-09-05T10:17:24.185Z"}, {movId: '0004', movVal: 90, movDate: "2024-09-06T10:51:36.790Z"}],
  interestRate: 1,
  pin: 4444,
  currency: "AUD",
  locale: "en-AU"
};

export const accounts = [account1, account2, account3, account4];