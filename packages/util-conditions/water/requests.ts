import axios from "axios";
import stationSort from "../helpers/stationSort";
import { Station } from "@pescador-api/interfaces-conditions";

interface StationQueryInput {
  site: string;
  range: number;
}

const url = "http://waterservices.usgs.gov/nwis/iv";

export async function requestStationById(
  input: StationQueryInput,
): Promise<Station> {
  const { site, range } = input;
  const params = {
    format: "JSON",
    sites: site,
    siteStatus: "active",
    period: `P${range}D`,
  };

  const resp = await axios({
    method: "get",
    url,
    params,
  });

  return {
    name: resp.data.value.timeSeries[0].sourceInfo.siteName,
    id: resp.data.value.timeSeries[0].sourceInfo.siteCode[0].value,
    lat: resp.data.value.timeSeries[0].sourceInfo.geoLocation.geogLocation
      .latitude,
    lon: resp.data.value.timeSeries[0].sourceInfo.geoLocation.geogLocation
      .longitude,
    values: stationSort(resp.data.value.timeSeries),
  };
}
