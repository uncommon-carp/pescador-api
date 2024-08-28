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

export const usgsMultipleMock: UsgsResponse = {
  value: {
    timeSeries: [
      {
        sourceInfo: {
          siteName: "River Station",
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
      {
        sourceInfo: {
          siteName: "Lake Station",
          siteCode: [{ value: "67890", agencyCode: "NWIS" }],
          geoLocation: {
            geogLocation: {
              latitude: 34.1234,
              longitude: -118.1234,
            },
          },
          siteProperty: [
            {
              value: "LK",
              name: "siteTypeCd",
            },
          ],
        },
        variable: {
          variableCode: [{ value: "00065" }],
          variableName: "Gage height, ht",
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
