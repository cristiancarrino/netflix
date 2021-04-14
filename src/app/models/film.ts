import { Actor } from './actor';
import { Genre } from './genre';
import { Vote } from './vote';

export interface Film {
    id: number;
    title: string;
    description: string;
    plot: string;
    director: string;
    duration: string;
    vote: number;
    release_year: number;
    cover_url: string;
    tags: string;
    created_by?: number;
    created_at?: Date;
    actors: Actor[];
    genres: Genre[];

    votes: Vote[];
    showFilmMenu?: boolean;
    showMore?: boolean;
}