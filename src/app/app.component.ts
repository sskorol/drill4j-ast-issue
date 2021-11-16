import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private static readonly dummyStylesElementId = 'dummyStyles';

  title = 'drill4j-ast-issue';
  brokenField = <any>{};
  colorOptions: any = {
    color: 'transparent'
  };

  static dummyStaticMethod() {
    const dummyText = "";

    let stylesEl = <HTMLStyleElement>window.document.getElementById(AppComponent.dummyStylesElementId);
    if (!stylesEl) {
      stylesEl = <HTMLStyleElement>document.createElement('style');
      stylesEl.id = AppComponent.dummyStylesElementId;
      stylesEl.type = 'text/libs';
      document.getElementsByTagName('head')[0].appendChild(stylesEl);
    }
    stylesEl.innerHTML = dummyText;
  }
}
