

//1. CREATE AN ARRAY OF 9 DENOMINATION OBJECTS. 
// HUNDRED DOLLAR BILLS DOWN TO PENNIES
// WE WANT THE HUNDREDS FIRST BECAUSE THE REGISTER WILL LOOK TO GIVE CHANGE IN LARGER DENOMINATIONS FIRST
const denominations = [ //should htis be const or let?
    { name: "ONE HUNDRED", value: 100.00 },
    { name: "TWENTY", value: 20.00 },
    { name: "TEN", value: 10.00 },
    { name: "FIVE", value: 5.00 },
    { name: "ONE", value: 1.00 },
    { name: "QUARTER", value: 0.25 },
    { name: "DIME", value: 0.10 },
    { name: "NICKEL", value: 0.05 },
    { name: "PENNY", value: 0.01 },
]

function checkCashRegister(price, cash, cid) {
    //2. CHANGE IS HOW MUCH CASH YOU HAVE LEFT OVER AFTER PAYING THE PRICE
    let change = cash - price;

    //3. CASH IN DRAWER IS REDUCED FROM A MULTIDMINESIONAL ARRAY INTO AN OBJECT WITH 10 PROPERTIES: 1 FOR EACH 
    // DENOMINATION AND A TENTH FOR THE SUM OF ALL DENOMINATIONS
    let register = {
        sum: 0 //shucks, I'm empty
    }

    for (let i = 0; i < cid.length; i++) {
        register[cid[i][0]] = cid[i][1];
        register.sum += cid[i][1];
    }

    //4. IF THERE IS NOT ENOGUH MONEY IN THE REGISTER TO GIVE CHANGE
    if (change > register.sum) {
        console.log("yo")
        return  {status: "INSUFFICIENT_FUNDS", change: []};
    }

    //5. IF CHANGE IS EQUAL TO THE TOTAL IN REGISTER THEN IT WILL HAVE TO CLOSE
    else if (change == register.sum) {
        return { status: "CLOSED", change: cid }
    }

    //6. IF THERE IS MORE THAN ENOUGH MONEY FOR CHANGE IN THE REGISTER
    //GO THROUGH EACH DENOMINATION STARTING WITH ONE HUNDRED. IF THE CHANGE IS HIGHER THAN THE VALUE OF A DENOMINATION
    // DISTRIBUTE THAT DENOMINATION UNTIL CHANGE IS LESS THAN ITS VALUE. MAKE SURE THERE IS CHANGE IN THE REGISTER FOR
    //EACH DENOMINATION.

    let change_arr = denominations.reduce(function (acc, curr) {
        let change_per_denomination = 0;
        while (change >= curr.value && register[curr.name] > 0) {
            change -= curr.value;
            register[curr.name] -= curr.value;
            change_per_denomination += curr.value;
            console.log(change)
            change = Math.round(change * 100) / 100; //round to the nearest hundreth to avoid preicison errors

        }

        //IF THERE WAS NO VALUE ADDED THEN HTERE WAS INSUFFICENT FUNDS
        if (change_per_denomination > 0) { acc.push([curr.name, change_per_denomination]) };

        return acc
    }, [])

    console.log(change)

    // IF THERE IS NOTHING IN THE CHANGE ARRAY OR THERE IS STILL CHANGE LEFT
    if (change_arr.length < 1 || change > 0) {
        return  {status: "INSUFFICIENT_FUNDS", change: []};
    }


    //HERE IS THE CHANGE!
    return { status: "OPEN", change: change_arr };

}

let yo = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
console.log(yo)