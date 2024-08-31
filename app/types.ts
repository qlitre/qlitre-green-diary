import { MicroCMSListResponse, MicroCMSListContent } from "microcms-js-sdk";

export type Plant = {
    title: string;
    thumbnail: {
        url: string;
    };
    description: string;
} & MicroCMSListContent;

export type PlantsResponse = MicroCMSListResponse<Plant>
