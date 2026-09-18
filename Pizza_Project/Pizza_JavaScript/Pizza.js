// ULKAR PIZZA
// Pizza.js

function getReceipt() {

    // Creates the receipt and calculates the pizza size price
    var text1 = "<h3>You Ordered:</h3>";
    var runningTotal = 0;
    var sizeTotal = 0;

    // Gets all pizza size choices
    var sizeArray = document.getElementsByClassName("size");

    for (var i = 0; i < sizeArray.length; i++) {

        if (sizeArray[i].checked) {

            var selectedSize = sizeArray[i].value;

            text1 = text1 + selectedSize + "<br>";
        }
    }

    // Determines price based on selected pizza size
    if (selectedSize === "Personal Pizza") {

        sizeTotal = 6;

    } else if (selectedSize === "Medium Pizza") {

        sizeTotal = 10;

    } else if (selectedSize === "Large Pizza") {

        sizeTotal = 14;

    } else if (selectedSize === "Extra Large Pizza") {

        sizeTotal = 16;
    }

    runningTotal = sizeTotal;

    console.log(
        selectedSize + " = $" + sizeTotal + ".00"
    );

    console.log(
        "size text1: " + text1
    );

    console.log(
        "subtotal: $" + runningTotal + ".00"
    );

    // After size, calculate vegetables
    getVeggies(runningTotal, text1);
}



// ========================================
// VEGETABLES
// ========================================

function getVeggies(runningTotal, text1) {

    var veggieTotal = 0;

    var selectedVeggies = [];

    // Gets all vegetable checkboxes
    var veggieArray =
        document.getElementsByClassName("veggies");

    for (var i = 0; i < veggieArray.length; i++) {

        if (veggieArray[i].checked) {

            selectedVeggies.push(
                veggieArray[i].value
            );

            console.log(
                "selected vegetable: (" +
                veggieArray[i].value +
                ")"
            );

            // Adds vegetable to receipt
            text1 =
                text1 +
                veggieArray[i].value +
                "<br>";
        }
    }

    var veggieCount =
        selectedVeggies.length;

    // First vegetable is free.
    // Each additional vegetable costs $1.
    if (veggieCount > 1) {

        veggieTotal =
            veggieCount - 1;

    } else {

        veggieTotal = 0;
    }

    runningTotal =
        runningTotal + veggieTotal;

    console.log(
        "total selected vegetables: " +
        veggieCount
    );

    console.log(
        veggieCount +
        " vegetable - 1 free vegetable = $" +
        veggieTotal +
        ".00"
    );

    console.log(
        "vegetable text1: " +
        text1
    );

    console.log(
        "subtotal after vegetables: $" +
        runningTotal +
        ".00"
    );

    // After vegetables, calculate meat toppings
    getTopping(runningTotal, text1);
}



// ========================================
// MEAT TOPPINGS
// ========================================

function getTopping(runningTotal, text1) {

    var toppingTotal = 0;

    var selectedTopping = [];

    // Gets all meat topping checkboxes
    var toppingArray =
        document.getElementsByClassName("toppings");

    for (var j = 0; j < toppingArray.length; j++) {

        if (toppingArray[j].checked) {

            selectedTopping.push(
                toppingArray[j].value
            );

            console.log(
                "selected topping item: (" +
                toppingArray[j].value +
                ")"
            );

            // Adds selected meat to receipt
            text1 =
                text1 +
                toppingArray[j].value +
                "<br>";
        }
    }

    var toppingCount =
        selectedTopping.length;

    // First meat topping is free.
    // Each additional meat topping costs $1.
    if (toppingCount > 1) {

        toppingTotal =
            toppingCount - 1;

    } else {

        toppingTotal = 0;
    }

    runningTotal =
        runningTotal + toppingTotal;

    console.log(
        "total selected topping items: " +
        toppingCount
    );

    console.log(
        toppingCount +
        " topping - 1 free topping = $" +
        toppingTotal +
        ".00"
    );

    console.log(
        "topping text1: " +
        text1
    );

    console.log(
        "Purchase Total: $" +
        runningTotal +
        ".00"
    );


    // Displays complete order
    document.getElementById(
        "showText"
    ).innerHTML = text1;


    // Displays final price
    document.getElementById(
        "totalPrice"
    ).innerHTML =
        "<h3>Total: <strong>$" +
        runningTotal +
        ".00</strong></h3>";
}