import { useState } from "react";

function MaterialInput({ state, setState, label, size }) {

    const [focused, setFocused] = useState(false);

    return (
        // Material input container will be position relative with the input inside it. The ::before makes the border bottom, and the ::after makes the animated border
        <div className={"material-input-container" + (focused ? " active" : "")}>
            <input size={size || 16} className="material-input" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={label} value={state} onChange={({ target: { value } }) => setState(value)} />
        </div>
    )
}

export default MaterialInput;