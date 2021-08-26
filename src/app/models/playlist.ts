import {Song} from './song';

export class Playlist {
    constructor(public name: string, public id: number, public songs: Song[]) { }
}
