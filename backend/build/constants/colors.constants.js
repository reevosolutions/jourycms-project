"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELIVERY_RATE_SUCCESS_CATEGORY_COLORS = exports.getSystemColor = exports.generateGreenBluePalette = exports.COLORS_SCALE_58_BLUE_GREEN = exports.COLORS_SCALE_10_VIVID = exports.COLORS_SCALE_58_VIVID = exports.COLORS_SCALE_10_AQUARELLE = exports.COLORS_SCALE_58_AQUARELLE = exports.RAINBOW_AQUARELLE_COLORS = exports.RAINBOW_VIVID_COLORS = void 0;
const chroma_js_1 = __importDefault(require("chroma-js"));
exports.RAINBOW_VIVID_COLORS = [
    '#FF3333', // Red
    '#FFA500', // Orange
    '#FFFF00', // Yellow
    '#00FF00', // Green
    '#0000FF', // Blue
    '#8A2BE2' // Indigo
];
exports.RAINBOW_AQUARELLE_COLORS = [
    '#E57373', // Red
    '#FFB74D', // Orange
    '#FFF176', // Yellow
    '#AED581', // Green
    '#4FC3F7', // Blue
    '#9575CD' // Indigo
];
exports.COLORS_SCALE_58_AQUARELLE = chroma_js_1.default.scale(exports.RAINBOW_AQUARELLE_COLORS).mode('lch').colors(58);
exports.COLORS_SCALE_10_AQUARELLE = chroma_js_1.default.scale(exports.RAINBOW_AQUARELLE_COLORS).mode('lch').colors(10);
exports.COLORS_SCALE_58_VIVID = chroma_js_1.default.scale(exports.RAINBOW_VIVID_COLORS).mode('lch').colors(58);
exports.COLORS_SCALE_10_VIVID = chroma_js_1.default.scale(exports.RAINBOW_VIVID_COLORS).mode('lch').colors(10);
const startColor = '#2bcf91';
// const endColor = '#2b81cf';
const endColor = '#2b4dcf';
exports.COLORS_SCALE_58_BLUE_GREEN = chroma_js_1.default.scale([startColor, endColor]).mode('lch').colors(58);
const generateGreenBluePalette = (count) => {
    return chroma_js_1.default.scale([startColor, endColor]).mode('lch').colors(count);
};
exports.generateGreenBluePalette = generateGreenBluePalette;
const getSystemColor = (key) => {
    console.log('getSystemColor.key', key);
    const mappedColors = {
        default: { default: "#A0AEC0" },
        shipment_type: {
            economic: "#3182CE",
            express: "#E53E3E",
            freight: "#ECC94B",
        },
        type: {
            classic: "#4cc9f0",
            ecommerce: "#4361ee",
            b2b: "#7209b7",
            internal: "#ea9ab2",
        },
        sub_type: {
            normal: "#79dabf",
            with_acknowledgement: "#ffb627",
            acknowledgement: "#ffc971",
            with_exchange: "#9163cb",
            exchange: "#c19ee0",
        },
        shipment_at: {
            home: "#1d4e89",
            desk: "#00b2ca",
            specifications: "#7dcfb6",
            submission: "#9f86c0",
            with_acknowledgement: "#f79256",
        },
        store_id: {},
        parcel_statues_grouped: {
            // in_preparation: "#e9b752",
            in_preparation: "#facc15",
            processing: "#38bdf8",
            delivered: "#4ade80",
            returning: "#fb923c",
            returned: "#f87171",
            return: "#f87171",
        }
    };
    let color = mappedColors.default.default;
    Object.keys(mappedColors).forEach((mappedColorKey) => {
        if (mappedColors[mappedColorKey][key]) {
            color = mappedColors[mappedColorKey][key];
        }
    });
    return color;
};
exports.getSystemColor = getSystemColor;
exports.DELIVERY_RATE_SUCCESS_CATEGORY_COLORS = {
    "excellent": "#4CAF50",
    "very_good": "#8BC34A",
    "good": "#CDDC39",
    "fair": "#FFEB3B",
    "needs_improvement": "#FF9800",
    "poor": "#F44336"
};
//# sourceMappingURL=colors.constants.js.map