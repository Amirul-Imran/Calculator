class Calc {
    // Set up static flags and length
    static hasDecimal = false;
    static hasOper = false;
    static error = false;
    static displayLength = 1;

    // Enter number digit
    enterDigit(id) {
        var display = document.getElementById("display").value;
        if (display == '0' || this.error) {
            display = id;
            this.error = false;
        }
        else if (this.displayLength < 12) {
            display += id;
            this.displayLength += id.length;
        }
        document.getElementById("display").value = display;
    }
    
    // Enter decimal point if not exist
    enterDecimal() {
        var display = document.getElementById("display").value;

        if (!this.hasDecimal && !this.error) {
            display += ".";
            this.displayLength++;
            this.hasDecimal = true;
        }
        
        document.getElementById("display").value = display;
    }

    // Enter operation sign if not exist
    enterOper(id) {
        var display = document.getElementById("display").value;

        if (!this.hasOper && !this.error) {
            switch (id) {
                case "add":
                    display += "+";
                    break;
                case "subtract":
                    display += "-";
                    break;
                case "multiply":
                    display += "*";
                    break;
                case "divide":
                    display += "/";
                    break;
                case "remainder":
                    display += "%";
                    break;
                default:
            }
            this.displayLength++;
            this.hasOper = true;
        }
        
        document.getElementById("display").value = display;
    }

    // Evalute expression
    equal() {
        var display = document.getElementById("display").value;
        var result;

        if ((display.slice(-1) >= '0' && display.slice(-1) <= '9') || display.slice(-1) == '.') {
            result = eval(display);
            result = result.toString().slice(0, 12);

            if (result == "Infinity") {
                result = "&";
                this.error = true;
            }

            this.hasDecimal = result.includes(".");
            this.displayLength = result.length;

            document.getElementById("display").value = result;

            this.hasOper = false;
        }
    }
    
    // Backspace
    back() {
        var display = document.getElementById("display").value;
        var last = display.slice(-1);

        if (last == ".") {
            this.hasDecimal = false;
        }
        else if (last == "+" || last == "-" || last == "*" || last == "/" || last == "%") {
            this.hasOper = false;
        }

        if (display[0] == '-') {
            if(this.displayLength > 2) {
                document.getElementById("display").value = display.slice(0, -1);
            }
            else {
                document.getElementById("display").value = '0';
            }
            this.displayLength--;
        }
        else {
            if(this.displayLength > 1) {
                document.getElementById("display").value = display.slice(0, -1);
                this.displayLength--;
            }
            else {
                document.getElementById("display").value = '0';
                this.error = false;
            }
        }
    }
    
    // Reset display to zero
    reset() {
        document.getElementById("display").value = "0";
        this.displayLength = 1;
        this.hasDecimal = false;
        this.hasOper = false;
        this.error = false;
    }
}

var calc = new Calc();
calc.reset();
