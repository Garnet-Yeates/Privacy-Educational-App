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

// Any re-render of a 'Ripple' component will use a new key for the inner HTML element, which means effectively a new separate ripple effect starts
// With this in mind it is good practice to place Ripples inside memoized components (e.g MaterialCheckbox) so the ripple only happens when state/props change
// Instead of when parents re-render the children. This is more of a personal note because these checkboxes are probs the only place I'll ever use ripples
// (and the ripples only show while 'rippling' is set to true which is rare in itself anyways so this memoization/re-ripple 'glitch' isn't really an issue)
// NOTE: this is also why I use useCallback inside of QACheckbox on the SurveyPage
// This means multiple can exist at a time (since AnimatePresence + exit animation makes them not disappear instantly)
let currRippleKey = 0;

let rippleVariants = {
    exit: {
        opacity: 0,
        transition: { duration: 0.3 },
    }
}

function Ripple({ active, checked }) {
    return (
        <AnimatePresence custom={checked}>
            {active && <motion.div key={++currRippleKey} className={"ripple-root"} style={{ opacity: 1 }} variants={rippleVariants} exit="exit">
                <span className="ripple" >
                    <span className="ripple-child"/>
                </span>
            </motion.div>}
        </AnimatePresence>
    )
}

export default React.memo(MaterialCheckbox);