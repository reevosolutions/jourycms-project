"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_INTEGRATIONS = void 0;
/**
 * @since 11-11-2023 22:46:59
 */
const APP_INTEGRATIONS = {
    google_sheet: {
        id: 'google_sheet',
        name: 'Google Sheet',
        description: 'Connect and create your Google Sheets with us, so you can track incoming orders in realtime',
        enabled: true,
        hide: false,
        version: '1.0.0',
        is_beta: false,
        logo: '/integrations/sheet-optimized-cleaned.svg',
        usage_guide: 'https://youtu.be/UD0Rcn5qnYE'
    },
    shopify: {
        id: 'shopify',
        name: 'Shopify',
        description: 'Link your Shopify store with us, every order created in Shopify will be added automatically in our system',
        enabled: true,
        hide: false,
        version: '1.0.0',
        is_beta: true,
        logo: '/integrations/shopify-optimized-cleaned.svg',
        usage_guide: 'https://youtu.be/KOrgqn-RWDQ',
    },
    woocommerce: {
        id: 'woocommerce',
        name: 'Woocommerce',
        description: 'Link your Woocommerce store with us, every order created in Woocommerce will be added automatically in our system',
        enabled: true,
        hide: false,
        version: '1.0.0',
        is_beta: true,
        logo: '/integrations/woocommerce-optimized-cleaned.svg',
        usage_guide: 'https://youtu.be/6WGpVYJvQg8',
    },
    youcan: {
        id: 'youcan',
        name: 'YouCan',
        description: 'Link your Youcan store with us, every order created in Youcan will be added automatically in our system',
        enabled: false,
        hide: false,
        version: '1.0.0',
        is_beta: true,
        logo: '/integrations/youcan.png',
        usage_guide: '',
    },
    ecomanager: {
        id: 'ecomanager',
        name: 'Ecomanager',
        description: 'Ecomanager Integration',
        enabled: false,
        hide: true,
        version: '1.0.0',
        is_beta: true,
        logo: '/integrations/ecomanager.png',
        usage_guide: '',
    },
};
exports.APP_INTEGRATIONS = APP_INTEGRATIONS;
//# sourceMappingURL=integration.constants.js.map