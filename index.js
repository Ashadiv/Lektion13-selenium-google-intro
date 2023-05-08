
// We want to pull out Builder, By, Key and until from the selenium library
const {Builder, By, Key, until} = require('selenium-webdriver');

// We imort should() from chai
const should = require('chai').should();

async function googleSearch() {
   
    // Create new instance of firefox
    let driver = await new Builder().forBrowser('firefox').build();

    try {
     
         // Go to google.com
         await driver.get('https://www.google.com');

         //Find the accept cookies button
         let cookieButton = await driver.findElements(By.css('.QS5gu.sy4vM'));

         // Click the accept cookies button
         await cookieButton[1].click();

         //wait untill the element is located, in this case search bar
         await driver.wait(until.elementLocated(By.name('q')), 10000);

         // Selenium is too fast,better wait 1 second / 1000 ms
         await driver.sleep(1000);

         // Write something in the search bar and push enter
         await driver.findElement(By.name('q')).sendKeys('Selenium', Key.ENTER);

         // Wait until elements are located
         await driver.wait(until.elementLocated(By.css('h3')),10000);

         // Get thelink text
         let firstlink = await driver.findElement(By.css('h3'));
         let linkText = await firstlink.getText();
         console.log(linkText);

         // Assert linkText
         linkText.should.equal('Selenium');

         // Should always run if assert above validates correctly

         if(linkText === 'Selenium') {
         await firstlink.click();

    }else {
        console.log('First link is not "Selnium".');
    }

    // Wait until site loads and displays a title
    await driver.wait(until.titleContains('Selenium'), 10000);
    // Get the title
    let title = await driver.getTitle();
    // Assert the title
    title.should.include('Selenium');


    } catch(error) {    
        console.log(error);
     } finally {
        console.log('Test ran sucessfully');
        await driver.quit();
     }
    }



googleSearch();