import axios from "axios";

type Method = 'weather' | 'finance';

export async function getDataApi(method: Method, url: string) {
  switch (method) {
    case 'weather':
      try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
      } catch (err) {
        console.error(err.message);
        return undefined;
      }
    case 'finance':
      return 'its nort ready function';
    
    default: 'hello';
  }
}