export class Song {
    title!: string;
    artist!: string;
    duration?: string;
    cover!: string;
    isFavourite!: boolean;
    lyrics!: string;

    constructor(title: string, artist: string, duration: string, cover: string, isFavourite: boolean, lyrics: string) {
        this.title = title;
        this.artist = artist;
        this.duration = duration;
        this.cover = cover;
        this.isFavourite = isFavourite;
        this.lyrics = lyrics;
    }
}
