const session = require("../session.json");
const helpers = require("./helpers");

describe('Create Token Demo - End to End', () => {
  beforeEach(async () => {
    await page.goto(session.APP_PAGE_URL);
  });

  it('should be titled "Create Token Demo"', async () => {
    await expect(page.title()).resolves.toMatch('Create Token Demo');
  });

  it('allows the user to create a new token', async () => {
    await page.type(helpers.getByTestId('CreateToken-inputName'), 'New Token');
    await page.type(helpers.getByTestId('CreateToken-inputAmount'), '1');
    await page.click(helpers.getByTestId('CreateToken-submitButton'));

    await expect(await page.waitForSelector(helpers.getByTestId(`CreateToken-successMessage`))).toBeTruthy();
    await page.screenshot({ path: '../screenshots/create_token_success.png', fullPage: true });
  });

  it('displays an error message if minima returned an error whilst creating the new token', async () => {
    await page.setRequestInterception(true);

    page.on('request', (request) => {
      if (request.url().includes('https://localhost:9004/cmd')) {
        request.respond({
          status: 200,
          body: JSON.stringify({ error: true }),
        });
      } else {
        request.continue();
      }
    });

    await page.type(helpers.getByTestId('CreateToken-inputName'), 'New Token');
    await page.type(helpers.getByTestId('CreateToken-inputAmount'), '1');
    await page.click(helpers.getByTestId('CreateToken-submitButton'));

    await expect(await page.waitForSelector(helpers.getByTestId(`CreateToken-failureMessage`))).toBeTruthy();
    await page.screenshot({ path: '../screenshots/create_token_failure.png', fullPage: true });
  });
});
