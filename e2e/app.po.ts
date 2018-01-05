import {browser, by, element, protractor} from 'protractor';

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

  static waitForComponent(component: string) {
    const elem = element(by.css('app-root ' + component));
    const until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(elem), 30000, `Element ${component} taking too long to appear in the DOM`);
  }

  static waitForComponentToContainText(component: string, text: string) {
    const elem = element(by.css('app-root ' + component));
    const until = protractor.ExpectedConditions;
    browser.wait(until.textToBePresentInElement(elem, text), 30000, `Element ${component} taking too long to appear in the DOM`);
  }

  static sidebarNavigate(itemLink: string) {
    element(by.css('#sidebar a[href="#/' + itemLink + '"]')).click();
  }
}
