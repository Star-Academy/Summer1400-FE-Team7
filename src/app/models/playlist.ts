import {Song} from './song';

export class Playlist {
    name!: string;
    id!: number;
    songs!: Song[];

    constructor(name: string, id: number, songs: Song[]) {
        this.name = name;
        this.id = id;
        this.songs = songs;
    }
}
