import axios from 'axios';

const API_key = '36085372-0e054a65c2dad8200a3139bdc';
const API_URL = 'https://pixabay.com/api/';

export const searchApi = async (searchValue, page) => {
  const response = await axios.get(API_URL, {
    params: {
      key: API_key,
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: '12',
      page: page,
    },
  });
  return response.data.hits;
};
