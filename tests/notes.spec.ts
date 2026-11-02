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

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/notes');
    await page.getByRole('textbox').fill('!@W#$%^&*()_+{}":<>?');
    await page.getByRole('button', { name: 'Dodaj notatke' }).click();
    await expect(page.getByText('!@W#$%^&*()_+{}":<>?')).toBeVisible();
    await page.getByRole('textbox').fill('\'\><script>alert(\'test\');</script>');
    await page.getByRole('button', { name: 'Dodaj notatke' }).click();
    await expect(page.getByText('\'\><script>alert(\'test\');</script>')).toBeVisible();
    await page.getByRole('textbox').fill(' test2 ');
    await page.getByRole('button', { name: 'Dodaj notatke' }).click();
    await expect(page.getByText('test2')).toBeVisible();
})

test('nothing add', async ({ page }) => {
    await page.goto('http://localhost:3000/notes');
    const before = page.locator('body').ariaSnapshot();
    await page.getByRole('textbox').fill('');
    await page.getByRole('button', { name: 'Dodaj notatke' }).click();
    await expect(page.locator('body').ariaSnapshot()).toEqual(before);
})

test('add new note2', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 800 });

    await page.goto('http://localhost:3000/notes');

    await page.locator('input[name="note"]').fill('new note2');
    // await page.getByRole('textbox').fill('new note');
    await page.getByRole('button', { name: 'Dodaj notatke' }).click();

    await expect(page.locator('p[class*="note"]')).toContainText("new note2");
});
