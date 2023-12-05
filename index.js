const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function ujOdusTests(username, password) {
    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    await driver.get('https://ssb.uj.edu.sa/banprod/twbkwbis.P_ValLogin');
    await driver.findElement(By.id('UserID')).sendKeys(username);
    await driver.findElement(By.name('PIN')).sendKeys(password);
    const signInButton = await driver.findElement(By.css('td a'));
    await driver.actions().click(signInButton).perform();
    await sleep(3000)
    const title=await driver.getTitle()
    if(title==='القائمة الرئيسية'){
        console.log('test success')
        return
    }
    const regex = /اسم المستخدم يجب ان لا يتعدى 5 ارقام/gi
    const errorMessage = await driver.findElement(By.css('tr:last-child')).getText()
    if (regex.test(errorMessage))
        console.log('test success')
    else
        console.log('test failed')
    driver.close()
};
ujOdusTests('test', 'incorrect password') // TC0001