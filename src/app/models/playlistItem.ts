export class PlaylistItem {
    name!: string;
    icon!: string;
    buttonType!: string;
    link!: string;
    isSelected!: boolean;

    constructor(name: string, icon: string, buttonType: string, link: string, isSelected: boolean) {
        this.name = name;
        this.icon = icon;
        this.buttonType = buttonType;
        this.link = link;
        this.isSelected = isSelected;
    }
}
