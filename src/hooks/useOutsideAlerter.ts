import { useEffect, useRef } from "react";

export const useOutsideAlerter = (onOutsideClick: () => void) => {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(event: Event) {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onOutsideClick]);

  return ref;
};
