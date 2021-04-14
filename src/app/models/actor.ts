import { Film } from './film';

export interface Actor {
    id: number;
    firstname: string;
    lastname: string;
    photo_url?: string;
    birthdate?: Date;
    created_by?: number;
    created_at?: Date;
    films?: Film[];

    selected?: boolean;
}