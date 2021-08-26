export class PlaylistItem {

    constructor(
        public name: string,
        public id: number,
        public icon: string,
        public buttonType: string,
        public link: string,
        public isSelected: boolean) {
    }
}
