import config from "../../config";
import { ITEM_SHORTCUTS, } from "../../constants/tracking_id.constants";
import initLogger from "../logging";
const suffixLength = config.settings.tracking.suffixLength;
const logger = initLogger("UTILITY", "TRACKING_ID");
async function getNanoid() {
    const { customAlphabet } = await import('nanoid');
    const alphabet = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nanoid = customAlphabet(alphabet, suffixLength);
    const oneLetterNanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 1);
    const otherCharactersNanoid = customAlphabet(alphabet, suffixLength - 1);
    return { nanoid, oneLetterNanoid, otherCharactersNanoid };
}
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 27-02-2024 21:13:56
 */
const createTrackingId = async (entity, model = null, custom_prefix = null, parent_tracking_id = null) => {
    const { nanoid, oneLetterNanoid, otherCharactersNanoid } = await getNanoid();
    let idUsed = true;
    let id = "", itemsFound;
    while (idUsed) {
        const tracking_part = isTrackingId(parent_tracking_id)
            ? parent_tracking_id.split("-")[1]
            : null;
        id = `${custom_prefix ? custom_prefix : ITEM_SHORTCUTS[entity]}-${tracking_part
            ? tracking_part
            : `${oneLetterNanoid()}${otherCharactersNanoid()}`}`;
        logger.value("Trying to use tracking_id with params", {
            entity,
            id,
            custom_prefix,
            parent_tracking_id,
        });
        switch (entity) {
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
export const isTrackingId = (str) => {
    if (!(str === null || str === void 0 ? void 0 : str.length))
        return false;
    str = str.trim().toUpperCase();
    if (str.match(/^([A-Z]{3}-[A-Z0-9]{6,10})$/g))
        return str;
    if (str.startsWith("INB-"))
        return str;
    if (str.startsWith("OTB-"))
        return str;
    return false;
};
export { createTrackingId };
//# sourceMappingURL=tracking-id.utilities.js.map