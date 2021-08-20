export class PlaylistSmall {
    public id!: number;
    public name!: string;
    public isChecked!: boolean;

    constructor(id: number, name: string, isChecked: boolean) {
        this.id = id;
        this.name = name;
        this.isChecked = isChecked;
    }
}
