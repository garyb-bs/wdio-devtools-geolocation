const assert = require('assert')

describe('Check Location overriding the timezone', () => {
    it('Check the default timezone', async () => {
        await browser.url('https://www.where-am-i.net/')
        await $('//button[@class="fc-button fc-cta-consent fc-primary-button"]').click();
        // this validation depends on where are you!
        // assert.equal(location.getText(), '19.075984, 72.877656')
        // you might get 0.0 and 0.0 the first time because of authorization issues
    })

    it('Check that London should be the timezone', async () => {
        // change to london location and timezone
        // cdp is the command to use a devTools command
        // we are going to use the Emulation module
        // and the setGeoLocationOverride method
        // info: https://chromedevtools.github.io/devtools-protocol/tot/Emulation/
        // note: the location and timezone must match or you will get an unavailable position  

         

        await browser.cdp('Emulation', 'setGeolocationOverride' , {
            latitude:51.507351,
            longitude:-0.127758,
            accuracy: 1
        })
        await browser.cdp('Emulation', 'setTimezoneOverride', {
            timezoneId: 'Europe/London'
        })
        
        await $('#btnMyLocation').click(); 

        await browser.pause(3000) // wait so you can notice the map changing
        let location = await $('#location') // get a location reference for validation
        assert.equal(await location.getText(), '51.507351, -0.127758')

    })

    it('Check that Tokyo should be the timezone', async () => {
        // change to lo Tokyo location and timezone
        await browser.cdp('Emulation', 'setGeolocationOverride' , {
            latitude:35.689487,
            longitude:139.691706,
            accuracy: 1
        })

        await browser.cdp('Emulation', 'setTimezoneOverride', {
            timezoneId: 'Asia/Tokyo'
        })

        await $('#btnMyLocation').click(); 

        await browser.pause(3000) // wait so you can notice the map changing
        assert.equal(await $('#location').getText(), '35.689487, 139.691706')
    })
});
