import { useEffect, useRef } from "react";

/**
 * useDataSender Hook
 * Sends data at a specified frame rate (default 30fps).
 * @param callback Function to execute at each frame.
 * @param fps Frames per second (default: 30).
 */
export const useDataSender = (callback: () => void, fps: number = 30) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const interval = 1000 / fps; // Calculate interval in milliseconds
    const id = setInterval(() => {
      callbackRef.current(); // Execute the callback
    }, interval);

    return () => clearInterval(id); // Cleanup interval on unmount
  }, [fps]);
};
