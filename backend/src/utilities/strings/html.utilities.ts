import * as cheerio from 'cheerio';

export const extractRawTextFromHtml = (html: string): string => {
  const $ = cheerio.load(html);
  const text = $('body').text().trim();
  return text;
}
