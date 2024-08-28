import { requestWeatherByZip } from "@pescador-api/util-conditions";

export async function getWeatherResolver(
  _parent: any,
  input: { zip: string },
  _context: any,
) {
  const result = await requestWeatherByZip(input.zip);
  console.log({ result });
  return result;
}
