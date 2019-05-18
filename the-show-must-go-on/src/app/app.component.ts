import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'the-show-must-go-on';
  file: any;
  script: string;
  sentences: string[];

  fileChanged(e) {
    this.file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.script = <string>fileReader.result;
      this.sentences = this.script.split("\n");
      // for(let sentence of sentences) {
      //   console.log(sentence);
      // }
    }
    fileReader.readAsText(this.file);
  }

}
