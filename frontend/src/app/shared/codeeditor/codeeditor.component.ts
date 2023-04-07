import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CodemirrorComponent } from "@ctrl/ngx-codemirror";
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CodeMirrorEmiterData, CodeMirrorOptions } from '../../interfaces';
import { WebCodeContentEnum } from '../../enums';

@Component({
  selector: 'app-codeeditor',
  templateUrl: './codeeditor.component.html',
  styleUrls: ['./codeeditor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CodeeditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('codeMirror') private codeEditorCmp!: CodemirrorComponent;

  @Input() previousCode: string = "";
  @Input() readOnly: boolean = false;
  @Input() panelOpenState: boolean = false;
  @Input() language: string = "htmlembedded";
  @Input() languageName: string = "HTML";
  @Input() stream$ = new BehaviorSubject<boolean>(false);
  @Input() codeStream$ = new BehaviorSubject<string[]>(['', '', '']);
  @Input() index: number = 0;

  @Output() contentEmitter: EventEmitter<CodeMirrorEmiterData> = new EventEmitter();

  public readonly destroy$ = new Subject<void>();

  public content: string = this.codeStream$.value[this.index];
  public options: CodeMirrorOptions = {};

  ngOnInit(): void {
    this.initOptions();
    setTimeout(() => { // ? Updating after 100 ms because of NG0100
      this.onKeyUp();
    }, 100);
    this.initRefreshStream();
    this.initCodeStream();

    if (this.readOnly) {
      this.options['cursorHeight'] = 0;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.codeEditorCmp.codeMirror?.refresh(); // ? code mirror bug need refresh for overwrite line
    }, 1000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public onKeyUp(event?: KeyboardEvent) {
    this.contentEmitter.emit({
      content: this.content,
      languageName: this.languageName.toLocaleLowerCase() as WebCodeContentEnum,
      isEmpty: event?.code === 'Backspace' ?? false
    });
  }

  private initOptions() {
    this.options = {
      mode: this.language,
      readOnly: this.readOnly,
      theme: "material",
      lineNumbers: true,
      autocorrect: true,
      autocapitalize: true,
      autoCloseBrackets: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
      foldGutter: true,
      matchBrackets: true,
      lint: true,
      keyMap: "sublime",
      extraKeys: {
        Ctrl: "autocomplete"
      },
      autofocus: true,
    }
  }

  private initRefreshStream() {
    this.stream$.pipe(
      tap((refresh) => {
        if (refresh) {
          this.content = '';
          this.codeEditorCmp.codeMirror?.setValue("");
          this.codeEditorCmp.codeMirror?.clearHistory();
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private initCodeStream() {
    this.codeStream$.pipe(
      tap((previousCode: string[]) => {
        this.content = previousCode[this.index];
        let content = '';
        let languageName = WebCodeContentEnum.HTML;

        if (this.index === 0) {
          content = previousCode[0];
          languageName = WebCodeContentEnum.HTML;
        } else if (this.index === 1) {
          content = previousCode[1];
          languageName = WebCodeContentEnum.CSS;
        } else {
          content = `${previousCode[2]}`;
          languageName = WebCodeContentEnum.JS;
        }

        this.contentEmitter.emit({ content, languageName });
        if (this.previousCode) {
          this.content = this.previousCode;
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
