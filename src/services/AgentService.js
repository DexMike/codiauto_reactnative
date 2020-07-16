// import AuthService from '../utils/AuthService';

//console.log('process.env', process.env);
// const API_ENDPOINT = "http://localhost:3000";
import AsyncStorage from "@react-native-community/async-storage";

const API_ENDPOINT = "http://10.0.2.2:3000";

function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => binary += String.fromCharCode(b));

  return window.btoa(binary);
}

class AgentService {
  static async getHeaders() {
    try {
      // if (AuthService.isNonAuthPath(path)) {
      //   return {
      //     'Content-Type': 'application/json',
      //   };
      // }
      const userInfo = await JSON.parse(
        await AsyncStorage.getItem("tempData")
      );
      if (userInfo.token) {
        return {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`// ,
          // 'Id-Token': idToken
        };
      }
      // const currentSession = await AuthService.refreshSession();
      return {
        "Content-Type": "application/json"// ,
        // Authorization: `Bearer ${currentSession.accessToken.jwtToken}`,
        // 'Id-Token': currentSession.idToken.jwtToken
      };
    } catch (err) {
      return {
        "Content-Type": "application/json"
      };
    }
  }

  static async get(path) {
    const input = `${API_ENDPOINT}${path}`;
    const headers = await this.getHeaders(path);
    // const headers = await this.getHeaders();
    const init = {
      method: "GET",
      headers,
    };
    const response = await fetch(input, init);
    if (response.status === 403) {
      throw new Error("Access Forbidden");
    }
    return response.json();
  }

  // static async getImage(path) {
  //   const input = `${API_ENDPOINT}${path}`;
  //   // const headers = await this.getHeaders(path);
  //   const headers = await this.getHeaders();
  //   const init = {
  //     method: "GET",
  //     headers,
  //   };
  //   const response = await fetch(input, init);
  //   if (response.status === 403) {
  //     throw new Error("Access Forbidden");
  //   }
  //   return response;
  // }

  // static async getPreLogin(path) {
  //   const input = `${API_ENDPOINT}${path}`;
  //   // const headers = await this.getHeaders(path, accessToken, idToken);
  //   const headers = await this.getHeaders();
  //   const init = {
  //     method: "GET",
  //     headers,
  //   };
  //   const response = await fetch(input, init);
  //   return response.json();
  // }

  static async getText(path) {
    const input = `${API_ENDPOINT}${path}`;
    const headers = await this.getHeaders(path);
    // const headers = await this.getHeaders();
    const init = {
      method: "GET",
      headers,
    };
    const response = await fetch(input, init);
    return response.text();
  }

  static async post(path, entity, json = true) {
    const input = `${API_ENDPOINT}${path}`;
    // const headers = await this.getHeaders();
    const headers = await this.getHeaders(path);
    const init = {
      method: "POST",
      headers,
      body: JSON.stringify(entity),
    };
    const response = await fetch(input, init);
    if (json) {
      return response.json();
    }
    return response;
  }

  static async put(path, entity) {
    const input = `${API_ENDPOINT}${path}`;
    const headers = await this.getHeaders(path);
    // const headers = await this.getHeaders();
    const init = {
      method: "PUT",
      headers,
      body: JSON.stringify(entity),
    };
    const response = await fetch(input, init);
    return response.json();
  }

  static async delete(path, entity) {
    const input = `${API_ENDPOINT}${path}`;
    const headers = await this.getHeaders(path);
    // const headers = await this.getHeaders();
    const init = {
      method: "DELETE",
      headers,
      body: JSON.stringify(entity),
    };
    const response = await fetch(input, init);
    return response.json();
  }
}

export default AgentService;
