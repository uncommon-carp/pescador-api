export const getStationResolver = (id: string) => {
  return {
    name: "Test",
    id,
    lat: 10,
    lon: 10,
    values: { flow: { timestamp: "111010", value: 10 } },
  };
};
