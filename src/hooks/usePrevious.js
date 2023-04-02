import { useEffect, useRef } from "react";

export default function usePrevious(someState) {

  // usePrevious called every render, but useRef() remembers values between renders
  const ref = useRef();

  // This effect updates the ref whenever someState changes.
  useEffect(() => {
    ref.current = someState;
  }, [someState]); 
  
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}