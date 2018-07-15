import { KotrakCustomersPage } from './app.po';

describe('kotrak-customers App', function() {
  let page: KotrakCustomersPage;

  beforeEach(() => {
    page = new KotrakCustomersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
