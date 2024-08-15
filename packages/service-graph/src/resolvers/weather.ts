import { requestWeatherByZip } from "../../../util-conditions";

export async function getWeatherResolver(
  _parent: any,
  input: { zip: number },
  _context: any,
) {
  const result = await requestWeatherByZip(input.zip);
  return result;
}
