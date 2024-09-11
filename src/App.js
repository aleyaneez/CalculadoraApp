import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import './App.css';

function App() {
    const [input, setInput] = useState('0');
    const [isOperatorClicked, setIsOperatorClicked] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [isResultShown, setIsResultShown] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;
            if (/\d/.test(key)) {
                handleClick(key);
            } else if (['+', '-', '*', '/'].includes(key)) {
                handleOperatorClick(key);
            } else if (key === 'Enter') {
                calculate();
            } else if (key === 'Escape') {
                clearInput();
            } else if (key === '.') {
                handleClick('.');
            } else if (key === '%') {
                calcularPorcentaje();
            } else if (key === 'Backspace') {
                setInput((prevInput) => prevInput.slice(0, -1));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    const handleClick = (value) => {
        setActiveButton(value);
        setTimeout(() => setActiveButton(null), 250);

        if (isResultShown && !isOperatorClicked) {
            setInput(value);
            setIsResultShown(false);
        } 
        else {
            setInput(input === '0' && value !== '.' ? value : input + value);
        }
        setIsOperatorClicked(false);
    };

    const clearInput = () => {
        setActiveButton('AC');
        setTimeout(() => setActiveButton(null), 250);
        setInput('0');
        setIsResultShown(false);
        setIsOperatorClicked(false);
    }

    const toggleSign = () => {
        setActiveButton('±');
        setTimeout(() => setActiveButton(null), 250);
        setInput((prevInput) => (parseFloat(prevInput) * -1).toString());
    };

    const calcularPorcentaje = () => {
        setActiveButton('%');
        setTimeout(() => setActiveButton(null), 250);
        setInput((prevInput) => (parseFloat(prevInput) / 100).toString());
    };

    const handleOperatorClick = (op) => {
        if (isResultShown) {
            setIsResultShown(false);
        }

        if (!isOperatorClicked) {
            setInput(input + op);
        } else {
            setInput(input.slice(0, -1) + op);
        }

        setIsOperatorClicked(true);
        setActiveButton(op);
        setTimeout(() => setActiveButton(null), 250);
    };

    const calculate = () => {
        setActiveButton('=');
        setTimeout(() => setActiveButton(null), 250);
        try {
            let result = evaluate(input).toString();

            if (result.length > 11) {
                result = Number(result).toExponential(6);
            }

            setInput(result);
            setIsResultShown(true);
        } catch (error) {
            setInput('Error');
            setTimeout(() => clearInput(), 1500);
        }
        setIsOperatorClicked(false);
    };

    return (
        <div className="App">
            <div className="calculator">
                <div className="display">{input}</div>
                <div className="buttons">
                    <button className={`special ${activeButton === 'AC' ? 'active' : ''}`} onClick={clearInput}>AC</button>
                    <button className={`special ${activeButton === '±' ? 'active' : ''}`} onClick={toggleSign}>+/-</button>
                    <button className={`special ${activeButton === '%' ? 'active' : ''}`} onClick={calcularPorcentaje}>%</button>
                    <button className={`operator ${activeButton === '/' ? 'active' : ''}`} onClick={() => handleOperatorClick('/')}>÷</button>

                    <button className={activeButton === '7' ? 'active' : ''} onClick={() => handleClick('7')}>7</button>
                    <button className={activeButton === '8' ? 'active' : ''} onClick={() => handleClick('8')}>8</button>
                    <button className={activeButton === '9' ? 'active' : ''} onClick={() => handleClick('9')}>9</button>
                    <button className={`operator ${activeButton === '*' ? 'active' : ''}`} onClick={() => handleOperatorClick('*')}>×</button>

                    <button className={activeButton === '4' ? 'active' : ''} onClick={() => handleClick('4')}>4</button>
                    <button className={activeButton === '5' ? 'active' : ''} onClick={() => handleClick('5')}>5</button>
                    <button className={activeButton === '6' ? 'active' : ''} onClick={() => handleClick('6')}>6</button>
                    <button className={`operator ${activeButton === '-' ? 'active' : ''}`} onClick={() => handleOperatorClick('-')}>−</button>

                    <button className={activeButton === '1' ? 'active' : ''} onClick={() => handleClick('1')}>1</button>
                    <button className={activeButton === '2' ? 'active' : ''} onClick={() => handleClick('2')}>2</button>
                    <button className={activeButton === '3' ? 'active' : ''} onClick={() => handleClick('3')}>3</button>
                    <button className={`operator ${activeButton === '+' ? 'active' : ''}`} onClick={() => handleOperatorClick('+')}>+</button>

                    <button className={`zero ${activeButton === '0' ? 'active' : ''}`} onClick={() => handleClick('0')}>0</button>
                    <button onClick={() => handleClick('.')}>.</button>
                    <button className={`operator ${activeButton === '=' ? 'active' : ''}`} onClick={calculate}>=</button>
                </div>
            </div>
        </div>
    );
}

export default App;
