export interface User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    photo_url?: string;
    birthdate?: Date;
    favorite_films: number[];
    favorite_actors: number[];
    favorite_genres: number[];
    token: string;
    last_login: Date;
}