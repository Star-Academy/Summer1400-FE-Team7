import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import { HostListener } from '@angular/core';

import {Song} from "../../models/song";

@Component({
  selector: 'app-add-to-playlist-panel',
  templateUrl: './add-to-playlist-panel.component.html',
  styleUrls: ['./add-to-playlist-panel.component.scss'],

})
export class AddToPlaylistPanelComponent implements OnInit {
  @Input() song!: Song
  @Output()closeAddToNewPlaylistPanel = new EventEmitter<void>()


  constructor() {
  }

  ngOnInit(): void {
  }


  closeNewPlaylistPanel() {
    this.closeAddToNewPlaylistPanel.emit();
  }


}
