import { createContext, useContext } from "react";

export const StateContext = createContext(null);

export const useStateContext = useContext(StateContext);