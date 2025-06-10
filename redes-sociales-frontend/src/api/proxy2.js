import axios from 'axios';

async function listProxies() {
  let config = {
    method: 'get',
    url: 'https://proxy.webshare.io/api/v2/proxy/list/?mode=direct&page=1&page_size=25',
    headers: {
      'Authorization': 'Token 3f67kkr3jzob24emwana5u4t1ro0s5yjhlzwu4bz',
    }
  };

  try {
    const res = await axios.request(config);
    const data = res.data;
    // Hacer algo con los datos
    return data;
  } catch (error) {
    console.error(error);
    // Manejar el error
  }
}

export default listProxies;

