import { Component, OnInit } from '@angular/core';
import { SweetAlertIcon } from '../../enums';
import { SweetAlertModalsService } from '../../services';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public codeHTML: string = `<!DOCTYPE html>\n<html lang="en">
  <head>
    <title>ვებ გვერდის სათაური</title>
  </head>
  <body>
    <h1>სათაური</h1>
    <p>პარაგრაფი</p>
    <hr>
    <img src="./image.png" alt="სურათი">
    <a href="https://github.com/">Github</a>
    <button class="btn">ღილაკი</button>
  </body>\n</html>`;
  public codeCSS: string = `body {
  margin: 0px;
  padding: 0px;
  background: steelblue;\n}\n\nh1 {
  color: red;\n}\n\nbutton {
  border: 0px;
  background-color: steelblue;\n}`;
  public codeJS: string = `console.log('Hello world');\n\nconst h1 = document.querySelector('h1');\nconst btn = document.querySelector('.btn');\n\nbtn.addEventListener('click', () => {
  alert('ღილაკზე დაჭერის ივენთი');
  h1.style.fontSize = '22px';
  h1.style.fontWeight = '200';
  h1.style.fontStyle = 'italic';
  h1.style.color = 'steelblue';
  h1.style.textAlign = 'center';
  h1.innerText = 'ტექსტი შეიცვალა';\n});`;

  private gmailClickCount: number = 0;

  constructor(private sweetAlert: SweetAlertModalsService) { }

  ngOnInit(): void {

  }

  public incrementCount() {
    this.gmailClickCount++;

    if (this.gmailClickCount >= 2) {
      this.sweetAlert.displayModal(SweetAlertIcon.Info, "ინფორმაცია", "თუ პრობლემა არის მეილის გახსნასთან დაკავშირებით შეგიძლიათ თქვენით გამოაგზავნოთ მეილი ამ მისამართზე: info@iswavle.com");
    }
  }
}
