import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WebCodeContentEnum } from '../../enums';
import { CodeMirrorEmiterData, CodeMirrorOptions } from '../../interfaces';


@Component({
  selector: 'app-codeeditor',
  templateUrl: './codeeditor.component.html',
  styleUrls: ['./codeeditor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeeditorComponent implements OnInit {
  @Input() previousCode: string = "";
  @Input() readOnly: boolean = false;
  @Input() panelOpenState: boolean = false;
  @Input() language: string = "xml";
  @Input() languageName: string = "HTML";
  @Input() languageIcon: string = '<i class="fa-brands fa-html5"></i>';
  @Input() langaugeIconColor: string = "#DD4B25";

  @Output() contentEmitter: EventEmitter<CodeMirrorEmiterData> = new EventEmitter();

  public content: string = this.previousCode;
  public options: CodeMirrorOptions = {};

  ngOnInit(): void {
    this.options = {
      mode: this.language,
      readOnly: this.readOnly,
      theme: "material",
      lineNumbers: true,
      autocorrect: true,
      autocapitalize: true,
      keyMap: "sublime",
      extraKeys: {
        Ctrl: "autocomplete"
      },
    }

    this.content = this.previousCode;

    setTimeout(() => { // Updating after 100 ms because of NG0100
      this.onKeyUp();
    }, 100);
  }

  public onKeyUp() {
    this.contentEmitter.emit({
      content: this.content,
      languageName: this.languageName.toLocaleLowerCase() as WebCodeContentEnum
    });
  }
}
