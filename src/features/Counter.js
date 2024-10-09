import { useState } from "react";

function Counter() {
  let [count, setCount] = useState(0);

  const clickOnMe = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={clickOnMe}>Click me</button>
      <span data-testid="count">{count}</span>
    </div>
  );
}

export default Counter;
