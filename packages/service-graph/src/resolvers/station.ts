import {
  BulkStationQueryInput,
  BulkStationQueryResult,
  Station,
  StationQueryInput,
} from "@pescador-api/interfaces-conditions";
import {
  requestStationById,
  requestStationsByBounding,
} from "@pescador-api/util-conditions";
import { BulkStation, StationWithRange } from "../types";

export async function getStationResolver(
  _parent: any,
  input: StationQueryInput,
  _context: any,
): Promise<StationWithRange> {
  const resp = await requestStationById(input);
  return resp;
}

export async function getBulkStationQuery(
  _parent: any,
  input: BulkStationQueryInput,
  _context: any,
): Promise<BulkStation> {
  const resp = await requestStationsByBounding(input);
  return resp;
}
