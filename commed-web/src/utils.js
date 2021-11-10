import Cookies from 'universal-cookie';
import configData from './config.json';

var headers ={
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

export function getTokenFromSession(){
    const cookies = new Cookies()
    const sid = cookies.get('USER-SESSION') || '';
    if (sid){
        return sid.key;
    }
    return sid;
}

export function sessionExist(){
    const cookies = new Cookies()
    const sid = cookies.get('USER-SESSION') || '';
    if (sid){
        return true;
    }
    return false;
}

export async function get(endpoint, auth){
    if (auth){
        headers['Authentication'] = 'Bearer ' + getTokenFromSession();
    }
    return await fetch(configData.SERVER_URL+endpoint,
    {
        method : 'GET',
        headers : headers
    });
}

export async function post(endpoint, data, auth){
    if (auth){
        headers['Authentication'] = 'Bearer ' + getTokenFromSession();
    }
    return await fetch(configData.SERVER_URL+endpoint,
    {
        method : 'POST',
        body : JSON.stringify(data),
        headers: headers
    });
}

export async function put(endpoint, data){
    headers['Authentication'] = 'Bearer ' + getTokenFromSession();
    return await fetch(configData.SERVER_URL+endpoint,
        {
            method : 'PUT',
            body : JSON.stringify(data),
            headers: headers
        });
}

export async function patch(endpoint, data){
    headers['Authentication'] = 'Bearer ' + getTokenFromSession();
    return await fetch(configData.SERVER_URL+endpoint,
        {
            method : 'PATCH',
            body : JSON.stringify(data),
            headers: headers
        });
}

export async function remove(endpoint){
    headers['Authentication'] = 'Bearer ' + getTokenFromSession();
    return await fetch(configData.SERVER_URL+endpoint,
        {
            method : 'DELETE',
            headers: headers
        });
}

