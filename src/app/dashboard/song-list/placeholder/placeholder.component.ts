import {Component, ElementRef, OnInit} from '@angular/core';
import { SongService } from 'src/app/services/song.service';


@Component({
    selector: 'app-placeholder',
    templateUrl: './placeholder.component.html',
    styleUrls: ['./placeholder.component.scss'],
})
export class PlaceholderComponent implements OnInit {

    constructor(private elementRef: ElementRef,private songService:SongService) {}

    placeholdersCount: number = 13;
    timeoutID!: any;
    currentValue: number = -45;

    ngOnInit(): void {
        this.timeoutID = setInterval(() => {
            this.currentValue += 5;
            document.documentElement.style.setProperty('--placeholder-rotation', this.currentValue + 'deg');
        }, 40);

        this.songService.loadingSongs.subscribe((loading:boolean)=>{
          if(!loading){
            clearInterval(this.timeoutID)
          }
        })
    }
}
