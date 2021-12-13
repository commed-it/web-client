import Cookies from "universal-cookie";
import configData from "./config.json";

export function getTokenFromSession() {
  const cookies = new Cookies();
  const sid = cookies.get("USER-SESSION") || "";
  if (sid) {
    return sid.key;
  }
  return sid;
}

export function sessionExist() {
  const cookies = new Cookies();
  const sid = cookies.get("USER-SESSION") || "";
  if (sid) {
    return true;
  }
  return false;
}

export async function get(endpoint, auth) {
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (auth) {
    headers["Authorization"] = "Token " + getTokenFromSession();
  }
  return await fetch(configData.SERVER_URL + endpoint, {
    method: "GET",
    headers: headers,
  });
}

export async function post(endpoint, data, auth) {
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (auth) {
    headers["Authorization"] = "Token " + getTokenFromSession();
  }
  return await fetch(configData.SERVER_URL + endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: headers,
  });
}

export async function put(endpoint, data) {
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  headers["Authorization"] = "Token " + getTokenFromSession();
  return await fetch(configData.SERVER_URL + endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: headers,
  });
}

export async function patch(endpoint, data) {
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  headers["Authorization"] = "Token " + getTokenFromSession();
  return await fetch(configData.SERVER_URL + endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: headers,
  });
}

export async function remove(endpoint) {
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  headers["Authorization"] = "Token " + getTokenFromSession();
  return await fetch(configData.SERVER_URL + endpoint, {
    method: "DELETE",
    headers: headers,
  });
}

export function untilTherteeChars(description) {
  while (description.length <= 47) {
    description += " ";
  }
  return description;
}

export function convertBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}