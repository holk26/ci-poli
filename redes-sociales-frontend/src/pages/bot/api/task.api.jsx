import axios from "axios";
import config from "../../../config";
import FormData from "form-data";

export const getViewTasks = async (fecha) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}view_tasks/?start_date=${fecha}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    return [true, response.data];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [false, error];
  }
};

export const getViewPlataforma = async (platformId) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}task_types/?platform_id=${platformId}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    return [true, response.data];
  } catch (error) {
    console.error("Error fetching task types:", error);
    return [false, error];
  }
};

export const getSocialMediaPlatforms = async () => {
  try {
    const response = await axios.get(
      `${config.apiUrl}social_media_platforms/`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    return [true, response.data];
  } catch (error) {
    console.error("Error fetching social media platforms:", error);
    return [false, error];
  }
};

export const createTasksForAllAccounts = async (
  taskTypeId,
  social_media_accounts,
  custom_task
) => {
  try {
    const response = await axios.post(
      `${config.apiUrl}generate_tasks/create_tasks_for_all_accounts/${social_media_accounts}`,
      {
        task_type_id: taskTypeId,
        custom_task: custom_task,
      }
    );
    return [true, response.data];
  } catch (error) {
    console.error("Error creating tasks:", error);
    return [false, error];
  }
};

export const getOwner = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}account_owners`);
    return [true, response.data];
  } catch (error) {
    console.error("Error creating tasks:", error);
    return [false, error];
  }
};

export const getPlatform = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}social_media_platforms/`);
    return [true, response.data];
  } catch (error) {
    console.error("Error creating tasks:", error);
    return [false, error];
  }
};

export const getSocialMediaAccount = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}social_media_accounts/`);
    return [true, response.data];
  } catch (error) {
    console.error("Error creating tasks:", error);
    return [false, error];
  }
};
export const getPersonalityBots = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}bot_personalities/`);
    return [true, response.data];
  } catch (error) {
    console.error("Error creating tasks:", error);
    return [false, error];
  }
};

export const deleteTaskBot = async (botId) => {
  try {
    const response = await axios.delete(`${config.apiUrl}task_bots/${botId}/`, {
      headers: {
        accept: "application/json",
      },
    });
    return [true, response.data];
  } catch (error) {
    console.error("Error deleting task bot:", error);
    return [false, error];
  }
};

export const uploadFileImge = async (files) => {
  try {
    const formData = new FormData();
    console.log(files);
    // Añadir cada archivo a FormData
    for (let i = 0; i < files.length; i++) {
      formData.append("imagen2", files[i]);
    }

    const response = await axios.post(
      "https://aztecaimagenes.online/subirImagenFiltro",
      formData
    );
    console.info("Respuesta del servidor:", response.data);
    return response;
  } catch (error) {
    console.error("Error al cargar archivos:", error);
  }
};

export const analyzeImage = async (url, prompt) => {
  try {
    const response = await axios.post(`${config.apiUrl}openai/image/anality/`, {
      url: url,
      prompt: prompt,
    });
    return [true, response.data];
  } catch (error) {
    console.error("Error al analizar la imagen:", error);
    return [false, error];
  }
};

export const obtenerImagen = async (query) => {
  try {
    const response = await axios.post(
      `https://aztecaimagenes.online/obtenerImg/?q=${encodeURIComponent(query)}`
    );
    return [true, response.data];
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
    return [false, error];
  }
};

export const deleteImage = async (imageUrl) => {
  try {
    const response = await axios.delete(
      `https://aztecaimagenes.online/deleteImgBotRedesSociales/?imageUrl=${encodeURIComponent(
        imageUrl
      )}`
    );
    return [true, response.data];
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    return [false, error];
  }
};
