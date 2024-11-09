import { createContext } from "react";

export type FirestoreContextProps = {
  subscribeParcelsInStatus: Levelup.V2.Features.Firestore.ParcelStatusSubscriber;
  mapParcelToFirestoreDocument?: Levelup.V2.Features.Firestore.ParcelMapper;
  setFirestoreParcel?: (
    parcel: Levelup.V2.Features.Firestore.ParcelDocument,
  ) => Promise<void>;
};

const PricingContext = createContext<FirestoreContextProps>({
  subscribeParcelsInStatus: async status => {},
});

export default PricingContext;
