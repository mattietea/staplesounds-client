import { SsPage } from './app.po';

describe('ss App', function() {
  let page: SsPage;

  beforeEach(() => {
    page = new SsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
