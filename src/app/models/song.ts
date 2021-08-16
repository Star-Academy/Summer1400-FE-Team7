export class Song {
    id!: number;
    name!: string;
    artist!: string;
    duration?: string;
    cover!: string;
    isFavourite?: boolean;
    lyrics!: string;
    file!: string;
    isSelected!: boolean;

    constructor(
        id: number=-1,
        name: string="",
        artist: string="",
        duration: string="",
        cover: string="",
        isFavourite: boolean=false,
        lyrics: string="",
        file: string="",
        isSelected: boolean = false
    ) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.duration = duration;
        this.cover = cover;
        this.isFavourite = isFavourite;
        this.lyrics = lyrics;
        this.file = file;
        this.isSelected = isSelected;
    }
}
