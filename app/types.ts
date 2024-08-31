import { MicroCMSListResponse, MicroCMSListContent, MicroCMSImage } from "microcms-js-sdk";

export type Plant = {
    title: string;
    thumbnail: MicroCMSImage
    description: string;
} & MicroCMSListContent;

export type GrowthHistory = {
    target: Plant;
    images: MicroCMSImage[];
    comment: string;
    shooting_date: string;
}

export type PlantsResponse = MicroCMSListResponse<Plant>
export type GrowthHistoryResponse = MicroCMSListResponse<GrowthHistory>