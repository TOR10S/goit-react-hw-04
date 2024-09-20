import axios from 'axios';

export const fetchArticles = async (query, page = 1) => {
    const { data } = await axios.get(`https://api.unsplash.com/search/photos/`, {
      params: {
        client_id: 'FZK5K8CibqNmzzFrZMI9trJWic4JElwNhSKQb-6L8Jk',
        query: query,
        page: page,
        per_page: 12, 
      },
    });
    return data;
}