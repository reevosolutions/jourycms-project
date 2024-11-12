import * as cheerio from 'cheerio';
export const extractRawTextFromHtml = (html) => {
    const $ = cheerio.load(html);
    const text = $('body').text().trim();
    return text;
};
//# sourceMappingURL=html.utilities.js.map