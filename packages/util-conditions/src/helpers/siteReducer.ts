// This function is for creating a custom array of USGS sites to return to the client
// after the user searches for all sites within a bounding box. It's aim is to normalize and simplify the data
// the client receives.

import { TimeSerial } from "@pescador-api/interfaces-conditions";
import { BulkStation, SingleStation } from "@pescador-api/service-graph";

export function siteReducer(data: TimeSerial[]): BulkStation {
  const lakes: SingleStation[] = [];
  const streams: SingleStation[] = [];

  data.forEach((site) => {
    const { siteName, siteCode, geoLocation } = site.sourceInfo;
    const { latitude, longitude } = geoLocation.geogLocation;
    const gageHtOrFlowRate = site.values[0].value[0].value;
    const usgsId = siteCode[0].value;

    const siteData = {
      __typename: "SingleStation" as const,
      name: siteName,
      usgsId,
      lat: String(latitude),
      lon: String(longitude),
    };

    if (site.sourceInfo.siteProperty[0].value === "LK") {
      lakes.push({ ...siteData, gageHt: Number(gageHtOrFlowRate) });
    } else {
      const isGageHeight = site.variable.variableName[0] === "G";
      const key = isGageHeight ? "gageHt" : "flowRate";
      let existingStream = streams.find((stream) => stream.name === siteName);

      if (existingStream) {
        existingStream[key] = Number(gageHtOrFlowRate);
      } else {
        streams.push({ ...siteData, [key]: Number(gageHtOrFlowRate) });
      }
    }
  });

  return { __typename: "BulkStation" as const, streams, lakes };
}
