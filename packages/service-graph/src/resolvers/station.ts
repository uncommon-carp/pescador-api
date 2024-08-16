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

export async function getStationResolver(
  _parent: any,
  input: StationQueryInput,
  _context: any,
): Promise<Station> {
  const resp = await requestStationById(input);
  return resp;
}

export async function getBulkStationQuery(
  _parent: any,
  input: BulkStationQueryInput,
  _context: any,
): Promise<BulkStationQueryResult> {
  const resp = await requestStationsByBounding(input);
  return resp;
}
