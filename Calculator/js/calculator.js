// Creates an object to keep track of the calculator values
const Calculator = {
    Display_Value: '0',
    First_Operand: null,
    Wait_Second_Operand: false,
    operator: null,
};

// Modifies the display value whenever a number button is clicked
function Input_Digit(digit) {
    const { Display_Value, Wait_Second_Operand } = Calculator;

    // If an operator was selected, start entering the second number
    if (Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else {
        // Replace the initial zero or add the new digit to the existing value
        Calculator.Display_Value =
            Display_Value === '0' ? digit : Display_Value + digit;
    }
}

// Handles decimal points
function Input_Decimal(dot) {

    // If we are waiting for a second operand, begin it with 0.
    if (Calculator.Wait_Second_Operand === true) {
        Calculator.Display_Value = '0.';
        Calculator.Wait_Second_Operand = false;
        return;
    }

    // Prevent more than one decimal point
    if (!Calculator.Display_Value.includes(dot)) {
        Calculator.Display_Value += dot;
    }
}

// Handles calculator operators
function Handle_Operator(Next_Operator) {

    const {
        First_Operand,
        Display_Value,
        operator
    } = Calculator;

    const Value_of_Input = parseFloat(Display_Value);

    // Allows the user to change an operator before entering another number
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;
    }

    // Store the first number
    if (First_Operand === null) {
        Calculator.First_Operand = Value_of_Input;
    } else if (operator) {

        const Value_Now = First_Operand || 0;

        // Perform the selected calculation
        let result =
            Perform_Calculation[operator](Value_Now, Value_of_Input);

        // Limit long decimal results
        result = Number(result.toFixed(9));

        Calculator.Display_Value = result.toString();
        Calculator.First_Operand = result;
    }

    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}

// Contains the calculator's mathematical operations
const Perform_Calculation = {

    '/': (First_Operand, Second_Operand) =>
        First_Operand / Second_Operand,

    '*': (First_Operand, Second_Operand) =>
        First_Operand * Second_Operand,

    '+': (First_Operand, Second_Operand) =>
        First_Operand + Second_Operand,

    '-': (First_Operand, Second_Operand) =>
        First_Operand - Second_Operand,

    '=': (First_Operand, Second_Operand) =>
        Second_Operand
};

// Resets the calculator when AC is clicked
function Calculator_Reset() {

    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}

// Updates the calculator screen
function Update_Display() {

    const display = document.querySelector('.calculator-screen');

    display.value = Calculator.Display_Value;
}

// Display the initial value
Update_Display();

// Monitor clicks inside the calculator
const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (event) => {

    const { target } = event;

    // Ignore clicks that are not buttons
    if (!target.matches('button')) {
        return;
    }

    // Handle operators
    if (target.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }

    // Handle decimal button
    if (target.classList.contains('decimal')) {
        Input_Decimal(target.value);
        Update_Display();
        return;
    }

    // Handle AC button
    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        Update_Display();
        return;
    }

    // Otherwise, the button is a number
    Input_Digit(target.value);
    Update_Display();
});