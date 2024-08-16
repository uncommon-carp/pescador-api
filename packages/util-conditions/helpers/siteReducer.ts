// This function is for creating a custom array of USGS sites to return to the client
// after the user searches for all sites within a bounding box. It's aim is to normalize and simplify the data
// the client receives.

type Site = {
  name: string;
  usgsId: string;
  lat: string;
  lon: string;
  gageHt?: number;
};

type StreamSite = Site & {
  flowRate?: number;
};

export default function siteReducer(data) {
  const lakes: Site[] = [];
  const streams: StreamSite[] = [];

  data.forEach((site) => {
    const { siteName, siteCode, geoLocation } = site.sourceInfo;
    const { latitude, longitude } = geoLocation.geogLocation;
    const gageHtOrFlowRate = site.values[0].value[0].value;
    const usgsId = siteCode[0].value;

    const siteData = {
      name: siteName,
      usgsId,
      lat: latitude,
      lon: longitude,
    };

    if (site.sourceInfo.siteProperty[0].value === "LK") {
      lakes.push({ ...siteData, gageHt: gageHtOrFlowRate });
    } else {
      const isGageHeight = site.variable.variableName[0] === "G";
      const key = isGageHeight ? "gageHt" : "flowRate";
      let existingStream = streams.find((stream) => stream.name === siteName);

      if (existingStream) {
        existingStream[key] = gageHtOrFlowRate;
      } else {
        streams.push({ ...siteData, [key]: gageHtOrFlowRate });
      }
    }
  });

  return { streams, lakes };
}
