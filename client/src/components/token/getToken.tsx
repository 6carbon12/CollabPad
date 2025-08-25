import { useContext } from "react";
import { TokenContext } from "./TokenContext";

export default function useToken() {
  const ctx = useContext(TokenContext);

  if (!ctx) {
    throw new Error('Context not found')
  }

  return ctx
}
