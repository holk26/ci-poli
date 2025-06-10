import axios from "axios";

async function getProxy() {
  const response = await axios.get(
    "https://proxy.webshare.io/api/v2/proxy/list/?mode=direct&page=1&page_size=1",
    {
      headers: {
        Authorization: "Token 3f67kkr3jzob24emwana5u4t1ro0s5yjhlzwu4bz",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(`La solicitud falló con estado: ${response.status}`);
  }

  return response.data;
}

export default getProxy;
