export const REQUEST_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  
  export const API_BASE_URL =
    process.env.REACT_APP_API_URL || "http://51.20.103.211/";
  // process.env.REACT_APP_API_URL || "http://localhost:8000";
  export const API_SIGNIN = "/api/v1/customers/login";
  export const API_SIGNUP = "/api/v1/tenant/create"
  
  