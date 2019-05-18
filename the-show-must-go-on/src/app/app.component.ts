import { Component } from '@angular/core';
import { Transcript } from './transcript.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'the-show-must-go-on';
  file: any;
  transcripts: Transcript[];

  fileChanged(e) {
    //clear trascripts
    this.transcripts = [];

    //init load file
    this.file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let copycat = <string>fileReader.result;
      let copycatRows = copycat.split("\n");
      for (let copycatRow of copycatRows) {
        if (copycatRow && !(!copycatRow.replace(/\s/g, '').length)) {
          let transcriptText: string[] = copycatRow.split(": ");
          if (transcriptText.length == 2) {
            let transcript = new Transcript();
            transcript.actor = transcriptText[0].toLowerCase();
            if (transcriptText[1].includes("(") && transcriptText[1].includes(")")) {
              transcript.description = transcriptText[1].match(/\(([^)]+)\)/)[1];
            } else {
              transcript.description = '';
            }
            transcript.sentence = transcriptText[1].replace('(' + transcript.description + ")", '');
            if (!transcript.sentence.replace(/\s/g, '').length) {
              transcript.sentence = '';
            }
            //randomization character picture number
            let minPicture = 1;
            let maxPicture = 6;
            transcript.pictureNumber = Math.floor(Math.random() * (+maxPicture - +minPicture)) + +minPicture;

            //randomization character picture number
            let minWidth = 1;
            let maxWidth = 7;
            transcript.comicBoxWidth = Math.floor(Math.random() * (+maxWidth - +minWidth)) + +minWidth;

            this.transcripts.push(transcript);
          } else {
            let transcript = new Transcript();
            transcript.actor = '';
            transcript.description = '';
            transcript.sentence = copycatRow;
            this.transcripts.push(transcript);
          }
        }
      }
    }
    fileReader.readAsText(this.file);
  }

}
