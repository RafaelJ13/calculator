import { useEffect, useState, useCallback } from 'react'

import '../css/calculator.css'
import Screen from './screen'
import Button from './button'

const btnArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '='];

function Calculator() {
    const [calculated, setCalculated] = useState(false);
    const [calcTerms, setCalcTerms] = useState([]);
    const [value, setValue] = useState("0");


    const ButtonClickHandler = useCallback((num) => {
        // números
        if (!isNaN(num)) {
            if (calculated) {
                setValue(num);       
                setCalculated(false);
            } else {
                setValue(prev => prev === "0" ? num : prev + num);
                return;
            }
        }

        switch (num) {
            case "+":
            case "-":
            case "*":
            case "/":
                setCalcTerms([value, num]);
                setValue("0");
                return;

            case "=": {
                if (calcTerms.length === 0) return;

                const [first, operator] = calcTerms;

                const a = Number(first);
                const b = Number(value);

                let result = 0;

                if (operator === "+") result = a + b;
                if (operator === "-") result = a - b;
                if (operator === "*") result = a * b;
                if (operator === "/") result = a / b;

                setValue(String(result));
                setCalcTerms([]);
                setCalculated(true)

                return;
            }
            case "BACKSPACE":

                setValue(prev => {
                if (prev.length <= 1) return "0";
                    return prev.slice(0, -1);
                });
                
                return;
        }
    }, [value, calcTerms, calculated]);
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key;

            if (!isNaN(key) || ["+", "-", "*", "/", "=",].includes(key)) {
                ButtonClickHandler(key);
            }

            if (key === "Enter") {
                ButtonClickHandler("=");
            }
            if(key === "Backspace") {
                ButtonClickHandler("BACKSPACE")
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [ButtonClickHandler]);

    return (
        <div className="calculator">
            <Screen value={value}/>
            <div className='buttons'>
                {
                    btnArr.map((btnText) => (
                    <Button buttonNum={btnText} GetNum={ButtonClickHandler} />
                    ))
                };
            </div>  
        </div>
    )
}
export default Calculator