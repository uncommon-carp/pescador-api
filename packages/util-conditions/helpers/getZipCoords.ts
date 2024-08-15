import axios from "axios";

export async function getZipCoords(postalCode: string) {
  const key = process.env.MAPQUEST_API_KEY;
  const params = { key, postalCode };
  try {
    const response = await axios.get(
      "http://www.mapquestapi.com/geocoding/v1/address",
      { params },
    );
    return {
      lat: response.data.results[0].locations[0].latLng.lat ?? "No result",
      lng: response.data.results[0].locations[0].latLng.lng ?? "No result",
    };
  } catch (err) {
    console.log("Error fetching from MapQuest", err.message);
    return "Error fetching coordinates";
  }
}
