import {TMiqatRole} from "../config";

export const canEditHisProfile = (
  currentUser:
    | (Omit<Levelup.CMS.V1.Users.Entity.ExposedUser, "role"> & {
        role: TMiqatRole;
      })
    | null,
) => {
  return ["agency", "doctor", "escort"].includes(currentUser?.role || "");
};
