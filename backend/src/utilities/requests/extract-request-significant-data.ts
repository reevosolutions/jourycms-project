/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 28-02-2024 17:16:53
 */

import { Request } from 'express';

interface RequestData {
  method: string;
  url: string;
  path: string;
  queryParameters: Request['query'];
  headers: Record<string, string | string[]>;
  body?: any;
  cookies: Record<string, string>;
  ipAddress: string;
  userAgent: string;
}

export const extractRequestSignificantData = (req: Request) => {
  const result: RequestData = {
    method: req.method,
    url: req.url,
    path: req.path,
    queryParameters: req.query,
    headers: req.headers,
    body: req.body,
    cookies: req.cookies,
    ipAddress: req.ip,
    userAgent: req.get('user-agent') || '',
  }

  return result;
}
