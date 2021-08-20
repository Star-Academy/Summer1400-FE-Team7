import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {SongService} from 'src/app/services/song.service';
import {Playlist} from "../../../models/playlist";
import {Constants} from "../../../utils/constants";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  searchPlaylist!: Playlist;

  form: FormGroup = new FormGroup({
    searchText: new FormControl()
  });

  obs!: Subscription;

  constructor(private songService: SongService) {
  }

  ngOnInit() {
    this.obs = this.form.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(data => this.performSearch(data.searchText));
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }


  performSearch(searchText: string) {
    this.songService.searchSongsByName(searchText)
  }

}
