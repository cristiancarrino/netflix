import { Film } from './film';

export interface Genre {
    id?: number;
    name: string;
    created_by: number;
    selected?: boolean;
    films?: Film[];
}