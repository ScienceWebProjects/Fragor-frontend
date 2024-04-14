// libs
import { RequestFetchType } from 'utils/types';

// hooks

// components

// data

// utils

interface fetchDataProps {
  requestOptions: RequestFetchType;
  api: string;
}

const fetchData = async ({ api, requestOptions }: fetchDataProps) => {
  try {
    const { body, headers, method } = requestOptions;

    const requestBody = typeof body === 'object' ? JSON.stringify(body) : body;

    const requestHeaders = new Headers(headers || {});

    const response = await fetch(api, {
      method: method,
      headers: requestHeaders,
      body: requestBody,
    });

    if (response.status >= 200 && response.status < 300) {
      console.log(`Success fetchData! Status: ${response.status}`);
      return { sucsess: true, response: response };
    }

    // throw new Error(`Error: ${response.status}`);
  } catch (error) {
    console.error('Fetch error:', error);

    // throw error;
  }
};

export default fetchData;
