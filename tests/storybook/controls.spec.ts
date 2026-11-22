import { expect, test } from '@playwright/test'

test('Select submits and resets a controlled form, including an empty key', async ({
  page,
}) => {
  await page.goto(
    '/iframe.html?id=ui-kit-controls-select--in-form&viewMode=story',
  )
  const trigger = page.getByRole('button', { name: /Кто может войти/ })
  await trigger.click()
  await page.getByRole('option', { name: 'Только авторизованным' }).click()
  await page.getByRole('button', { name: 'Сохранить', exact: true }).click()
  await expect(page.getByLabel('Сохранённые данные')).toHaveText(
    '{"access":"authenticated"}',
  )
  await expect
    .poll(() =>
      page
        .locator('form')
        .evaluate((form: HTMLFormElement) => new FormData(form).get('access')),
    )
    .toBe('authenticated')
  await page.getByRole('button', { name: 'Сбросить форму' }).click()
  await expect(trigger).toContainText('По умолчанию')
  await trigger.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('listbox')).toBeVisible()
  await page.keyboard.press('End')
  await page.keyboard.press('Enter')
  await expect(trigger).toContainText('Только авторизованным')
  await expect(trigger).toBeFocused()
})

test('Select opens above a modal and Escape closes only its list', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 780 })
  await page.goto(
    '/iframe.html?id=ui-kit-controls-select--in-modal&viewMode=story',
  )
  await page.getByRole('button', { name: 'Открыть настройки' }).click()
  const trigger = page.getByRole('button', { name: /Кто может войти/ })
  await trigger.click()
  await page.getByRole('option', { name: 'Всем по ссылке' }).click()
  await expect(trigger).toContainText('Всем по ссылке')
  await trigger.click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('listbox')).toHaveCount(0)
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(trigger).toBeFocused()
})

test('Autocomplete filters groups, selects with the keyboard and clears', async ({
  page,
}) => {
  await page.goto(
    '/iframe.html?id=ui-kit-controls-autocomplete--grouped&viewMode=story',
  )
  const input = page.getByRole('combobox')
  await input.fill('каз')
  await expect(page.getByRole('option')).toHaveCount(1)
  await expect(page.getByRole('option')).toHaveText('Казань')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(input).toHaveValue('Казань')
  await page.getByRole('button', { name: 'Сбросить выбор' }).click()
  await expect(input).toHaveValue('')
})

test('Autocomplete supports controlled remote results, clearing and errors', async ({
  page,
}) => {
  await page.goto(
    '/iframe.html?id=ui-kit-controls-autocomplete--remote-search&viewMode=story',
  )
  const input = page.getByRole('combobox')
  await input.fill('моск')
  await page.getByRole('option', { name: 'Москва' }).click()
  await expect(input).toHaveValue('Москва')
  await expect(page.getByLabel('Выбранный город')).toHaveText('moscow')
  await page.getByRole('button', { name: 'Сбросить выбор' }).click()
  await expect(input).toHaveValue('')
  await expect(page.getByLabel('Выбранный город')).toHaveText('Не выбран')
  await input.fill('ошибка')
  await expect(page.getByRole('alert')).toHaveText(
    'Не удалось загрузить города',
  )
  await input.fill('каз')
  await expect(page.getByRole('option', { name: 'Казань' })).toBeVisible()
  await expect(page.getByRole('alert')).toHaveCount(0)
})
