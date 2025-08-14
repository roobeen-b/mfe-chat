"use client";
import { useEffect, useState } from "react";

// * Use this hook to safely render UI components only when they are mounted on the client side.
export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
};
