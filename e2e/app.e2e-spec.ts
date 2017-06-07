import { Ng2WinesAppPage } from './app.po';

describe('ng2-wines-app App', () => {
  let page: Ng2WinesAppPage;

  beforeEach(() => {
    page = new Ng2WinesAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
