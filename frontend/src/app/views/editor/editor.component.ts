import { Component, HostListener, OnInit, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { WEB_LANGUAGES_DATA } from '../../constants';
import { WebCodeContentEnum } from './../../enums';
import { WebCodeContentInterface, CodeMirrorEmiterData, ResponseCodeInterface } from '../../interfaces';
import { SweetAlertModalsService, InformationService, WebRequestsService } from '../../services';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  @ViewChild('matTabGroup', { static: true }) private matTabGroup!: MatTabGroup;
  @ViewChild('frame', { static: true }) private frame!: ElementRef;

  public LANGUAGES_DATA = WEB_LANGUAGES_DATA;
  public previousCode: string[] = ['','',''];

  public readonly clearStream$ = new BehaviorSubject<boolean>(false);
  public readonly codeStream$ = new BehaviorSubject<string[]>(this.previousCode);
  public readonly destroy$ = new Subject<void>();

  public jsErrorOutput: string = '';
  public jsHasError: boolean = false;

  public resolution: string = '1200px x 1000px';
  public showResultion: boolean = true;
  public rotateFrame: boolean = false;

  private counter: number = 0;
  private isReloading: boolean = false;

  public content: WebCodeContentInterface = {
    html: "",
    css: "",
    javascript: ""
  }

  public visual: string = this.getCode();

  constructor(
    private router: Router,
    private clipBoard: Clipboard,
    private sweetAlertModalsService: SweetAlertModalsService,
    private informationService: InformationService,
    private httpService: WebRequestsService
  ) { }

  @HostListener('window:keydown', ['$event']) keyEvent(event: KeyboardEvent) {
    if (event.key === 's' && event.ctrlKey) {
      event.preventDefault();
      this.downloadCode();
    }
  }

  @HostListener("window:beforeunload", ["$event"]) beforeUnload(event: any) {
    if (!this.isReloading && this.counter >= 1) {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave?";
    }
  }

  @HostListener("window:unload") unload() {
    this.isReloading = true;
  }

  @HostListener('window:resize') resize() {
    this.initResolutionValue();
  }

  ngOnInit(): void {
    this.resize();
    this.loadPreviousCode();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private loadPreviousCode(){
    const url = this.router.url.split('/');
    if (url[1] === 'editor' && url[2]?.length === 24){
      this.httpService.get(`code/${url[2]}`).pipe(
        tap((result )=>{
          const response = result as ResponseCodeInterface;
          response.code.forEach((code: string, index: number) => {
            this.previousCode[index] = code;

            if (index === 2){
              this.previousCode[index] = `// Don't loop code otherwise it will freeze your tab \n${this.previousCode[index]}`;
            }
          });
          this.codeStream$.next(this.previousCode);
          this.updateCode();
        }),
        takeUntil(this.destroy$)
      ).subscribe();
    }
  }

  private initResolutionValue(){
    const frame = this.frame.nativeElement as HTMLElement;
    this.resolution = `${frame.offsetWidth} x ${frame.offsetHeight}`;
  }

  private downloadCode() {
    if (this.content.html === "" && this.content.css === "" && this.content.javascript === "") {
      this.sweetAlertModalsService.emptyTemplateDownload(this.getCode());
    } else {
      this.sweetAlertModalsService.downloadHtml(
        'Input file name',
        'file name for download',
        'Enter file name',
        this.getCode(),
        'html'
      );
    }
  }

  public codeEmitted(data: CodeMirrorEmiterData): void {
    this.content[`${data.languageName}`] = data.content;
    this.updateCode();
    /*
      ! because of eval code execution , it's getting buggy + XSS security risks , redo later
      this.errorOutput();
    */
    this.counter++;
  }

  private updateCode(): void {
    //console.clear();
    this.visual = this.getCode();
  }

  private getCode(): string {
    return `
      <!-- Created at : ${location.href} -->
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="${this.informationService.description}" />
          <meta name="author" content="Created at ${this.informationService.title}" />
          <meta property="og:title" content="${this.informationService.title}" />
          <meta property="og:description" content="${this.informationService.description}" />
          <meta
            property="og:image"
            content="${this.informationService.ogImageUrl}"
          />
          <meta
            name="keywords"
            content="${this.informationService.keywords}"
          />
          <title>${this.informationService.title}</title>
          <link rel="icon" type="image/x-icon" href="${this.informationService.favicon ?? 'https://avatars.githubusercontent.com/u/68782786?v=4'}">
          <style>
            body {
              margin: 0px;
              padding: 0px;
            }
          </style>
          <style>${this.content.css}</style>
        </head>
        <body>
          ${this.content.html}
          <script>${this.content.javascript}</script>
        </body>
      </html>
    `;
  }

  private errorOutput() {
    let hasError;
    try {
      eval(this.content[WebCodeContentEnum.JS]);
    } catch (error) {
      hasError = true;
      this.jsHasError = true;
      this.jsErrorOutput = error as string ?? '';
    }
    if (!hasError) {
      this.jsErrorOutput = '';
      this.jsHasError = false;
    }
  }

  public resetCode() {
    const content = [this.content[WebCodeContentEnum.HTML], this.content[WebCodeContentEnum.CSS], this.content[WebCodeContentEnum.JS]];
    if (content.every(code => code.length === 0)){
      return;
    }

    const resetAction = () => {
      this.clearStream$.next(true);
      this.content = {
        html: "",
        css: "",
        javascript: ""
      }
      this.jsErrorOutput = '';
      this.jsHasError = false;
      this.updateCode();
    }

    this.sweetAlertModalsService.displayDialog('Are you sure to reset all code ?', 'Yes', 'No', 'Code reseted successfully', '', 'success', resetAction);
  }

  public copySingleCode() {
    const successfullyCopyToast = () => {
      this.sweetAlertModalsService.displayToast("Code copied successfully", 'success', 'green');
    }
    const copyEmpty = () => {
      this.sweetAlertModalsService.displayToast("Code is empty", 'question', 'var(--primary-color)');
    }
    try {
      if (this.matTabGroup._allTabs.first.isActive) {
        if (this.content[WebCodeContentEnum.HTML]) {
          successfullyCopyToast();
          this.clipBoard.copy(this.content[WebCodeContentEnum.HTML]);
        } else {
          copyEmpty();
        }
      } else if (this.matTabGroup._allTabs.last.isActive) {
        if (this.content[WebCodeContentEnum.JS]) {
          successfullyCopyToast();
          this.clipBoard.copy(this.content[WebCodeContentEnum.JS]);
        } else {
          copyEmpty();
        }
      } else {
        if (this.content[WebCodeContentEnum.CSS]) {
          successfullyCopyToast();
          this.clipBoard.copy(this.content[WebCodeContentEnum.CSS]);
        } else {
          copyEmpty();
        }
      }
    } catch (err) {
      this.sweetAlertModalsService.displayToast("Can't copy code", 'error', 'red');
    }
  }

  public copyWholeCode() {
    const content = [this.content[WebCodeContentEnum.HTML], this.content[WebCodeContentEnum.CSS], this.content[WebCodeContentEnum.JS]];
    if (content.some(code => code !== '')) {
      this.sweetAlertModalsService.displayToast("Copied all code", 'success', 'green');
    } else {
      this.sweetAlertModalsService.displayToast("Copied empty template", 'question', 'var(--primary-color)');
    }
    this.clipBoard.copy(this.getCode());
  }

  public downloadCodeAction() {
    this.downloadCode();
  }

  public toggleResultion() {
    this.showResultion = !this.showResultion;
  }

  public rotate() {
    this.rotateFrame = !this.rotateFrame;
    const element = document.querySelector('.CodeMirror') as HTMLElement;
    const secondElement = document.querySelector(".mat-tab-body-content") as HTMLElement;
    if (this.rotateFrame){
      element.style.height = '300px'; // ? set default size for code mirror
      secondElement.style.overflowY = 'hidden';
    } else {
      element.style.height = '100%'; // ? set full size for code mirror
      secondElement.style.overflowY = 'auto';
    }
    setTimeout(() => {
      this.resize(); // * need setTimeout for calculate correct dimensions
    }, 100);
  }
}
