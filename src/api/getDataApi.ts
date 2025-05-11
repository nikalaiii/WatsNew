import axios from "axios";

export async function getDataApi(url: string) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err.message);
    return undefined;
  }
}
