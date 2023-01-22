import { Component, HostListener, OnInit } from '@angular/core';
import { WEB_LANGUAGES_DATA } from '../../constants';
import { WebCodeContentInterface, CodeMirrorEmiterData } from '../../interfaces';
import { SweetAlertModalsService, InformationService } from '../../services';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public LANGUAGES_DATA = WEB_LANGUAGES_DATA;

  public content: WebCodeContentInterface = {
    html: "",
    css: "",
    javascript: ""
  }

  public visual: string = this.getCode();

  constructor(
    private sweetAlertModalsService: SweetAlertModalsService,
    private informationService: InformationService
  ) { }

  @HostListener('window:keydown', ['$event']) keyEvent(event: KeyboardEvent) {
    if (event.key === 's' && event.ctrlKey) {
      event.preventDefault();
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
  }

  ngOnInit(): void { }

  public codeEmitted(data: CodeMirrorEmiterData): void {
    this.content[`${data.languageName}`] = data.content;
    console.clear();
    this.updateCode();
  }

  private updateCode(): void {
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
          <style>${this.content.css}</style>
        </head>
        <body>
          ${this.content.html}
          <script>${this.content.javascript}</script>
        </body>
      </html>
    `;
  }

  public getPreviousCode(name: string) {
    return ""; //TODO
  }
}
