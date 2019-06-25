//** CREATE A CURRENCY OBJECT */
function getCurrency(change, cid){
  let num;
  let str;
  let index;

  if(change >= 100.00 && cid[8][1] >= 100.00){
    num = 100.00;
    str = "ONE HUNDRED";
    index = 8;
  }
  else if(change >= 20.00 && cid[7][1] >= 20.00){
    num = 20.00;
    str = "TWENTY";
    index = 7;
  }
  else if (change >= 10.00 && cid[6][1] >= 10.00){
    num = 10.00;
    str = "TEN";
    index = 6;
  }
  else if (change >= 5.00 && cid[5][1] >= 5.00){
    num = 5.00;
    str = "FIVE";
    index = 5;
  }
  else if (change >= 1.00 && cid[4][1] >= 1.00){
    num = 1.00;
    str = "ONE";
    index = 4;
  }
  else if (change >= 0.25 && cid[3][1] >= .25){
    num = 0.25;
    str = "QUARTER";
    index = 3;
  }
  else if (change >= .1 && cid[2][1] >= .1){
    num = 0.1;
    str = "DIME";
    index = 2;
  }
  else if (change >= .05 && cid[1][1] >= .05){
    num = 0.05;
    str = "NICKEL";
    index = 1;
  }
  else if (change >= .01 && cid[0][1] >= .01){
    num = 0.01;
    str = "PENNY";
    index = 0;
  }

  return {
    num:num,
    str:str,
    index:index,
    change:change
  }

}

//** COUNT ALL FUNDS IN REGISTER */
function sumRegister(change, cid){
let sum = 0;
cid.forEach(function(element){
  sum += element[1];
});
sum = sum.toFixed(2);
return sum;
}
//** COUNT ALL FUNDS IN REGISTER THAT CAN BE USED FOR THE GIVEN CHANGE */
function sumUsableRegister(change, cid){
let sumOfUsableCurrency = 0;
let highestUsableCurrency = getCurrency(change,cid);
for(let i = highestUsableCurrency.index; i >= 0; i--){
  sumOfUsableCurrency += cid[i][1];
}
sumOfUsableCurrency = sumOfUsableCurrency.toFixed(2);
return sumOfUsableCurrency;
}


//** GET CHANGE */
function generateChange(changeArr, change, cid){

  let currency = getCurrency(change,cid);

  let remainder = 0;
  let availableCash = cid[currency.index][1];
  let toAdd;

  if(Math.floor((currency.change / currency.num)) * currency.num >    availableCash){ 
    toAdd = (availableCash / currency.num) * currency.num;
  }
  else{
    toAdd = Math.floor(change/currency.num) * currency.num;
    
  }

  cid[currency.index][1] -= toAdd; //decrement currency in register

  remainder = currency.change - toAdd;
  remainder = Math.round(remainder * 100) / 100 //round to two decimals

  console.log(`Add ${toAdd} in ${currency.str}s`);
  console.log(`Remainder of ${remainder}`);
  

  let subArr = [currency.str, toAdd];
  changeArr.push(subArr);

  if(remainder > 0){
    changeArr = generateChange(changeArr, remainder,cid);
  }
  
  return changeArr;

}

//** MAIN */
function checkCashRegister(price, cash, cid) {
var change  = cash - price;
let status;
let result;

//STATUS OF THE REGISTER
if(sumUsableRegister(change, cid) < change){
  status = "INSUFFICIENT_FUNDS";
  return{status:status, change:[]}
}
else if (sumRegister(change, cid) == change){
  status = "CLOSED";
  return{status:status, change:cid}
}
else{ 
  status = "OPEN";
  let changeArr = [];
  changeArr = generateChange(changeArr, change,cid);
  let result = {status: status, change: changeArr};
  return {status: "OPEN", change: changeArr};
}

}


// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

let myResult = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
console.log(myResult)




