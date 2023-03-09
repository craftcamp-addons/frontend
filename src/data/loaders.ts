import {CORS_ORIGIN, server_url} from "./urls";

export const load_entities = (url: string): Promise<any> => {
    return fetch(server_url + url, {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": CORS_ORIGIN,
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
    }).then(response => response.json());
}
export const send_entities = (url: string, data: FormData): Promise<any> => {
    return fetch(server_url + url,
        {
            method: "POST",
            body: data,
            headers: {
                "Accept": "*/*",
                "Access-Control-Allow-Origin": CORS_ORIGIN,
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        }
    ).then(response => response.json());
}

export const delete_entities = (url: string, id: number): Promise<any> => {
    return fetch(server_url + url,
        {
            method: "DELETE",
            body: JSON.stringify({"id": id}),
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": CORS_ORIGIN,
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        }).then(response => response.json());
}