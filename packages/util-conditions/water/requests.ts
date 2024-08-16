import axios from "axios";
import stationSort from "../helpers/stationSort";
import {
  Station,
  StationQueryInput,
  UsgsResponse,
} from "@pescador-api/interfaces-conditions";

const url = "http://waterservices.usgs.gov/nwis/iv";

export async function requestStationById(
  input: StationQueryInput,
): Promise<Station> {
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
      lat: resp.data.value.timeSeries[0].sourceInfo.geoLocation.geogLocation
        .latitude,
      lon: resp.data.value.timeSeries[0].sourceInfo.geoLocation.geogLocation
        .longitude,
      values: stationSort(resp.data.value.timeSeries),
    };
  } catch (err) {
    console.log(err);
    throw new Error("Oops, something went wrong");
  }
}
