import { MicroCMSQueries } from "microcms-js-sdk";

const isObject = (value: unknown): value is Record<string, unknown> => {
    return value !== null && typeof value === 'object';
};

const parseQuery = (queries: MicroCMSQueries): string => {
    if (!isObject(queries)) {
        throw new Error('queries is not object');
    }
    const queryString = new URLSearchParams(
        Object.entries(queries).reduce(
            (acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key] = String(value);
                }
                return acc;
            },
            {} as Record<string, string>,
        ),
    ).toString();

    return queryString;
};

export async function getListResponse<T>(serviceDomain: string, apiKey: string, endpoint: string, queries?: MicroCMSQueries): Promise<T | undefined> {
    const baseUrl = `https://${serviceDomain}.microcms.io/api/v1/`;
    let url = `${baseUrl}${endpoint}`;
    if (queries) {
        const queryString = parseQuery(queries)
        url += '?' + queryString
    }

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-MICROCMS-API-KEY': apiKey,
        },
    };
    
    return fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json() as Promise<T>;
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
            return undefined;
        });
}

export async function getDetail<T>(serviceDomain: string, apiKey: string, endpoint: string, contentId: string, queries?: MicroCMSQueries): Promise<T | undefined> {
    const baseUrl = `https://${serviceDomain}.microcms.io/api/v1/`;
    let url = `${baseUrl}${endpoint}/${contentId}`;
    if (queries) {
        const queryString = parseQuery(queries)
        console.log(queryString)
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-MICROCMS-API-KEY': apiKey,
        },
    };

    return fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json() as Promise<T>;
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
            return undefined;
        });
}



