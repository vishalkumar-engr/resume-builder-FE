import axios from "axios";

export const getToken = () => {
  const token = localStorage.getItem("Authorization");

  if (token) {
    return `Bearer ${localStorage.getItem("Authorization")}`;
  } else {
    if (window.location.href !== "http://localhost:3000/") {
      window.location.href = "http://localhost:3000/";
      return;
    }
  }
};

export const postAjaxCall = async (apiUrl, payLoad) => {
  const obj = {
    data: "",
    error: "",
  };
  try {
    const response = await axios.post(apiUrl, payLoad, {
      headers: {
        Authorization: getToken(),
      },
    });
    obj.data = response.data;
    return obj;
  } catch (error) {
    obj.error = error;
    return obj;
  }
};

export const putAjaxCall = async (apiUrl, payLoad) => {
  const obj = {
    data: "",
    error: "",
  };
  try {
    const response = await axios.put(apiUrl, payLoad, {
      headers: {
        Authorization: getToken(),
      },
    });
    obj.data = response.data;
    return obj;
  } catch (error) {
    obj.error = error;
    return obj;
  }
};

export const postAjaxCallWithoutToken = async (apiUrl, payLoad) => {
  const obj = {
    data: "",
    error: "",
  };
  try {
    const response = await axios.post(apiUrl, payLoad);
    obj.data = response.data;
    return obj;
  } catch (error) {
    obj.error = error;
    return obj;
  }
};

export const getAjaxCall = async (apiUrl) => {
  const obj = {
    data: "",
    error: "",
  };
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: getToken(),
      },
    });
    obj.data = response.data;
    return obj;
  } catch (error) {
    obj.error = error;
    return obj;
  }
};
