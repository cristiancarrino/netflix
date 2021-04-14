import { Film } from './film';

export interface Genre {
    id?: number;
    name: string;
    image_url?: string;
    created_by?: number;
    created_at?: Date;
    films?: Film[];

    selected?: boolean;
}