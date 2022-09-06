
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    await driver.get('http://localhost:3000/')
})
// below commented to see the App page stay open.
afterAll(async () => {
     driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})



test('Clicking upon Draw button allows choices for bot cards are displayed', async () => {
    
    const drawButton = await driver.findElement(By.id('draw')).click()
    console.log(drawButton)
    const divChoice = await driver.findElement(By.id('choices'))
    console.log(divChoice)
    // expect(divChoice).toHaveProperty('disabled',true)
    const displayed = await divChoice.isDisplayed()
    expect(displayed).toBe(true)
    //const clickButton = drawButton.
    //expect(clickButton).toBe(true)
})

 test('Clicking upon "Add to Duo" button should display player-Duo bot cards', async () => {
    const drawButton = await driver.findElement(By.id('draw')).click()
    //console.log(drawButton)
    const divChoice = await driver.findElement(By.id('choices'))
    //console.log(divChoice)

    const addToDuoButton = await driver.findElement(By.className('bot-btn')).click()
    console.log("addToDuoButton", addToDuoButton)
    const playerDuo = await driver.findElement(By.id('player-duo'))
   // console.log(playerDuo.isDisplayed())
    const playerDuoDisplayed = await playerDuo.isDisplayed()
    expect(playerDuoDisplayed).toBe(true)
  
 })


