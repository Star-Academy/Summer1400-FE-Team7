export class PlaylistItem {
    name!: string;
    id!: number;
    icon!: string;
    buttonType!: string;
    link!: string;
    isSelected!: boolean;

    constructor(name: string, id: number, icon: string, buttonType: string, link: string, isSelected: boolean) {
        this.name = name;
        this.id = id;
        this.icon = icon;
        this.buttonType = buttonType;
        this.link = link;
        this.isSelected = isSelected;
    }
}
