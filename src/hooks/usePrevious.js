import { useEffect, useRef } from "react";

export default function usePrevious(someState) {

  // usePrevious will be called in our components every render, but useRef() memoizes a value so it remembers
  // it between renders.
  const ref = useRef();

  // This effect updates the ref whenever someState changes.
  useEffect(() => {
    ref.current = someState;
  }, [someState]); 
  
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}