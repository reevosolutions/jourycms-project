import { defaults } from "../../utilities/helpers/utils.helpers";
import initLogger from "../../utilities/logging";

const logger = initLogger("MAPPER", "general");

interface HasLocationProperty {
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
}

export function hasLocationProperty(doc: any): doc is HasLocationProperty {
  return (
    doc &&
    doc.location &&
    doc.location.type === "Point" &&
    Array.isArray(doc.location.coordinates) &&
    doc.location.coordinates.length === 2
  );
}

export function transformLocationArrayToGeoJSON(
  coordinates: [number, number]
): { type: "Point"; coordinates: [number, number] } {
  return {
    type: "Point",
    coordinates,
  };
}

export function transformLocationGeoJSONToArray(location: {
  type: "Point";
  coordinates: [number, number];
} | [number, number]): [number, number] {
  return location instanceof Array ? location : location.coordinates;
}

export const mapDocumentToExposed = <T extends object & {push?: never}>(
  doc: T,
  opt: {
    omitTags?: boolean;
    omitUpdates?: boolean;
    omitAuthMeta?: boolean;
  } = {
      omitTags: false,
      omitAuthMeta: false,
      omitUpdates: true,
    }
): T => {
  opt = defaults(opt, {
    omitTags: false,
    omitAuthMeta: false,
    omitUpdates: true,
  });

  // logger.debug('mapDocumentToExposed.opt', opt);

  const result = { ...(doc["toObject"] ? (doc as any).toObject() : doc) };

  Reflect.deleteProperty(result, "search_meta_fuzzy");
  Reflect.deleteProperty(result, "__v");
  if (opt.omitAuthMeta) Reflect.deleteProperty(result, "auth_meta");
  if (opt.omitTags) Reflect.deleteProperty(result, "tags");
  if (opt.omitUpdates) Reflect.deleteProperty(result, "updates");

  Object.keys(result).forEach((key) => {
    if (
      (key.includes("password") || key.includes("salt")) &&
      typeof result[key] === "string"
    ) {
      Reflect.deleteProperty(result, key);
    }
  });

  if (hasLocationProperty(doc)) {
    result.location = doc.location.coordinates;
  }

  return result;
};

export default {
  mapDocumentToExposed,
};
