
export const isEntityObject = (obj: any): obj is { _id: string } => {
  return obj && typeof obj === "object" && obj._id;
};
