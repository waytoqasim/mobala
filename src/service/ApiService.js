import axios from "axios";


export const apiInterceptor = axios.create({
  baseURL: "https://api.mobala.ca", 
});

apiInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Request Config:', config); 
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

apiInterceptor.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Error Response:', error.response);
      if (error.response.status === 401) {
        window.location.href = '/login';
      }
    } else if (error.request) {
      console.error('No Response:', error.request);
    } else {
      console.error('General Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const apiInterceptorWrapper = (setLoading) => {
  apiInterceptor.interceptors.request.use(
    (config) => {
      setLoading(true); 
      const token = localStorage.getItem('authToken'); 
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      console.log('Request Config:', config); 
      return config;
    },
    (error) => {
      setLoading(false); 
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );

  apiInterceptor.interceptors.response.use(
    (response) => {
      setLoading(false); 
      console.log('Response:', response);
      return response;
    },
    (error) => {
      setLoading(false); 
      if (error.response) {
        console.error('Error Response:', error.response);
        if (error.response.status === 401) {
          window.location.href = '/login';
        }
      } else if (error.request) {
        console.error('No Response:', error.request);
      } else {
        console.error('General Error:', error.message);
      }
      return Promise.reject(error);
    }
  );
};