import {AppPage} from './app.po';

describe('david-miles App', () => {

  it('should display welcome message', () => {
    AppPage.navigateTo('/');
    expect(AppPage.getHomeParagraphText()).toContain('Välkommen');
  });

  it('Should show about text', () => {
    AppPage.sidebarNavigate('om');
    expect(AppPage.getComponentText('app-about')).toContain('2011 hade David en radiohit');
  });

  it('Should show tour headers', () => {
    AppPage.sidebarNavigate('spelplan');
    AppPage.waitForComponent('app-tour');
    const tourText = AppPage.getComponentText('app-tour');
    expect(tourText).toContain('Tidigare');
    expect(tourText).toContain('Kommande');
  });
});
