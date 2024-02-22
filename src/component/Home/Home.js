import React, { useEffect, useState } from "react";
import Flight from "../Flight/Flight";
const Home = () => {
  const [counter, setCounter] = useState(0);
  const incrementCounter = () => {
    if (counter < 9) {
      setCounter(counter + 1);
    }
  };
  const decrementCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };
  const handleRadioChange = (event) => {
    console.log("Selected value:", event.target.value);
  };
  return (
    <div className="container mt-4">
      <div>
        <h2>Counter Part</h2>
      </div>
      <div>
        <div className="container_couner">
          <div className="button_container">
            <button
              onClick={decrementCounter}
              className={`button ${counter === 0 ? "disabled" : ""}`}
            >
              -
            </button>
            <span className="counter">{counter}</span>
            <button
              onClick={incrementCounter}
              className={`button ${counter === 9 ? "disabled" : ""}`}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <h2 className="mt-2">Radio Button</h2>
        </div>
        <div>
          <input
            type="radio"
            id="option1"
            name="options"
            value="option1"
            onChange={handleRadioChange}
          />
          <label htmlFor="option1">Option1</label>
          <input
            type="radio"
            id="option2"
            name="options"
            value="option2"
            onChange={handleRadioChange}
          />
          <label htmlFor="option2">Option2</label>

          <input
            type="radio"
            id="option3"
            name="options"
            value="option3"
            onChange={handleRadioChange}
          />
          <label htmlFor="option3">Option3</label>
        </div>
      </div>
      <Flight/>
    </div>
  );
};

export default Home;
