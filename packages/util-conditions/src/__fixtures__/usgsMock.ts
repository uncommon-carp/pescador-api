import { UsgsResponse } from "@pescador-api/interfaces-conditions";

const date = new Date().toISOString();

export const usgsSingleSiteMock: UsgsResponse = {
  value: {
    timeSeries: [
      {
        sourceInfo: {
          siteName: "Station Name",
          siteCode: [{ value: "12345", agencyCode: "NWIS" }],
          geoLocation: {
            geogLocation: {
              latitude: 34.1234,
              longitude: -118.1234,
            },
          },
          siteProperty: [
            {
              value: "ST",
              name: "siteTypeCd",
            },
          ],
        },
        variable: {
          variableCode: [{ value: "00060" }],
          variableName: "Streamflow ft3/s",
        },
        values: [
          {
            value: [
              {
                value: "15.7",
                dateTime: date,
              },
            ],
          },
        ],
      },
    ],
  },
};
