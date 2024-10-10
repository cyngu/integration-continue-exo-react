import { useState } from "react";

/**
 * Counter component that increments a count value each time the button is clicked.
 * @component
 */
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
