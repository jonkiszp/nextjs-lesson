import test, { expect } from "@playwright/test";

test('has title notes', async ({ page }) => {
    await page.goto('http://localhost:3000/notes');

    await expect(page.getByRole('heading', { name: 'Notes' })).toBeVisible();
});

test('add new note', async ({ page }) => {
    await page.goto('http://localhost:3000/notes');

    await page.getByRole('textbox').fill('new note');
    await page.getByRole('button', { name: 'Dodaj notatke' }).click();

    await expect(page.getByText('new note')).toBeVisible();
});
