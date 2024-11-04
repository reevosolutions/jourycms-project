import { customAlphabet } from "nanoid";
import config from "../../config";
import {
  ITEM_SHORTCUTS,
  type TShortcutEntities,
} from "../../constants/tracking_id.constants";
import { ExportItem } from "../../models/export-item.model";
import initLogger from "../logging";
import { Model } from "mongoose";

const suffixLength = config.settings.tracking.suffixLength;

const alphabet = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, suffixLength);
const oneLetterNanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 1);
const otherCharactersNanoid = customAlphabet(alphabet, suffixLength - 1);

const logger = initLogger("UTILITY", "TRACKING_ID");

/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 27-02-2024 21:13:56
 */
const createTrackingId: (
  entity: TShortcutEntities,
  model?: Model<{
    [StringKey: string]: any;
    [NumberKey: number]: any;
  }>,
  custom_prefix?: string | null,
  parent_tracking_id?: string | null
) => Promise<string> = async (
  entity,
  model = null,
  custom_prefix = null,
  parent_tracking_id = null
) => {
  let idUsed = true;
  let id = "",
    itemsFound;
  while (idUsed) {
    const tracking_part = isTrackingId(parent_tracking_id)
      ? parent_tracking_id.split("-")[1]
      : null;
    id = `${custom_prefix ? custom_prefix : ITEM_SHORTCUTS[entity]}-${
      tracking_part
        ? tracking_part
        : `${oneLetterNanoid()}${otherCharactersNanoid()}`
    }`;
    logger.value("Trying to use tracking_id with params", {
      entity,
      id,
      custom_prefix,
      parent_tracking_id,
    });
    switch (entity) {
      case "export":
        itemsFound = await ExportItem.countDocuments({ tracking_id: id });
        break;
      default:
        itemsFound = model
          ? await model.countDocuments({ tracking_id: id })
          : false;
        break;
    }
    if (!itemsFound) {
      idUsed = false;
    }
  }

  return id;
};

export const isTrackingId = (str: string): false | string => {
  if (!str?.length) return false;
  str = str.trim().toUpperCase();
  if (str.match(/^([A-Z]{3}-[A-Z0-9]{6,10})$/g)) return str;
  if (str.startsWith("INB-")) return str;
  if (str.startsWith("OTB-")) return str;
  return false;
};

/**
 * This function is used to get the entity from the tracking id
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 29-03-2024 23:26:49
 * @param {string} tracking_id
 * @returns {false | TShortcutEntities}
 */
export const detectEntityFromTrackingID = (
  tracking_id: string,
  opt: {
    customPrefixes?: {
      [prefix: string]: TShortcutEntities;
    };
  } = {}
): false | TShortcutEntities => {
  if (!tracking_id) return false;

  const prefix = tracking_id.substring(0, 3);
  let entity: false | TShortcutEntities = false;

  if (opt.customPrefixes && Object.keys(opt.customPrefixes).length) {
    for (let i = 0; i < Object.keys(opt.customPrefixes).length; i++) {
      const key = Object.keys(opt.customPrefixes)[i] as string;
      if (key === prefix) {
        entity = opt.customPrefixes[key];
        break;
      }
    }
  }
  if (entity) return entity;

  for (const [key, value] of Object.entries(ITEM_SHORTCUTS)) {
    if (tracking_id.startsWith(value)) {
      return key as Levelup.V2.SystemStructure.Services.Models.AllModels;
    }
  }

  return entity;
};


export { createTrackingId };
