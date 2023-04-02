import { useEffect, useState } from 'react';
import { useCountUp } from 'use-count-up';
import '../scss/ColoredScoreCounter.scss';

// Adds some logic to the inner 'useCountUp' call. Allows it to have a delay between 'enabled' being set to
// true and 'setIsCounting' being set to true. (enabled true implies that setIsCounting is true, with a delay)
// Basically allows a delay to the start animation of useCountUp
// Delay is in seconds
function ColoredScoreCounter({ start, score, duration = 5, decimalPlaces = 0, delay = 0, enabled = true }) {

    const [isCounting, setIsCounting] = useState(false);
    const { value } = useCountUp({ isCounting: isCounting, start, end: score, duration, decimalPlaces })

    // Runs on the first render also whenever 'enabled' changes
    useEffect(() => {

        if (enabled) {
            setTimeout(() => setIsCounting(true), delay * 1000)
        } 
        if (!enabled) {
            setIsCounting(false);
        }

    }, [enabled])

    return (
        <span className="colored-score-counter" style={{ "--underline-color": `hsla(${Math.floor(value * 1.15)}, 90%, 50%, 0.5)` }}>
            {value}%
        </span>
    )
}

export default ColoredScoreCounter;