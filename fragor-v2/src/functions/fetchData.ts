// libs
import { RequestFetchType } from 'utils/types';

interface fetchDataProps {
  requestOptions: RequestFetchType;
  api: string;
}

const fetchData = ({
  api,
  requestOptions,
}: fetchDataProps): Promise<{ success: boolean; response?: any }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { body, headers, method } = requestOptions;

      const requestBody =
        typeof body === 'object' ? JSON.stringify(body) : body;

      const requestHeaders = new Headers(headers || {});

      const response = await fetch(api, {
        method: method,
        headers: requestHeaders,
        body: requestBody,
      });

      if (response.status >= 200 && response.status < 300) {
        console.log(`Success fetchData! Status: ${response.status}`);

        const text = await response.text();
        const fetchResponse = text ? JSON.parse(text) : null;

        resolve({ success: true, response: fetchResponse });
      } else {
        reject(console.error(`Fetch error: ${response.status}`));
      }
    } catch (error) {
      console.error('Fetch error: \n', error);
      reject(console.error(error));
    }
  });
};

export default fetchData;
