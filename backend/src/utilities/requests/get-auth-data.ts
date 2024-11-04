/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 28-02-2024 17:16:53
 */

import { Request } from "express";
import {
  getCompanySnapshot,
  getOfficeSnapshot,
  getUserSnapshot,
} from "../entities/snapshots.utilities";
import { fixFiltersObject } from "../requests";
import Container from "typedi";
import CacheManager from "../../managers/cache-manager";

export const getRequestCurrentAssignments = async (req: Request) => {
  const result: Levelup.V2.Security.AuthData["attributed"] = {
    company: null,
    store: undefined,
    office: null,
    address: null,
    user: null,
    deliverer: null,
  };

  const body: Levelup.V2.Shipping.Api.Parcels.ChangeParcelStatus.Request =
    req.body;

  // user
  if (req.attached_entities.user?._id) {
    result.user = getUserSnapshot(req.attached_entities.user);
  }

  // deliverer
  if (req.attached_entities.user?.role_group === "deliverers") {
    result.deliverer = getUserSnapshot(req.attached_entities.user);
  }

  // address & office
  if (req.attached_entities.office?._id) {
    result.office = getOfficeSnapshot(req.attached_entities.office);
    result.address = req.attached_entities.office.address;
  }
  // else if (body.data?.current_office as Levelup.V2.Utils.Common.ID) {
  //   result.office = body.data?.current_office;

  // } else if ((body as any).starting_office) {
  //   result.office = (body as any).starting_office;
  //   result.address = (body as any).starting_office.address;
  // } else if ((body as any)?.snapshots?.current_address) {
  //   result.address = (body as any)?.snapshots?.current_address;
  // } else if ((body as any)?.snapshots?.starting_address) {
  //   result.address = (body as any)?.snapshots?.starting_address;
  // }

  // company

  let requestCompany;

  if (req.method === "GET" || req.method === "DELETE") {
    requestCompany = req.query.company;
    const filters = fixFiltersObject(req.query.filters);
    if (!requestCompany) requestCompany = filters.company;
  } else {
    requestCompany = req.body.company || (req.body.filters as any)?.company;
  }
  if (requestCompany) {
    const cache = Container.get(CacheManager);
    const company = await cache.companies.get(requestCompany);
    if (company) result.company = getCompanySnapshot(company);
  } else if (req.attached_entities.company?._id)
    result.company = req.attached_entities.company;

  return result;
};

export const getAuthData: (
  req: Request
) => Promise<Levelup.V2.Security.AuthData> = async (req: Request) => {
  return {
    attributed: await getRequestCurrentAssignments(req),
    current: req.attached_entities,
    req: () => req,
    isServiceRequest: () =>
      req.attached_entities.service?.name ? true : false,
  };
};
