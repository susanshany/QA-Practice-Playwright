# QA-Practic/**
* Playwright
1.	Install nde.js
      The very first link is what we are looking for Nodejs.org.
      Always install LTS version
      just open this installer.
2.	we need is Visual Studio Code.:  code editor.
3.	install git.

Check the installed version by running this comment in Visual studio code
node -v : to see the version of node
git -v : to see the versio n of git

Now need to install playwright extension
Search for playwright in visual studio code and install Microsoft certified “ Playwright Test for VSCode”
Now we need to install the dependencies in order to run this application on the localhost.

npm install

If you get any error like “could not resolve” and some dependency conflict the run this commend

npm install –force

in order to run it on the localhost, you need to write the command

npm start

Go to browser load the below url to see the application
http://localhost:4200
to stop the application
control + c

I open a new terminal session and inside of the terminal I need to execute command

npm init playwright@latest

Latest means that we want to install the latest version of the playwright and hit enter.

TypeScript or JavaScript: TypeScript.
Where you want to put your test?: tests
Add a GitHub workflow actions?: yes
Install playwright browser?: yes

You can see that we have a new folder structure showed up.

1, The very first folder is node modules.
2, Again, test folder is the folder with our test files and playwright created for us.
The naming convention for the test files in JavaScript application called spec dot TS.
So spec does not have any functional meaning, it's just the naming convention.
3. Test examples is just another folder.
   This folder will not be used in the test runner with just more examples of what playwright can do.
   They just automatically created those tests for us and few other files.
4. Package.json is the file to describe our overall project NPM scripts and dev dependencies of any packages
   that we want to install into the project.
   As of now we have just a single dependency which is a playwright, but in future if you need to add
   other libraries or other packages that you want to extend your project capabilities, you can always
   add it into the dev dependencies section and scripts section is the place where we will keep NPM scripts,
5. package lock, Json.
   Again, this is a file that kind of locking the configuration of your framework and it's always can
   be safely deleted and when you run NPM install it generates this file again.
   So sometimes this package dot lock can help to avoid some compatibility issues between the packages
   and so on.
6. And the main file playwright conflicts is the main configuration file of the playwright where you tweak
   certain settings of the framework.

Test Execution with CLI(Command Line Interface)
//To run the test. by default it run headless mode

npx playwright test

//To show the report

npx playwright show-report

//run the testin specific browser

npx playwright test --project=chromium

//run the test in browser to see the test execution

npx playwright test --project=chromium --headed

//run the specific test file in browser to see the test execution
npx playwright test example.spec.ts --project=chromium --headed

//run the specific test in browser to see the test execution
npx playwright test -g "has title" --project=chromium --headed

//run the test in debug mode
npx playwright test --debug

//run the test in record and playback mode
npx playwright codegen url

//If you need screenshot for every steps add screenshot : 'on' in configurtion file 
//To get detaild report with trace log information add trace : 'on'  in configurtion file 
// to see the built in report copy the absolute path of Index.html file inside the playwright-report folder and paste in the browser
//To see the allure report we need to install dependency
npm install --save-dev @playwright/test allure-playwright
And add "reporter: [["allure-playwright"]]" inside configuration file
After running the test run this command toopen the allure report :  allure serve allure-results
//Download Jenkin
and go to the location in terminal where the jenkin downloaded and run  "java -jar jenkins.war -httpPort=9090"    
// to skip the test
in code
test.skip

// to run only one test
in code
test.only

To run the test in UI mode, you need to execute command
npx playwright test --ui

to analyze your code and debug your test is to use a trace mode.

npx playwright test --project=chromium --trace on

this trace on is very useful to analyze the test.
If some of them failed, you can look into the test result and by default in playwright configuration trace is configured to on first retry.
So what it means that if the test failed for the first time on the first retry when playwright tried
to rerun failed test, it will automatically generate a trace and attach to your report if you want

The second way, how you can debug your test is to use actual playwright debugger or playwright inspector.

npx playwright test --project=chromium --debug

So playwright will open for you two Windows one is playwright inspector and second is browser, which
is right now is empty.
And then you can run the test that you want to debug.
If you click on this little icon, it will just simply run the test as is.
If you click on this step over button, it will run your test step by step.

Default debugger

Creat new test file
Each test method have import of the "page" fixture that gives us access to all playwright methods that
we use to interact with the framework.
The playwright commands that return a promise type you need
to use await keyword in front of this command when you want to execute it in order to avoid issues and
race conditions.

Hooks and control flow
test.beforeEach(asyn({page})=>{
await page.goto('http://localhost:4200/')

})
test.afterEach
test.beforeAll
test.afterAll

Locator synta rules

test('Locator syntax rules', async({page})=>{
//by tag name
page.locator('input')

    //by ID
    page.locator('#inputEmail')

    //by class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')
    
    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic"])

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by Xpath (Not recommended)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')

    })


    //Userfacing Locators
    test('User facing locators', asyn({page}){
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Deo').click

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()
    })

    //Locating Child elements
    test('Locating child elements', asyn({page}){
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
   
    //Can be use locator with different locator
    await page.locator('nb-card').getByRole('button',{name:"Sign in"}).first().click()
    //Can be use locator with Index
    await page.locator('nb-card').nth(3).getByRole('button').click()

    })
    //Locating Parent element
    test('locating parent elements', async({page})=>{
        await page.locator('nb-card',{hasText: "Using the Grid"}).getByRole('textbox',{name:"Email"}).click()
        await page.locator('nb-card',{has: page.locator('#inputEmail')}).getByRole('textbox',{name:"Email"}).click()

        await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox',{name:"Email"}).click()
        await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox',{name:"Password"}).click()

        await page.locator('nb-card',{has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).  getByRole('textbox',{name:"Email"}).click()
       
    //Reusing the Locators
    test('Reusing the locators', Asyn({page})=>{
        const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
        const emailField = basicForm.getByRole('textbox', {name: "Email"})

        await EmailField.fill('test@test.com')
        await basicForm.getByRole('textbox',{name: "Password"}).fill('Welcome123')
        await basicForm.locatorr('nb-checkbox').click()
        await basicForm.getByRole('button').click()

        await expect(emailField).toHaveValue('test@test.com')
        })

    //Extracting values
    test('extracting values', async({page})=>{
        //single test value
        const basicForm = page.loator('nb-card').filter({hasText: "Basic form"})
        const buttonText = await basicForm.locator('button').textContent()
        expect (buttonText).toEqual('Submit')

        //all text values
        const allRadioButtonsLabels = await page.locator('nb-radio').alTextContents()
        expect(allRadioButtonsLabels).toContain("Option 1")

        //input value
        const emailField = basicForm.getByRole('textbox', {name:"Email"})
        await emailField.fill('test@test.com)
        const emailValue = await emailField.inputValue()
        expect(emailValue).toEqual('test@test.com')

        const placeholderValue = awaitemailField.getAttribute('placeholder)
        expect(placeholderValue).toEqual('Email')
        })


    //Assertions
    test('assertions' async({page})=>{
        const basicFormButton = page.loator('nb-card').filter({hasText: "Basic form"}).locator('button')

        //general assertion
        const value = 5
        expect(value).toEqual(5)

        const text =await basicFormButton.textContent()
        expect(text).toEqual("Submit")

        //Locator assersion
        await expect(basicFormButton).toHaveText('Submit')

        //Soft assersion(test can continue execution even the test fail) and it's not recommented
         await expect.soft(basicFormButton).toHaveText('Submit')
         await basicFormButton.click()

        })

    //Auto-Waiting
    test('auto waiting', async({text})=.{
        const successButton = page.locator('.bg-success')

        await successButton.click()

        const text = await successButton.textContent()
        await successButton.waitfor({state:"attached"})
        const text = await successButton.allTextContents()

        expect(text).toContain('Data loaded with AJAX get request.', {timeout: 20000})
    })

//Ulternative Waits
test('ulternative waits', async({text})=.{
const successButton = page.locator('.bg-success')
//wait for element
await page.waitForSelector('.bg-success')

        //wait for particular response
        await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

        //wait for network calls to be completed ('NOT RECOMMENDED')
        await page.waitForLoadState('networkidle')

        const text =await successButton.allTextContents()
        expect(text).toContain('Dta loaded with AJAX get request.')
    })

    Global Timeout default: no timeout
    Time limit of the whole test run

    Test Timeout default: 30000 ms
    Time limit for the single test

    Action Timeout default: no timeout
    Time limit for the action command
    Ex: click(), fill(), textContent(), etc..

    Navigation Timeout default: no timeout
    Time limit for the action command
    Ex: page.goto(‘/’)

    Expect Timeout default: 5000 ms
    Time limit for “expect” locator assertions
    Ex: expect(locator).toHaveText(’Hello World’)

    page object manager is a class that contain all page objects


*/e-Playwright
