import {useEffect, useState} from "react";

function HelloWorld() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer); // очистка таймера
    }, []);

    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {time.toLocaleTimeString()}.</h2>
        </div>
    );
}

export default HelloWorld