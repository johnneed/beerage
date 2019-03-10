/**
 * Fetches Beer Data
 * @returns {Promise<Response>} - Beer data
 */

const base = 'https://6l36bf3ud0.execute-api.us-east-1.amazonaws.com/dev';


export function fetchBeerList() {
    const endPoint = `${base}/beers`;
    const settings = {
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer'
    };
    return fetch(endPoint, settings)
        .then((response) => {
            if (!response.ok) {
                throw new Error('oopsie');
            }
            return response.json();
        });
}

export function fetchBeer(id) {
    const endPoint = `${base}/beer/${id}`;

    const settings = {
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer'
    };

    return fetch(endPoint, settings)
        .then((response) => {
            if (!response.ok) {
                throw new Error('oopsie');
            }
            return response.json();
        });
}