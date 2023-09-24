import { useState } from 'react';
export function useCounter() {
    const [count, setCount] = useState(0);

    const increment = async () => {
        //   setLoadingCount("increment");
        setCount(prevCount => parseInt(prevCount) + 1);
    };

    const decrement = async () => {
        //   setLoadingCount("decrement")
        setCount(prevCount => (parseInt(prevCount) > 0 ? parseInt(prevCount) - 1 : 0));
    };

    return [count, increment, decrement, setCount];
}
