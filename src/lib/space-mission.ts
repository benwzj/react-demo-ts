import axios from 'axios';

const spaceMissionURL = import.meta.env.VITE_JSONSERVER_URL;

export const FetchLaunchPads = async () => {
  const response = await axios.get(spaceMissionURL + '/launchpads');
  console.log(response);
  return response.data;
};
export const FetchLaunchs = async () => {
  const response = await axios.get(spaceMissionURL + '/launches');
  console.log(response); 
  return response.data;
};
