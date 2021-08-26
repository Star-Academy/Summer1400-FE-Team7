export class Song {
    constructor(
        public id: number = -1,
        public name: string = '',
        public artist: string = '',
        public duration: number = 0,
        public cover: string = '',
        public isFavourite: boolean = false,
        public lyrics: string = '',
        public file: string = '',
        public isSelected: boolean = false
    ) { }
}
