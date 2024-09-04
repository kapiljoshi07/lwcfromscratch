const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [{movId: '0000', movVal: 200},{movId: '0001', movVal: 450} ,{movId: '0002', movVal: -400}, {movId: '0003', movVal: 3000}, {movId: '0004', movVal: -650}, {movId: '0005', movVal: -130}, {movId: '0006', movVal: 70}, {movId: '0007', movVal: 1300}],
  interestRate: 1.2, // %
  pin: 1111
};

const account2 = {
  owner: "Jessica Davis",
  movements: [{movId: '0000', movVal: 5000},{movId: '0001', movVal: 3400} ,{movId: '0002', movVal: -150}, {movId: '0003', movVal: 790}, {movId: '0004', movVal: -3210}, {movId: '0005', movVal: -1000}, {movId: '0006', movVal: 8500}, {movId: '0007', movVal: -30}],
  interestRate: 1.5,
  pin: 2222
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [{movId: '0000', movVal: 200},{movId: '0001', movVal: -200} ,{movId: '0002', movVal: 340}, {movId: '0003', movVal: -300}, {movId: '0004', movVal: -20}, {movId: '0005', movVal: 50}, {movId: '0006', movVal: 400}, {movId: '0007', movVal: -460}],
  interestRate: 0.7,
  pin: 3333
};

const account4 = {
  owner: "Sarah Smith",
  movements: [{movId: '0000', movVal: 430},{movId: '0001', movVal: 1000} ,{movId: '0002', movVal: 700}, {movId: '0003', movVal: 50}, {movId: '0004', movVal: 90}],
  interestRate: 1,
  pin: 4444
};

export const accounts = [account1, account2, account3, account4];