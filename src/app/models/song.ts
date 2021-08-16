export class Song {
    id!: number;
    name!: string;
    artist!: string;
    duration?: string;
    cover!: string;
    isFavourite?: boolean;
    lyrics!: string;
    file!: string;

    constructor(
        id: number,
        name: string,
        artist: string,
        duration: string,
        cover: string,
        isFavourite: boolean,
        lyrics: string,
        file: string
    ) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.duration = duration;
        this.cover = cover;
        this.isFavourite = isFavourite;
        this.lyrics = lyrics;
        this.file = file;
    }
}
