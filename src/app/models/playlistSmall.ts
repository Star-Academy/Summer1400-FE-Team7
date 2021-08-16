export class PlaylistSmall {
    public id!: number;
    public name!: string;
    public isSelected!: boolean;

    constructor(id: number, name: string, isSelected: boolean) {
        this.id = id;
        this.name = name;
        this.isSelected = isSelected;
    }
}
