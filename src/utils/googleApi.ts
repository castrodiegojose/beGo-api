import axios from "axios";
import config from "../config/default";

export interface ICoordenates {
    latitude: number;
    longitude: number;
}

export async function getCoordinatesForPlaceId(placeId: string):Promise<ICoordenates | null> {
    const apiKey = config.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
   
    const response = await axios.get(url).catch(err => { console.error(err); });
    if (response?.status !== 200) return null;
    
    const { data } = response;
    const coordenates = {
        longitude: data.result.geometry.location.lng,
        latitude: data.result.geometry.location.lat
       };
    return coordenates; 
}


export async function calculateRouteDistance(origin:string, destination:string):Promise<string | null> {
    
    const apiKey = config.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
    
    const response = await axios.get(url).catch(err => { console.error(err); });
    if (response?.status !== 200) return null;
    const { data } = response;
    const distancia = data.rows[0].elements[0].distance.text;

    return distancia;
}
