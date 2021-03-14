import { Film } from './film';

export interface Actor {
    id: number;
    firstname: string;
    lastname: string;
    birthdate: Date;
    created_by: number;
    selected?: boolean;
    films?: Film[];
}