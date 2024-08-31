import { MicroCMSQueries } from "microcms-js-sdk";

export const isObject = (value: unknown): value is Record<string, unknown> => {
    return value !== null && typeof value === 'object';
};

export const parseQuery = (queries: MicroCMSQueries): string => {
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