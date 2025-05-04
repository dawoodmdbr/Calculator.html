/* Select the display element */
let display = document.querySelector("#display");

/* Function to clear the display */
function clearDisplay() {
    display.value = "";
}

/* Function to delete the last character from the display */
function delChar() {
    display.value = display.value.slice(0, -1);
}

/* Function to append a character to the display */
function appendDisplay(char) {
    display.value += char;
}

/* Function to calculate the result based on the expression in the display */
function calculate() {
    try {
        // Replace division and multiplication symbols with JavaScript operators
        let expression = display.value.replace('÷', '/').replace('x', '*');

        // Evaluate mathematical functions
        expression = expression.replace(/√\(/g, 'Math.sqrt(');

        // Evaluate the expression
        let result = eval(expression);

        // Check if the result is Infinity or -Infinity
        if (result === Infinity || result === -Infinity) {
            display.value = "Math Error :)";
        } else if (Number.isInteger(result)) {
            // If the result is an integer, display it without decimal places
            display.value = result.toString();
        } else {
            // If it's a float, display with 4 decimal places
            display.value = parseFloat(result).toFixed(4);
        }
    } catch (error) {
        // Display a syntax error message
        display.value = "Syntax Error :)";
    }
}

/* Function to toggle dark mode and update button text accordingly */
function toggleDarkMode() {
    const body = document.querySelector('body');
    const calculator = document.querySelector('#calculator');
    const buttons = document.querySelectorAll('.btn');
    const darkModeBtn = document.querySelector('.dark-mode-btn');

    if (body.classList.contains('light-mode')) {
        
        // Switch to dark mode
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        calculator.classList.remove('light-mode');
        calculator.classList.add('dark-mode');
        buttons.forEach(button => {
            button.classList.remove('light-mode');
            button.classList.add('dark-mode');
        });
        // Update button text
        darkModeBtn.textContent = 'Light';
       
    } else {
         // Switch to light mode
         body.classList.remove('dark-mode');
         body.classList.add('light-mode');
         calculator.classList.remove('dark-mode');
         calculator.classList.add('light-mode');
         buttons.forEach(button => {
             button.classList.remove('dark-mode');
             button.classList.add('light-mode');
         });
         // Update button text
         darkModeBtn.textContent = 'Dark';
    }
}

/* Function to insert brackets according to the current display value */
function insertBracket() {
    let currentValue = display.value;
    let lastChar = currentValue[currentValue.length - 1];

    // Check if the last character is a number or a closing bracket
    if (!isNaN(lastChar) || lastChar === ")") {
        // Append a closing bracket
        appendDisplay(")");
    } else {
        // Append an opening bracket
        appendDisplay("(");
    }
}
