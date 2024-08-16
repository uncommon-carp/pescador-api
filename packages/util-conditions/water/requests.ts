import axios from "axios";
import stationSort from "../helpers/stationSort";
import {
  BulkStationQueryInput,
  BulkStationQueryResult,
  StationQueryInput,
  StationWithRange,
  UsgsResponse,
} from "@pescador-api/interfaces-conditions";
import { getZipCoords, getBoundingBox } from "../helpers";
import { siteReducer } from "../helpers";

const url = "http://waterservices.usgs.gov/nwis/iv";

export async function requestStationById(
  input: StationQueryInput,
): Promise<StationWithRange> {
  const { id, range } = input;
  const params = {
    format: "JSON",
    sites: id,
    siteStatus: "active",
    period: `P${range}D`,
  };

  try {
    const resp = await axios<UsgsResponse>({
      method: "get",
      url,
      params,
    });

    console.log(resp.data.value.timeSeries[0].values);
    return {
      name: resp.data.value.timeSeries[0].sourceInfo.siteName,
      usgsId: resp.data.value.timeSeries[0].sourceInfo.siteCode[0].value,
      lat: String(
        resp.data.value.timeSeries[0].sourceInfo.geoLocation.geogLocation
          .latitude,
      ),
      lon: String(
        resp.data.value.timeSeries[0].sourceInfo.geoLocation.geogLocation
          .longitude,
      ),
      values: stationSort(resp.data.value.timeSeries),
    };
  } catch (err) {
    console.log(err);
    throw new Error("Oops, something went wrong");
  }
}

export async function requestStationsByBounding(
  input: BulkStationQueryInput,
): Promise<BulkStationQueryResult> {
  const { zip } = input;
  const { lat, lng } = await getZipCoords(zip);
  const { west, north, south, east } = getBoundingBox(lat, lng);
  const params = {
    format: "JSON",
    bBox: `${west},${south},${east},${north}`,
    siteStatus: "active",
    siteType: "LK,ST",
  };
  try {
    const response = await axios<UsgsResponse>({
      method: "get",
      url,
      params,
    });
    return siteReducer(response.data.value.timeSeries);
  } catch (err) {
    throw new Error(`${err.message}`);
  }
}
