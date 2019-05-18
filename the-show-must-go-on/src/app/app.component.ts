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
        let transcriptText: string[] = copycatRow.split(": ");
        if (transcriptText.length == 2) {
          let transcript = new Transcript();
          transcript.actor = transcriptText[0].toLowerCase();
          if(transcriptText[1].includes("(") && transcriptText[1].includes(")")){
            transcript.description = transcriptText[1].match(/\(([^)]+)\)/)[1];
          } else {
            transcript.description='';
          }
          transcript.sentence = transcriptText[1].replace('('+transcript.description+")",'');
          if (!transcript.sentence.replace(/\s/g, '').length) {
            transcript.sentence='';
          }
          //randomization character picture number
          let min=1; 
          let max=6;
          transcript.pictureNumber = Math.floor(Math.random() * (+max - +min)) + +min;
          this.transcripts.push(transcript);
        } else {
          console.log("FORMAT COPYCAT ERROR! LENGTH: " + transcriptText.length);
        }
      }
    }
    fileReader.readAsText(this.file);
  }

}
