import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

function MaterialCheckbox({ checked, onChange, state, setState, className, ...otherProps }) {

    const [rippling, setRippling] = useState(false)

    if (checked !== undefined) {
        if (state !== undefined || setState !== undefined) {
            throw new Error("If using checked/onChange, you cannot supply the 'state'/'setState' props")
        }

        if (onChange === undefined && !otherProps.readOnly) {
            throw new Error("If onChange is left out, readonly must be supplied")
        }

        if (otherProps.readOnly && onChange !== undefined) {
            throw new Error("onChange cannot be supplied if readonly is supplied")
        }
    }
    else {
        if (otherProps.readOnly)
            throw new Error("readOnly can only be used with 'checked' prop. Don't use it with state/setState prop")

        if (state === undefined || setState === undefined) {
            throw new Error("If 'checked' prop is not supplied, you must supply 'state' and 'setState' props")

        }
    }

    let changer = undefined;
    if (!otherProps.readOnly) {
        changer = onChange ?? (() => setState(!state));
    }
    
    return (
        <div className={"material-checkbox-root" + (className ? ` ${className}` : "") + ((checked || state) ? " checked" : "")}>
            <input type="checkbox" className="absolute-input"
                onKeyDown={(e) => { e.key === " " && setRippling(true) }}
                onMouseDown={() => setRippling(true)} onMouseUp={() => setRippling(false)}
                onMouseLeave={() => setRippling(false)}
                onFocus={() => setRippling(true)}
                onBlur={() => setRippling(false)}
                checked={checked ?? state}
                onChange={changer}
                {...otherProps}
            />
            {(checked || state) && <svg className="checked" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckBoxIcon">
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
            </svg>}
            {!(checked || state) && <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckBoxOutlineBlankIcon">
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
            </svg>}

            <Ripple active={rippling} checked={(checked || state)} />
        </div>
    )
}

let currRippleKey = 0;

let rippleVariants = {
    exit: {
        opacity: 0,
        transition: { duration: 0.35 },
    }           
}

// Any re-render of a 'Ripple' component will use a new key for the inner HTML element, which means effectively a new separate ripple effect starts
// This means multiple can exist at a time (since AnimatePresence + exit animation makes them not disappear instantly)
// <RippleComponent> is memoized into <Ripple> so parent re-renders don't cause a new ripple effect to appear (i.e, 'active' or 'checked' must change)
// For a new ripple to appear
function RippleComponent({ active }) {

    return (
        <AnimatePresence>
            {active && <motion.div key={++currRippleKey} className="ripple-root" style={{ opacity: 1 }} variants={rippleVariants} exit="exit">
                <span className="ripple" >
                    <span className="ripple-child"/>
                </span>
            </motion.div>}
        </AnimatePresence>
    )
}

// Every time a <RippleComponent> renders, it will unmount remove the old ripple and mount a new one (notice how currRippleKey changes every render)
// We only want <RippleComponent> to re-render when 'active' or 'checked' (its props) change. This will prevent a weird issue where when a ripple is
// active (i.e showing), and its parent component re-renders, it unmounts and creates a new ripple. We want to avoid this behavoir so we memoize it
// Memoize ripple so that a new ripple
const Ripple = React.memo(RippleComponent);

export default MaterialCheckbox;