import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const ButtonCounter = () => {
  const [numbers, setNumbers] = useState([1]);
  const handleKeyup = (e: KeyboardEvent) => {
    const key = e.key;
    if (key === "w") {
      setNumbers((numbers) => {
        const newNumbers = [...numbers];
        newNumbers[0]++;
        return newNumbers;
      });
    }
  };
  useEffect(() => {
    alert("assigning keyup listener");
    document.addEventListener("keyup", handleKeyup, true);
    return () => {
      alert("removing listener");
      document.removeEventListener("keyup", handleKeyup, true);
    };
  }, []);
  return <div>{numbers[0]}</div>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <ButtonCounter /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
