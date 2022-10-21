const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = 'http://127.0.0.1:5500/minesweeper.html';

Given('a user enters to the page', async () => {
	await page.goto(url);
});

Given('the user loads the mockData {string}', async (string) => {
	await page.goto(url + '?mockData=' + string);
  });

  When('the user presses the cell {string}', function (string) {
	// Write code here that turns the phrase above into concrete actions
	return 'pending';
  });

  Then('the user loses the game', function () {
	// Write code here that turns the phrase above into concrete actions
	return 'pending';
  });