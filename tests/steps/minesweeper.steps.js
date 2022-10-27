const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = 'http://127.0.0.1:5500/minesweeper.html';

Given('a user enters to the page', async () => {
	await page.goto(url);
});

Given('the user loads the mockData {string}', async (string) => {
	await page.goto(url + '?mockData=' + string);
  });

  When('the user reveals the cell {string}',async (string) => {
	let cellId = 'id=' + string;
    await page.click(cellId);
  });

  Then('the cell {string} should show {string}', async (string, string2) => {
	let cellId = 'id=' + string;
    const cell = await page.locator(cellId);
    await expect(cell).toHaveAttribute("class",string2 + " celluncovered");
  });

  Then('the bomb counter should be {string}', async (string) => {
	let counter = 'data-testid=counter';
	let value = await page.locator(counter).innerText();
	expect(value).toBe(string);

  });

  Then('the cell {string} must show {string}', async (string, string2) => {
	let cell = 'id=' + string;
	let value = await page.locator(cell).innerText();
	expect(value).toBe(string2);
	
  });

  Then('should show the {string}', async (string) => {
	let allCells = await page.locator("td");
	let cellCounter = 0;

	for (let i = 0; i < string.length; i++) {
		if (string[i].includes(".")) {
			await expect( allCells.nth(cellCounter)).toHaveAttribute("class","celluncovered")
			 cellCounter++;
		} else if (string[i].includes("_")) {
			await expect( allCells.nth(cellCounter)).toHaveAttribute("class","cellcovered")
			 cellCounter++;
		}
	}
  });

  Then('the timer should be {string}', async (string) => {
	let time = 'id=time-counter';
    const textTime = await page.locator(time).innerText();
    expect(textTime).toBe("Time Counter: " + string);
  });

  Then('the face should be {string}', async (string)  =>{
	let face = 'data-testid=face';
	if (string == 'normal face') string = "normal_face";
	if (string == 'sad face') string = "sad_face";
	if (string == 'happy face') string = "happy_face";
    const imgFace = await page.locator(face);
    await expect(imgFace).toHaveAttribute("src","/img/" + string + ".png");
  });

  When('clicks the {string} button', async (string) => {
	let face = 'data-testid=' + string;
    await page.click(face);
  });

  When('the user marks the cell {string} with {string}', async (string, string2) => {
	let cell = 'id=' + string;

	if (string2 == 'Flag tag') {
		await page.click(cell, {button: 'right'});
	}
	if (string2 == 'Questionable mark') {
		await page.click(cell, {button: 'right'});
		await page.click(cell, {button: 'right'});
	}
  });

  Then('the cell {string} shows {string}', async (string, string2) => {
	let cellId = 'id=' + string;
    const cell = await page.locator(cellId);

	if (string2 == 'minetag') {
		await expect(cell).toHaveAttribute("class","cellcovered " + string2);
	}
	if (string2 == 'Questionable mark') {
		expect(await cell.innerText()).toBe("?");

	}
  });

  When('the user unmarks the cell {string} with {string}', async (string, string2) => {
	let cellId = 'id=' + string;

	if (string2 == 'Questionable mark') {
		await page.click(cellId, {button: 'right'});
		await page.click(cellId, {button: 'right'});
		await page.click(cellId, {button: 'right'});
	}
	if (string2 == 'Flag tag') {
		await page.click(cellId, {button: 'right'});
		await page.click(cellId, {button: 'right'});

	}
	

  });