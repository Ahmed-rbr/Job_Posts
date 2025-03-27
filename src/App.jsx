import React from "react";

const App = () => {
  const name = "ahmed";
  const x = 10;
  const y = 20;
  const names = ["ahmed", "lolo", "koo", "dgdg"];
  const logIn = true;

  return (
    <>
      <div className="text-5xl">App</div>
      <p>
        the sum of {x} and {y} is {x + y}
      </p>
      <ul>
        {names.map((name, index) => (
          <li key={index}>
            {name}:{index}
          </li>
        ))}
      </ul>
      {logIn && <p>heloo</p>}
    </>
  );
};

export default App;
