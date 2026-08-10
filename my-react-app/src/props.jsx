import React from "react";

export const Child = React.memo(({
    count,
    name,
    city,
    result,
    onClick
}) => {
    console.log("Child render hua");

    return (
        <div>
            <h1>Count: {count}</h1>
            <h2>Name: {name.join(" ")}</h2>
            <h3>City: {city}</h3>
            <h3>Result: {result}</h3>
            <button onClick={onClick}>Click me </button>
        </div>
    );
});