/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */
import { Response, Router } from "express";

export function respond<T>(
  res: Response,
  data: T,
  status: number = 200
): void {
  res.status(status).json(data);
}

export function fixFiltersObject(filters?: any): any {
  if (!filters) return {};
  if (typeof filters === "string") {
    try {
      return JSON.parse(filters);
    } catch (e) {
      return {};
    }
  }
  return filters;
}

export function requestHasParam<P extends object>(
  payload: P,
  param: keyof P
): boolean {
  if (!payload) return false;
  return (
    Object.keys(payload).includes(param as string) &&
    payload[param] !== undefined &&
    payload[param] !== null &&
    (!Array.isArray(payload[param]) || (payload[param] as any).length > 0)
  );
}
