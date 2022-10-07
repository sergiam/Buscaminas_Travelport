const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = 'http://127.0.0.1:5500/minesweeper.html';

Given('a user enters to the page', async () => {
	await page.goto(url);
});

Given('the user loads the layout {string}', async (string) => {
	await page.goto(url + '?layout=' + string);
  });