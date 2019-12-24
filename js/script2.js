

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

// CASH IN DRAWER IS REDUCED FROM A MULTIDMINESIONAL ARRAY INTO AN OBJECT WITH 10 PROPERTIES: 1 FOR EACH 
// DENOMINATION AND A TENTH FOR THE SUM OF ALL DENOMINATIONS
function generateRegister(cid){
    let register = {
        sum: 0 //shucks, I'm empty
    }

    for (let i = 0; i < cid.length; i++) {
        register[cid[i][0]] = cid[i][1];
        register.sum += cid[i][1];
    }

    return register;
}

//CREATES THE CASH IN DRAWER ARRAY FROM THE REGISTER
function generateCID(register){
    let cid = [["PENNY", register["PENNY"]], ["NICKEL", register["NICKEL"]], ["DIME", register["DIME"]], ["QUARTER", register["QUARTER"]], ["ONE", register["ONE"]], ["FIVE", register["FIVE"]], ["TEN", register["TEN"]], ["TWENTY", register["TWENTY"]], ["ONE HUNDRED", register["ONE HUNDRED"]]];
    return cid;
}

function updateUIRegister(register){
    //UPDATE THE REGISTER IN THE UI
    document.getElementById("pennies-value").innerHTML = Math.round(register["PENNY"] * 100) / 100;
    document.getElementById("nickels-value").innerHTML = Math.round(register["NICKEL"] * 100) / 100;;
    document.getElementById("dimes-value").innerHTML = Math.round(register["DIME"] * 100) / 100;;
    document.getElementById("quarters-value").innerHTML = Math.round(register["QUARTER"] * 100) / 100;;
    document.getElementById("ones-value").innerHTML = Math.round(register["ONE"] * 100) / 100;;
    document.getElementById("fives-value").innerHTML = Math.round(register["FIVE"] * 100) / 100;;
    document.getElementById("tens-value").innerHTML = Math.round(register["TEN"] * 100) / 100;;
    document.getElementById("twenties-value").innerHTML = Math.round(register["TWENTY"] * 100) / 100;;
    document.getElementById("hundreds-value").innerHTML = Math.round(register["ONE HUNDRED"] * 100) / 100;;
}

function checkCashRegister(price, cash, register) {
    //1. CHANGE IS HOW MUCH CASH YOU HAVE LEFT OVER AFTER PAYING THE PRICE
    let change = cash - price;
    let cid = generateCID(register) //using this to return if the register closes (step 4)


    //2. IF THERE IS NO CHANGE NEEDED
    if (change == 0) {
        return  {status: "OPEN", change: []};
    }
    //3. IF THERE IS NOT ENOUGH MONEY IN THE REGISTER TO GIVE CHANGE
    else if (change > register.sum) {
        return  {status: "INSUFFICIENT_FUNDS", change: []};
    }

    //4. IF CHANGE IS EQUAL TO THE TOTAL IN REGISTER THEN IT WILL HAVE TO CLOSE
    else if (change == register.sum) {
        return { status: "CLOSED", change: cid }
    }

    //5. IF THERE IS MORE THAN ENOUGH MONEY FOR CHANGE IN THE REGISTER
    //GO THROUGH EACH DENOMINATION STARTING WITH ONE HUNDRED. IF THE CHANGE IS HIGHER THAN THE VALUE OF A DENOMINATION
    // DISTRIBUTE THAT DENOMINATION UNTIL CHANGE IS LESS THAN ITS VALUE. MAKE SURE THERE IS CHANGE IN THE REGISTER FOR
    //EACH DENOMINATION.

    let change_arr = denominations.reduce(function (acc, curr) {
        let change_per_denomination = 0;
        while (change >= curr.value && register[curr.name] > 0) {
            change -= curr.value;
            register[curr.name] -= curr.value;
            change_per_denomination += curr.value;
            change = Math.round(change * 100) / 100; //round to the nearest hundreth to avoid preicison errors

        }

        //IF THERE WAS NO VALUE ADDED THEN HTERE WAS INSUFFICENT FUNDS
        if (change_per_denomination > 0) { acc.push([curr.name, change_per_denomination]) };

        return acc
    }, [])

    // IF THERE IS NOTHING IN THE CHANGE ARRAY OR THERE IS STILL CHANGE LEFT
    if (change_arr.length < 1 || change > 0) {
        console.log(change_arr)
        return  {status: "INSUFFICIENT_FUNDS", change: []};
    }

    //HERE IS THE CHANGE!
    return { status: "OPEN", change: change_arr };

}

//initialize the values already in the register
let cid =  [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
let register = generateRegister(cid);
updateUIRegister(register);



//SUBMIT BUTTON
document.getElementById("submit-button").addEventListener("click", function(){
    let price = document.getElementById("price-input").value;
    let cash = document.getElementById("cash-input").value;
    
    let registerChangeObject = checkCashRegister(price,cash, register);
    console.log(registerChangeObject)
    document.getElementById("register-status").innerHTML = registerChangeObject.status;
    document.getElementById("change").innerHTML = registerChangeObject.change;
    updateUIRegister(register);
})

//ENTER BUTTON FOR BOTH INPUTS
document.getElementById("price-input").addEventListener("keyup", function(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("submit-button").click();
       }
})

document.getElementById("cash-input").addEventListener("keyup", function(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("submit-button").click();
       }
})

