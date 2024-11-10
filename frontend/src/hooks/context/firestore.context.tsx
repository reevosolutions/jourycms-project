import { createContext } from "react";

export type FirestoreContextProps = {};

const PricingContext = createContext<FirestoreContextProps>({});

export default PricingContext;
