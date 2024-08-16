import {
  Station,
  StationQueryInput,
} from "@pescador-api/interfaces-conditions";
import { requestStationById } from "@pescador-api/util-conditions";

export async function getStationResolver(
  _parent: any,
  input: StationQueryInput,
  _context: any,
): Promise<Station> {
  const resp = await requestStationById(input);
  return resp;
}
