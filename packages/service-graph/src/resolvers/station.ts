import { Station } from "@pescador-api/interfaces-conditions";

export const getStationResolver = (
  _parent: any,
  input: { id: string },
  _context: any,
): Station => {
  const { id } = input;
  return {
    name: "Test",
    usgsId: id,
    lat: 10,
    lon: 10,
    values: { flow: { timestamp: "111010", value: 10 } },
  };
};
