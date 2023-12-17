export const getUsgsStationById = (id: string) => {
  return {
    name: "Test",
    id,
    lat: 10.5,
    lon: 10.5,
    values: { flow: { timestamp: "101010", value: 10.5 } },
  };
};
