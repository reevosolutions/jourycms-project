/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 28-02-2024 17:16:53
 */

import { Request } from "express";
import {
  getUserSnapshot
} from "../entities/snapshots.utilities";

export const getRequestCurrentAssignments = async (req: Request) => {
  const result: Levelup.CMS.V1.Security.AuthData["attributed"] = {
    user: null,
  };

  
  // user
  if (req.attached_entities.user?._id) {
    result.user = getUserSnapshot(req.attached_entities.user);
  }

  
  return result;
};

export const getAuthData: (
  req: Request
) => Promise<Levelup.CMS.V1.Security.AuthData> = async (req: Request) => {
  return {
    attributed: await getRequestCurrentAssignments(req),
    current: req.attached_entities,
    req: () => req,
    isServiceRequest: () =>
      req.attached_entities.service?.name ? true : false,
  };
};
