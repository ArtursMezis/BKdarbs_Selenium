const {By, Builder, Browser} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");
const {expect} = require("chai");

suite(function (env) {
    describe('Basic Tests', function () {
        let driver;
        function randomString(length) {
            let text = "";
            let possible = "abcdefghijklmnopqrstuvwxyz";
            for (let i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
        function randomValidEmail() {
            return `${randomString(5)}${randomNumber(3)}@yahoo.co.uk`;
        }

        function randomValidPassword() {
            return `P${randomString(5)}!${randomNumber(3)}`;
        }

        function randomNumber(length, ignoreZero = false) {
            let text = "";
            let possible = "1234567890";
            let lngth = possible.length;
            for (let i = 0; i < length; i++) {
                if (ignoreZero) {
                    lngth = possible.length - 1;
                }
                text += possible.charAt(Math.floor(Math.random() * lngth));
            }
            return text;
        }

        beforeEach(async function () {
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get("http://localhost:8080");
        });

        afterEach(async () => await driver.quit());

        it('Check Documentation link container content', async function () {
            let title = await driver.getTitle();
            assert.equal("Welcome - Laravel", title);

            await driver.manage().setTimeouts({implicit: 500});

            let container = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(1)`));
            let containerHref = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(1)`)).getAttribute(`href`);
            let iconSVG = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(1) > div > div`));
            let arrowSVG = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(1) > svg`));
            let heading = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(1) > div > h2`))
            let paragraph = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(1) > div > p`))
            let headingText = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(1) > div > h2`)).getText()
            let paragraphText = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(1) > div > p`)).getText()

            await assert.ok(container.isDisplayed(), `container should be visible`)
            await assert.equal(containerHref, `https://laravel.com/docs`)
            await assert.ok(iconSVG.isDisplayed(), `iconSVG should be visible`)
            await assert.ok(arrowSVG.isDisplayed(), `iconSVG should be visible`)
            await assert.ok(heading.isDisplayed(), `heading should be visible`)
            await assert.equal(headingText, `Documentation`)
            await assert.ok(paragraph.isDisplayed(), `paragraph should be visible`)
            await assert.equal(paragraphText, `Laravel has wonderful documentation covering every aspect of the framework. Whether you are a newcomer or have prior experience with Laravel, we recommend reading our documentation from beginning to end.`)
        });

        it('Check Documentation link', async function () {
            await driver.manage().setTimeouts({implicit: 500});

            let container = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(1)`));
            await container.click();

            let url = await driver.getCurrentUrl()
            await assert.equal(url, `https://laravel.com/docs/10.x`)
        });

        it('Check Laracast link container content', async function () {
            let title = await driver.getTitle();
            assert.equal("Welcome - Laravel", title);

            await driver.manage().setTimeouts({implicit: 500});

            let container = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(2)`));
            let containerHref = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(2)`)).getAttribute(`href`);
            let iconSVG = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(2) > div > div`));
            let arrowSVG = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(2) > svg`));
            let heading = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(2) > div > h2`))
            let paragraph = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(2) > div > p`))
            let headingText = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(2) > div > h2`)).getText()
            let paragraphText = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(2) > div > p`)).getText()

            await assert.ok(container.isDisplayed(), `container should be visible`)
            await assert.equal(containerHref, `https://laracasts.com/`)
            await assert.ok(iconSVG.isDisplayed(), `iconSVG should be visible`)
            await assert.ok(arrowSVG.isDisplayed(), `iconSVG should be visible`)
            await assert.ok(heading.isDisplayed(), `heading should be visible`)
            await assert.equal(headingText, `Laracasts`)
            await assert.ok(paragraph.isDisplayed(), `paragraph should be visible`)
            await assert.equal(paragraphText, `Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development. Check them out, see for yourself, and massively level up your development skills in the process.`)
        });

        it('Check Laracast link', async function () {
            await driver.manage().setTimeouts({implicit: 500});

            let container = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(2)`));
            await container.click();

            let url = await driver.getCurrentUrl()
            await assert.equal(url, `https://laracasts.com/`)
        });

        it('Check Laravel News link container content', async function () {
            let title = await driver.getTitle();
            assert.equal("Welcome - Laravel", title);

            await driver.manage().setTimeouts({implicit: 500});

            let container = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(3)`));
            let containerHref = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(3)`)).getAttribute(`href`);
            let iconSVG = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(3) > div > div`));
            let arrowSVG = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(3) > svg`));
            let heading = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(3) > div > h2`))
            let paragraph = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(3) > div > p`))
            let headingText = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(3) > div > h2`)).getText()
            let paragraphText = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(3) > div > p`)).getText()

            await assert.ok(container.isDisplayed(), `container should be visible`)
            await assert.equal(containerHref, `https://laravel-news.com/`)
            await assert.ok(iconSVG.isDisplayed(), `iconSVG should be visible`)
            await assert.ok(arrowSVG.isDisplayed(), `iconSVG should be visible`)
            await assert.ok(heading.isDisplayed(), `heading should be visible`)
            await assert.equal(headingText, `Laravel News`)
            await assert.ok(paragraph.isDisplayed(), `paragraph should be visible`)
            await assert.equal(paragraphText, `Laravel News is a community driven portal and newsletter aggregating all of the latest and most important news in the Laravel ecosystem, including new package releases and tutorials.`)
        });

        it('Check Laravel News link', async function () {
            await driver.manage().setTimeouts({implicit: 500});

            let container = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > a:nth-of-type(3)`));
            await container.click();

            let url = await driver.getCurrentUrl()
            await assert.equal(url, `https://laravel-news.com/`)
        });

        it('Check ecosystem container content', async function () {
            let title = await driver.getTitle();
            assert.equal("Welcome - Laravel", title);

            await driver.manage().setTimeouts({implicit: 500});

            let container = await driver.findElement(By.css(`div[class*='rounded-lg']`));
            let iconSVG = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div > svg`));
            let heading = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div > h2`))
            let paragraph = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div > p`))
            let headingText = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div > h2`)).getText()
            let paragraphText = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div > p`)).getText()

            await assert.ok(container.isDisplayed(), `container should be visible`)
            await assert.ok(iconSVG.isDisplayed(), `iconSVG should be visible`)
            await assert.ok(heading.isDisplayed(), `heading should be visible`)
            await assert.equal(headingText, `Vibrant Ecosystem`)
            await assert.ok(paragraph.isDisplayed(), `paragraph should be visible`)
            await assert.equal(paragraphText, `Laravel's robust library of first-party tools and libraries, such as Forge, Vapor, Nova, and Envoyer help you take your projects to the next level. Pair them with powerful open source libraries like Cashier, Dusk, Echo, Horizon, Sanctum, Telescope, and more.`)
        });

        it('Check sponsor link', async function () {
            await driver.manage().setTimeouts({implicit: 500});

            let container = await driver.findElement(By.css(`a[class*='inline-flex']`));
            await container.click();

            let url = await driver.getCurrentUrl()
            await assert.equal(url, `https://github.com/sponsors/taylorotwell`)
        });

        it('Homepage logotype check', async function () {
            await driver.manage().setTimeouts({implicit: 500});

            let logo = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div > svg`));
            await assert.ok(logo.isDisplayed(), `logo should be visible`)

        });

        it('Homepage Log in container check', async function () {
            await driver.manage().setTimeouts({implicit: 500});

            let logIn = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(1)`))
            let logInText = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(1)`)).getText()
            await assert.ok(logIn.isDisplayed(), `logIn should be visible`)
            await assert.equal(logInText, `Log in`)
        });

        it('Homepage Register container check', async function () {
            await driver.manage().setTimeouts({implicit: 500});

            let register = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(2)`))
            let registerText = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(2)`)).getText()
            await assert.ok(register.isDisplayed(), `register should be visible`)
            await assert.equal(registerText, `Register`)
        });

        it('Register page check', async function () {
            await driver.manage().setTimeouts({implicit: 500});

            let register = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(2)`));
            await register.click();

            let name = await driver.findElement(By.css(`label[for='name'] span`))
            let nameText = await driver.findElement(By.css(`label[for='name'] span`)).getText()
            await assert.ok(name.isDisplayed(), `name should be visible`)
            await assert.equal(nameText, `Name`)
            let nameInput = await driver.findElement(By.css(`input[id='name']`))
            await assert.ok(nameInput.isDisplayed(), `name should be visible`)

            let email = await driver.findElement(By.css(`label[for="email"] span`))
            let emailText = await driver.findElement(By.css(`label[for="email"] span`)).getText()
            await assert.ok(email.isDisplayed(), `email should be visible`)
            await assert.equal(emailText, `Email`)
            let emailInput = await driver.findElement(By.css(`input[id="email"]`))
            await assert.ok(emailInput.isDisplayed(), `emailInput should be visible`)

            let password = await driver.findElement(By.css(`label[for="password"] span`))
            let passwordText = await driver.findElement(By.css(`label[for="password"] span`)).getText()
            await assert.ok(password.isDisplayed(), `password should be visible`)
            await assert.equal(passwordText, `Password`)
            let passwordInput = await driver.findElement(By.css(`input[id="password"]`))
            await assert.ok(passwordInput.isDisplayed(), `passwordInput should be visible`)

            let confirmPassword = await driver.findElement(By.css(`label[for="password_confirmation"] span`))
            let confirmPasswordText = await driver.findElement(By.css(`label[for="password_confirmation"] span`)).getText()
            await assert.ok(confirmPassword.isDisplayed(), `confirmPassword should be visible`)
            await assert.equal(confirmPasswordText, `Confirm Password`)
            let confirmPasswordInput = await driver.findElement(By.css(`input[id="password_confirmation"]`))
            await assert.ok(confirmPasswordInput.isDisplayed(), `confirmPasswordInput should be visible`)

            let alreadyRegistered = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > form > div:nth-of-type(5) > a`))
            let alreadyRegisteredText = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > form > div:nth-of-type(5) > a`)).getText()
            let containerHref = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > form > div:nth-of-type(5) > a`)).getAttribute(`href`);
            await assert.ok(alreadyRegistered.isDisplayed(), `alreadyRegistered should be visible`)
            await assert.equal(alreadyRegisteredText, `Already registered?`)
            await assert.equal(containerHref, `http://localhost:8080/login`)

            let registerBtn = await driver.findElement(By.css(`button[type='submit']`))
            let registerBtnText = await driver.findElement(By.css(`button[type='submit']`)).getText()
            await assert.ok(registerBtn.isDisplayed(), `registerBtn should be visible`)
            await assert.equal(registerBtnText, `REGISTER`)
        });

        it('Register a user', async function () {
            let randomName = randomString(10)
            let randomEmail = randomValidEmail()
            let randomPassword = randomValidPassword()

            await driver.manage().setTimeouts({implicit: 500});

            let register = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(2)`));
            await register.click();

            let nameInput = await driver.findElement(By.css(`input[id='name']`))
            await nameInput.sendKeys(randomName)

            let emailInput = await driver.findElement(By.css(`input[id="email"]`))
            await emailInput.sendKeys(randomEmail)

            let passwordInput = await driver.findElement(By.css(`input[id="password"]`))
            await passwordInput.sendKeys(randomPassword)

            let confirmPasswordInput = await driver.findElement(By.css(`input[id="password_confirmation"]`))
            await confirmPasswordInput.sendKeys(randomPassword)

            let registerBtn = await driver.findElement(By.css(`button[type='submit']`))
            await registerBtn.click()

            let loggedIn = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`))
            let loggedInText = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`)).getText()
            await assert.ok(loggedIn.isDisplayed(), `alreadyRegistered should be visible`)
            await assert.equal(loggedInText, `You're logged in!`)
        });

        it('Login page check', async function () {
                await driver.manage().setTimeouts({implicit: 500});

                let login = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(1)`));
                await login.click();

                let email = await driver.findElement(By.css(`label[for="email"] span`))
                let emailText = await driver.findElement(By.css(`label[for="email"] span`)).getText()
                await assert.ok(email.isDisplayed(), `email should be visible`)
                await assert.equal(emailText, `Email`)
                let emailInput = await driver.findElement(By.css(`input[id="email"]`))
                await assert.ok(emailInput.isDisplayed(), `emailInput should be visible`)

                let password = await driver.findElement(By.css(`label[for="password"] span`))
                let passwordText = await driver.findElement(By.css(`label[for="password"] span`)).getText()
                await assert.ok(password.isDisplayed(), `password should be visible`)
                await assert.equal(passwordText, `Password`)
                let passwordInput = await driver.findElement(By.css(`input[id="password"]`))
                await assert.ok(passwordInput.isDisplayed(), `passwordInput should be visible`)


                let forgotYourPassword = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > form > div:nth-of-type(4) > a`))
                let forgotYourPasswordText = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > form > div:nth-of-type(4) > a`)).getText()
                let containerHref = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > form > div:nth-of-type(4) > a`)).getAttribute(`href`);
                await assert.ok(forgotYourPassword.isDisplayed(), `forgotYourPassword should be visible`)
                await assert.equal(forgotYourPasswordText, `Forgot your password?`)
                await assert.equal(containerHref, `http://localhost:8080/forgot-password`)

                let loginBtn = await driver.findElement(By.css(`button[type='submit']`))
                let loginBtnText = await driver.findElement(By.css(`button[type='submit']`)).getText()
                await assert.ok(loginBtn.isDisplayed(), `registerBtn should be visible`)
                await assert.equal(loginBtnText, `LOG IN`)
            });

        it('Successful Login', async function () {
                await driver.manage().setTimeouts({implicit: 500});

                let login = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(1)`));
                await login.click();

                let emailInput = await driver.findElement(By.css(`input[id="email"]`))
                await emailInput.sendKeys(`TestUser00@testmail.com`)

                let passwordInput = await driver.findElement(By.css(`input[id="password"]`))
                await passwordInput.sendKeys(`QAZwsx!@#456`)

                let loginBtn = await driver.findElement(By.css(`button[type='submit']`))
                await loginBtn.click()

                let loggedIn = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`))
                let loggedInText = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`)).getText()
                await assert.ok(loggedIn.isDisplayed(), `alreadyRegistered should be visible`)
                await assert.equal(loggedInText, `You're logged in!`)
        });

        it('Unsuccessful Login, wrong email and wrong password', async function () {
            let randomEmail = randomValidEmail()
            let randomPassword = randomValidPassword()

            await driver.manage().setTimeouts({implicit: 500});

            let login = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(1)`));
            await login.click();

            let emailInput = await driver.findElement(By.css(`input[id="email"]`))
            await emailInput.sendKeys(randomEmail)

            let passwordInput = await driver.findElement(By.css(`input[id="password"]`))
            await passwordInput.sendKeys(randomPassword)

            let loginBtn = await driver.findElement(By.css(`button[type='submit']`))
            await loginBtn.click()

            let warning = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > form > div:nth-of-type(1) > div > p`))
            await assert.ok(warning.isDisplayed(), `alreadyRegistered should be visible`)
        });

        it('Unsuccessful Login, right email and wrong password', async function () {
            let randomPassword = randomValidPassword()

            await driver.manage().setTimeouts({implicit: 500});

            let login = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(1)`));
            await login.click();

            let emailInput = await driver.findElement(By.css(`input[id="email"]`))
            await emailInput.sendKeys(`TestUser00@testmail.com`)

            let passwordInput = await driver.findElement(By.css(`input[id="password"]`))
            await passwordInput.sendKeys(randomPassword)

            let loginBtn = await driver.findElement(By.css(`button[type='submit']`))
            await loginBtn.click()

            let warning = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > form > div:nth-of-type(1) > div > p`))
            await assert.ok(warning.isDisplayed(), `alreadyRegistered should be visible`)
        });

        it('Unsuccessful Login, wrong email and right password', async function () {
            let randomEmail = randomValidEmail()

            await driver.manage().setTimeouts({implicit: 500});

            let login = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(1)`));
            await login.click();

            let emailInput = await driver.findElement(By.css(`input[id="email"]`))
            await emailInput.sendKeys(randomEmail)

            let passwordInput = await driver.findElement(By.css(`input[id="password"]`))
            await passwordInput.sendKeys(`QAZwsx!@#456`)

            let loginBtn = await driver.findElement(By.css(`button[type='submit']`))
            await loginBtn.click()

            let warning = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > form > div:nth-of-type(1) > div > p`))
            await assert.ok(warning.isDisplayed(), `alreadyRegistered should be visible`)
        });

        it('Profile page check', async function () {
            let randomName = randomString(10)
            let randomEmail = randomValidEmail()
            let randomPassword = randomValidPassword()

            await driver.manage().setTimeouts({implicit: 2000});

            let register = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(2)`));
            await register.click();

            let nameInput = await driver.findElement(By.css(`input[id='name']`))
            await nameInput.sendKeys(randomName)

            let emailInput = await driver.findElement(By.css(`input[id="email"]`))
            await emailInput.sendKeys(randomEmail)

            let passwordInput = await driver.findElement(By.css(`input[id="password"]`))
            await passwordInput.sendKeys(randomPassword)

            let confirmPasswordInput = await driver.findElement(By.css(`input[id="password_confirmation"]`))
            await confirmPasswordInput.sendKeys(randomPassword)

            let registerBtn = await driver.findElement(By.css(`button[type='submit']`))
            await registerBtn.click()

            let loggedIn = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`))
            let loggedInText = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`)).getText()
            await assert.ok(loggedIn.isDisplayed(), `alreadyRegistered should be visible`)
            await assert.equal(loggedInText, `You're logged in!`)

            let userDropdown = await driver.findElement(By.css(`html > body > div > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(1) > span > button`))
            await userDropdown.click()

            let profileBtn = await driver.findElement(By.css(`a[class='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out']`))
            await assert.ok(profileBtn.isDisplayed(), `profileBtn should be visible`)

            let logOutBtn = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(3) > div > button`))
            let logOutBtnText = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(3) > div > button`)).getText()
            await assert.ok(logOutBtn.isDisplayed(), `logOutBtn should be visible`)
            await assert.equal(logOutBtnText, `Log Out`)

            await profileBtn.click()

            let profileHeading = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(1) > section > header > h2`))
            let profileHeadingText = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(1) > section > header > h2`)).getText()
            await assert.ok(profileHeading.isDisplayed(), `profileHeading should be visible`)
            await assert.equal(profileHeadingText, `Profile Information`)

            let profileParagraph= await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(1) > section > header > p`))
            let profileParagraphText = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(1) > section > header > p`)).getText()
            await assert.ok(profileParagraph.isDisplayed(), `profileParagraph should be visible`)
            await assert.equal(profileParagraphText, `Update your account's profile information and email address.`)

            let name = await driver.findElement(By.css(`label[for='name'] span`))
            let nameText = await driver.findElement(By.css(`label[for='name'] span`)).getText()
            await assert.ok(name.isDisplayed(), `name should be visible`)
            await assert.equal(nameText, `Name`)
            let nameInputProfile = await driver.findElement(By.css(`input[id='name']`))
            await assert.ok(nameInputProfile.isDisplayed(), `nameInputProfile should be visible`)
            let nameInputProfileValue = await driver.findElement(By.css(`input[id='name']`)).getAttribute(`value`)
            await assert.equal(nameInputProfileValue, randomName)

            let email = await driver.findElement(By.css(`label[for="email"] span`))
            let emailText = await driver.findElement(By.css(`label[for="email"] span`)).getText()
            await assert.ok(email.isDisplayed(), `email should be visible`)
            await assert.equal(emailText, `Email`)
            let emailInputProfile = await driver.findElement(By.css(`input[id="email"]`))
            await assert.ok(emailInputProfile.isDisplayed(), `emailInputProfile should be visible`)
            let emailInputProfileValue = await driver.findElement(By.css(`input[id='email']`)).getAttribute(`value`)
            await assert.equal(emailInputProfileValue, randomEmail)

            let currentPassword = await driver.findElement(By.css(`label[for='current_password'] span`))
            let currentPasswordText = await driver.findElement(By.css(`label[for='current_password'] span`)).getText()
            await assert.ok(currentPassword.isDisplayed(), `currentPassword should be visible`)
            await assert.equal(currentPasswordText, `Current Password`)
            let currentPasswordInput = await driver.findElement(By.css(`input[id^='current']`))
            await assert.ok(currentPasswordInput.isDisplayed(), `currentPasswordInput should be visible`)

            let newPassword = await driver.findElement(By.css(`label[for='password'] span`))
            let newPasswordText = await driver.findElement(By.css(`label[for='password'] span`)).getText()
            await assert.ok(newPassword.isDisplayed(), `newPassword should be visible`)
            await assert.equal(newPasswordText, `New Password`)
            let newPasswordInput = await driver.findElement(By.css(`input[id='password']`))
            await assert.ok(newPasswordInput.isDisplayed(), `newPasswordInput should be visible`)

            let confirmPasswordProfile = await driver.findElement(By.css(`label[for='password_confirmation'] span`))
            let confirmPasswordProfileText = await driver.findElement(By.css(`label[for='password_confirmation'] span`)).getText()
            await assert.ok(confirmPasswordProfile.isDisplayed(), `confirmPasswordProfile should be visible`)
            await assert.equal(confirmPasswordProfileText, `Confirm Password`)
            let confirmPasswordProfileInput = await driver.findElement(By.css(`input[id$='confirmation']`))
            await assert.ok(confirmPasswordProfileInput.isDisplayed(), `confirmPasswordProfileInput should be visible`)

            let deleteAcc = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(3) > section > header > h2`))
            let deleteAccText = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(3) > section > header > h2`)).getText()
            await assert.ok(deleteAcc.isDisplayed(), `deleteAcc should be visible`)
            await assert.equal(deleteAccText, `Delete Account`)

            let deleteAccP = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(3) > section > header > p`))
            let deleteAccPText = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(3) > section > header > p`)).getText()
            await assert.ok(deleteAccP.isDisplayed(), `deleteAccP should be visible`)
            await assert.equal(deleteAccPText, `Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.`)

            let deleteAccBtn = await driver.findElement(By.css(`button[class='inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150']`))
            let deleteAccBtnText = await driver.findElement(By.css(`button[class='inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150']`)).getText()
            await assert.ok(deleteAccBtn.isDisplayed(), `deleteAccBtn should be visible`)
            await assert.equal(deleteAccBtnText, `DELETE ACCOUNT`)

        });

        it('Profile page - change name', async function () {
            let randomName = randomString(10)
            let randomName2 = randomString(10)
            let randomEmail = randomValidEmail()
            let randomPassword = randomValidPassword()

            await driver.manage().setTimeouts({implicit: 2000});

            let register = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(2)`));
            await register.click();

            let nameInput = await driver.findElement(By.css(`input[id='name']`))
            await nameInput.sendKeys(randomName)

            let emailInput = await driver.findElement(By.css(`input[id="email"]`))
            await emailInput.sendKeys(randomEmail)

            let passwordInput = await driver.findElement(By.css(`input[id="password"]`))
            await passwordInput.sendKeys(randomPassword)

            let confirmPasswordInput = await driver.findElement(By.css(`input[id="password_confirmation"]`))
            await confirmPasswordInput.sendKeys(randomPassword)

            let registerBtn = await driver.findElement(By.css(`button[type='submit']`))
            await registerBtn.click()

            let loggedIn = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`))
            let loggedInText = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`)).getText()
            await assert.ok(loggedIn.isDisplayed(), `alreadyRegistered should be visible`)
            await assert.equal(loggedInText, `You're logged in!`)

            let userDropdown = await driver.findElement(By.css(`html > body > div > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(1) > span > button`))
            await userDropdown.click()

            let profileBtn = await driver.findElement(By.css(`a[class='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out']`))
            await assert.ok(profileBtn.isDisplayed(), `profileBtn should be visible`)

            let logOutBtn = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(3) > div > button`))
            let logOutBtnText = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(3) > div > button`)).getText()
            await assert.ok(logOutBtn.isDisplayed(), `logOutBtn should be visible`)
            await assert.equal(logOutBtnText, `Log Out`)

            await profileBtn.click()

            let nameInputProfile = await driver.findElement(By.css(`input[id='name']`))
            await assert.ok(nameInputProfile.isDisplayed(), `nameInputProfile should be visible`)
            await nameInputProfile.clear()
            await nameInputProfile.sendKeys(randomName2)

            let saveBtn = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(1) > section > form > div:nth-of-type(3) > button`))
            let saveBtnText = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(1) > section > form > div:nth-of-type(3) > button`)).getText()
            await assert.ok(saveBtn.isDisplayed(), `logOutBtn should be visible`)
            await assert.equal(saveBtnText, `SAVE`)

            await saveBtn.click()

            let nameInputProfileValue = await driver.findElement(By.css(`input[id='name']`)).getAttribute(`value`)
            await assert.equal(nameInputProfileValue, randomName2)
        });

        it('Profile page - change email', async function () {
            let randomName = randomString(10)
            let randomEmail = randomValidEmail()
            let randomEmail2 = randomValidEmail()
            let randomPassword = randomValidPassword()

            await driver.manage().setTimeouts({implicit: 2000});

            let register = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(2)`));
            await register.click();

            let nameInput = await driver.findElement(By.css(`input[id='name']`))
            await nameInput.sendKeys(randomName)

            let emailInput = await driver.findElement(By.css(`input[id="email"]`))
            await emailInput.sendKeys(randomEmail)

            let passwordInput = await driver.findElement(By.css(`input[id="password"]`))
            await passwordInput.sendKeys(randomPassword)

            let confirmPasswordInput = await driver.findElement(By.css(`input[id="password_confirmation"]`))
            await confirmPasswordInput.sendKeys(randomPassword)

            let registerBtn = await driver.findElement(By.css(`button[type='submit']`))
            await registerBtn.click()

            let loggedIn = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`))
            let loggedInText = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`)).getText()
            await assert.ok(loggedIn.isDisplayed(), `alreadyRegistered should be visible`)
            await assert.equal(loggedInText, `You're logged in!`)

            let userDropdown = await driver.findElement(By.css(`html > body > div > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(1) > span > button`))
            await userDropdown.click()

            let profileBtn = await driver.findElement(By.css(`a[class='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out']`))
            await assert.ok(profileBtn.isDisplayed(), `profileBtn should be visible`)

            let logOutBtn = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(3) > div > button`))
            let logOutBtnText = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(3) > div > button`)).getText()
            await assert.ok(logOutBtn.isDisplayed(), `logOutBtn should be visible`)
            await assert.equal(logOutBtnText, `Log Out`)

            await profileBtn.click()

            let emailInputProfile = await driver.findElement(By.css(`input[id="email"]`))
            await assert.ok(emailInputProfile.isDisplayed(), `emailInputProfile should be visible`)
            await emailInputProfile.clear()
            await emailInputProfile.sendKeys(randomEmail2)

            let saveBtn = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(1) > section > form > div:nth-of-type(3) > button`))
            let saveBtnText = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(1) > section > form > div:nth-of-type(3) > button`)).getText()
            await assert.ok(saveBtn.isDisplayed(), `logOutBtn should be visible`)
            await assert.equal(saveBtnText, `SAVE`)

            await saveBtn.click()

            let emailInputProfileValue = await driver.findElement(By.css(`input[id='email']`)).getAttribute(`value`)
            await assert.equal(emailInputProfileValue, randomEmail2)
        });

        it('Profile page - change password', async function () {
            let randomName = randomString(10)
            let randomEmail = randomValidEmail()
            let randomPassword = randomValidPassword()
            let randomPassword2 = randomValidPassword()

            await driver.manage().setTimeouts({implicit: 2000});

            let register = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(2)`));
            await register.click();

            let nameInput = await driver.findElement(By.css(`input[id='name']`))
            await nameInput.sendKeys(randomName)

            let emailInput = await driver.findElement(By.css(`input[id="email"]`))
            await emailInput.sendKeys(randomEmail)

            let passwordInput = await driver.findElement(By.css(`input[id="password"]`))
            await passwordInput.sendKeys(randomPassword)

            let confirmPasswordInput = await driver.findElement(By.css(`input[id="password_confirmation"]`))
            await confirmPasswordInput.sendKeys(randomPassword)

            let registerBtn = await driver.findElement(By.css(`button[type='submit']`))
            await registerBtn.click()

            let loggedIn = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`))
            let loggedInText = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`)).getText()
            await assert.ok(loggedIn.isDisplayed(), `alreadyRegistered should be visible`)
            await assert.equal(loggedInText, `You're logged in!`)

            let userDropdown = await driver.findElement(By.css(`html > body > div > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(1) > span > button`))
            await userDropdown.click()

            let profileBtn = await driver.findElement(By.css(`a[class='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out']`))
            await assert.ok(profileBtn.isDisplayed(), `profileBtn should be visible`)

            let logOutBtn = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(3) > div > button`))
            let logOutBtnText = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(3) > div > button`)).getText()
            await assert.ok(logOutBtn.isDisplayed(), `logOutBtn should be visible`)
            await assert.equal(logOutBtnText, `Log Out`)

            await profileBtn.click()

            let currentPasswordInput = await driver.findElement(By.css(`input[id^='current']`))
            await currentPasswordInput.sendKeys(randomPassword)

            let newPasswordInput = await driver.findElement(By.css(`input[id='password']`))
            await newPasswordInput.sendKeys(randomPassword2)

            let confirmPasswordProfileInput = await driver.findElement(By.css(`input[id$='confirmation']`))
            await confirmPasswordProfileInput.sendKeys(randomPassword2)

            let saveBtn = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(1) > section > form > div:nth-of-type(3) > button`))
            let saveBtnText = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > main > div > div > div:nth-of-type(1) > section > form > div:nth-of-type(3) > button`)).getText()
            await assert.ok(saveBtn.isDisplayed(), `logOutBtn should be visible`)
            await assert.equal(saveBtnText, `SAVE`)

            await saveBtn.click()
        });

        it('Profile page - delete account', async function () {
            let randomName = randomString(10)
            let randomEmail = randomValidEmail()
            let randomPassword = randomValidPassword()

            await driver.manage().setTimeouts({implicit: 2000});

            let register = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(1) > a:nth-of-type(2)`));
            await register.click();

            let nameInput = await driver.findElement(By.css(`input[id='name']`))
            await nameInput.sendKeys(randomName)

            let emailInput = await driver.findElement(By.css(`input[id="email"]`))
            await emailInput.sendKeys(randomEmail)

            let passwordInput = await driver.findElement(By.css(`input[id="password"]`))
            await passwordInput.sendKeys(randomPassword)

            let confirmPasswordInput = await driver.findElement(By.css(`input[id="password_confirmation"]`))
            await confirmPasswordInput.sendKeys(randomPassword)

            let registerBtn = await driver.findElement(By.css(`button[type='submit']`))
            await registerBtn.click()

            let loggedIn = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`))
            let loggedInText = await driver.findElement(By.css(`div[class='p-6 text-gray-900']`)).getText()
            await assert.ok(loggedIn.isDisplayed(), `alreadyRegistered should be visible`)
            await assert.equal(loggedInText, `You're logged in!`)

            let userDropdown = await driver.findElement(By.css(`html > body > div > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(1) > span > button`))
            await userDropdown.click()

            let profileBtn = await driver.findElement(By.css(`a[class='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out']`))
            await assert.ok(profileBtn.isDisplayed(), `profileBtn should be visible`)

            let logOutBtn = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(3) > div > button`))
            let logOutBtnText = await driver.findElement(By.css(`html > body > div:nth-of-type(1) > div > div > nav > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div > div:nth-of-type(3) > div > button`)).getText()
            await assert.ok(logOutBtn.isDisplayed(), `logOutBtn should be visible`)
            await assert.equal(logOutBtnText, `Log Out`)

            await profileBtn.click()

            let deleteAccBtn = await driver.findElement(By.css(`button[class='inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150']`))
            await deleteAccBtn.click()

            let deleteAccHeading = await driver.findElement(By.css(`html > body > div:nth-of-type(2) > div:nth-of-type(2) > div > h2`))
            await assert.ok(deleteAccHeading.isDisplayed(), `deleteAccHeading should be visible`)

            let deleteAccParagraph = await driver.findElement(By.css(`html > body > div:nth-of-type(2) > div:nth-of-type(2) > div > p`))
            let deleteAccParagraphText = await driver.findElement(By.css(`html > body > div:nth-of-type(2) > div:nth-of-type(2) > div > p`)).getText()
            await assert.ok(deleteAccParagraph.isDisplayed(), `deleteAccParagraph should be visible`)
            await assert.equal(deleteAccParagraphText, `Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.`)

            let deletePasswordInput = await driver.findElement(By.css(`html > body > div:nth-of-type(2) > div:nth-of-type(2) > div > div:nth-of-type(1) > input`))
            await deletePasswordInput.sendKeys(randomPassword)

            let confirmDelete = await driver.findElement(By.css(`button[class$='ml-3']`))
            let confirmDeleteText = await driver.findElement(By.css(`button[class$='ml-3']`)).getText()
            await assert.ok(confirmDelete.isDisplayed(), `confirmDelete should be visible`)
            await assert.equal(confirmDeleteText, `DELETE ACCOUNT`)
            await confirmDelete.click()

            let logo = await driver.findElement(By.css(`html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div > svg`));
            await assert.ok(logo.isDisplayed(), `logo should be visible`)
        });
    });
}, { browsers: [Browser.CHROME]});