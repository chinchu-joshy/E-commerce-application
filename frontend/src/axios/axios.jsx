import axios from 'axios'
import { baseUrl,baseUrlAdmin } from '../Constants/Constants';

export const instance = axios.create({
    baseURL:  baseUrl
    
  });
  
export const instanceAdmin = axios.create({
    baseURL:  baseUrlAdmin
    
  });
  instanceAdmin.defaults.withCredentials=true;
  instance.defaults.withCredentials=true;