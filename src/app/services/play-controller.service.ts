import { Injectable } from '@angular/core';

const statusTypes = {
  PLAYING: "playing",
  PAUSED: "paused",
  STOPPED: "stopped",
  MUTED: "muted",
};

const repeatTypes = {
  NO_REPEAT: "no-repeat",
  ONE_REPEAT: "one-repeat",
  ALL_REPEAT: "all-repeat",
};
@Injectable({
  providedIn: 'root'
})
export class PlayControllerService {


  status = statusTypes.STOPPED;
  repeatMode = repeatTypes.NO_REPEAT;
  shuffleMode = false;
  shuffleArray = [];
  shuffleIndex = 0;
  constructor() { }




}
