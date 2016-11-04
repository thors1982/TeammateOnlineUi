import { TeammateOnlineUiPage } from './app.po';

describe('teammate-online-ui App', function() {
  let page: TeammateOnlineUiPage;

  beforeEach(() => {
    page = new TeammateOnlineUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
