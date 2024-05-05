import { useReducer } from "react";
import Display from "./Display";
import './Calculator.css'
const ADDINPUT = "ADD_INPUT";
const CALCULATE = "CALCULATE";
const CLEAR = "CLEAR";
const DELETE = "DELETE";
const operators = ["+", "-", "/", "*"];

const Calculator = () => {
    const initialState = {
        inputs: "",
        result: "",
    };

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case ADDINPUT: {
                const lastInput = state.inputs[state.inputs.length - 1];
                const newInput = action.payload;

                // Prevent adding multiple decimal points
                if (newInput === "." && lastInput === ".") {
                    return state;
                }

                // Prevent adding operators consecutively
                if (
                    operators.includes(lastInput) &&
                    operators.includes(newInput)
                ) {
                    return state;
                }

                // Replace zero or an operator with the current input
                if (state.inputs === "0" || operators.includes(state.inputs)) {
                    return { ...state, inputs: newInput };
                }

                return { ...state, inputs: state.inputs + newInput };
            }

            case CALCULATE: {
                try {
                    const result = eval(state.inputs);
                    return { ...state, result, inputs: result.toString() };
                } catch (err) {
                    console.error(err);
                    return { ...state, result: "Error", inputs: "" };
                }
            }

            case CLEAR: {
                return { ...state, inputs: "", result: "" };
            }

            case DELETE: {
                return { ...state, inputs: state.inputs.slice(0, -1) };
            }

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleInputs = (value) => {
        dispatch({ type: ADDINPUT, payload: value });
    };

    const handleCalculate = () => {
        dispatch({ type: CALCULATE });
    };

    const handleClear = () => {
        dispatch({ type: CLEAR });
    };

    const handleDelete = () => {
        dispatch({ type: DELETE });
    };

    console.log(state);

    return (
        <div id="calculator">
            <Display inputs={state.inputs} />

            <div className="button-container">
                <button onClick={handleClear} id="clearBtn">
                    AC
                </button>
                <button onClick={handleDelete}>Del</button>
                <button onClick={() => handleInputs("+")}>+</button>
            </div>
            <div className="button-container">
                <button onClick={() => handleInputs("1")}>1</button>
                <button onClick={() => handleInputs("2")}>2</button>
                <button onClick={() => handleInputs("3")}>3</button>
                <button onClick={() => handleInputs("-")}>-</button>
            </div>
            <div className="button-container">
                <button onClick={() => handleInputs("4")}>4</button>
                <button onClick={() => handleInputs("5")}>5</button>
                <button onClick={() => handleInputs("6")}>6</button>
                <button onClick={() => handleInputs("*")}>*</button>
            </div>
            <div className="button-container">
                <button onClick={() => handleInputs("7")}>7</button>
                <button onClick={() => handleInputs("8")}>8</button>
                <button onClick={() => handleInputs("9")}>9</button>
                <button onClick={() => handleInputs("/")}>/</button>
            </div>
            <div className="button-container">
                <button onClick={() => handleInputs(".")}>.</button>
                <button onClick={() => handleInputs("0")}>0</button>
                <button onClick={handleCalculate} id="calcBtn">
                    =
                </button>
            </div>
        </div>
    );
};

export default Calculator;
