import {browser, by, element} from 'protractor';

export class AppPage {
  static navigateTo(destination: string) {
    return browser.get(destination);
  }

  static getHomeParagraphText() {
    return element(by.css('app-root app-home p')).getText();
  }

  static getComponentText(component: string) {
    return element(by.css('app-root ' + component)).getText();
  }

  static sidebarNavigate(itemLink: string) {
    element(by.css('#sidebar a[href="#/' + itemLink + '"]')).click();
  }
}
