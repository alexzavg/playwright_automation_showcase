// Documentation https://playwright.dev/docs/api/class-apirequestcontext
import { Page, test } from '@playwright/test';
import { PageActions } from '../Pages/PageActions';

interface RegisterUserParams {
  url: string;
  name: string;
  email: string;
  password: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export class AutomationPractice extends PageActions {

  page: Page;
  headerLogo: string;
  signUpHeader: string;
  userSignupText: string;
  signUpNameField: string;
  signUpEmailField: string;
  signUpBtn: string;
  accountInfoText: string;
  titleMrRadioBtn: string;
  nameField: string;
  emailField: string;
  passwordField: string;
  dayDropdown: string;
  monthDropdown: string;
  yearDropdown: string;
  newsletterCheckbox: string;
  specialOffersCheckbox: string;
  firstNameField: string;
  lastNameField: string;
  companyField: string;
  addressField: string;
  countryDropdown: string;
  stateField: string;
  cityField: string;
  zipcodeField: string;
  mobileNumberField: string;
  createAccountBtn: string;
  accountCreatedText: string;
  continueBtn: string;
  loggedInText: string;
  deleteAccountBtn: string;
  accountDeletedText: string;

  constructor(page: Page, name: string) {
    super(page);
    this.page = page;
    this.headerLogo = '[src="/static/images/home/logo.png"]';
    this.signUpHeader = '[href="/login"]';
    this.userSignupText = `//h2[text()='New User Signup!']`;
    this.signUpNameField = '[data-qa="signup-name"]';
    this.signUpEmailField = '[data-qa="signup-email"]';
    this.signUpBtn = '[data-qa="signup-button"]';
    this.accountInfoText = `//b[text()='Enter Account Information']`;
    this.titleMrRadioBtn = '[for="id_gender1"]';
    this.nameField = '[data-qa="name"]';
    this.emailField = '[data-qa="email"]';
    this.passwordField = '[data-qa="password"]';
    this.dayDropdown = '[data-qa="days"]';
    this.monthDropdown = '[data-qa="months"]';
    this.yearDropdown = '[data-qa="years"]';
    this.newsletterCheckbox = '[id="newsletter"]';
    this.specialOffersCheckbox = '[id="optin"]';
    this.firstNameField = '[data-qa="first_name"]';
    this.lastNameField = '[data-qa="last_name"]';
    this.companyField = '[data-qa="company"]';
    this.addressField = '[data-qa="address"]';
    this.countryDropdown = '[data-qa="country"]';
    this.stateField = '[data-qa="state"]';
    this.cityField = '[data-qa="city"]';
    this.zipcodeField = '[data-qa="zipcode"]';
    this.mobileNumberField = '[data-qa="mobile_number"]';
    this.createAccountBtn = '[data-qa="create-account"]';
    this.accountCreatedText = `//b[text()='Account Created!']`;
    this.continueBtn = '[data-qa="continue-button"]';
    this.loggedInText = `//a[contains(text(), "Logged in as")]/b[contains(text(), "${name}")]`;
    this.deleteAccountBtn = '[href="/delete_account"]';
    this.accountDeletedText = `//b[text()='Account Deleted!']`;
  };

  public async registerUser(params: RegisterUserParams) {
    await test.step(`Register new user`, async () => {
      await this.openUrl(params.url);
      await this.waitForElement(this.headerLogo);
      await this.clickElement(this.signUpHeader);

      await this.waitForElement(this.userSignupText);
      await this.fillElement(this.signUpNameField, params.name);
      await this.fillElement(this.signUpEmailField, params.email);
      await this.clickElement(this.signUpBtn);

      await this.waitForElement(this.accountInfoText);
      await this.checkElementAttribute(this.nameField, 'value', params.name);
      await this.checkElementAttribute(this.emailField, 'value', params.email);
      await this.fillElement(this.passwordField, params.password);

      await this.selectDropdownOption(this.dayDropdown, params.birthDay);
      await this.selectDropdownOption(this.monthDropdown, params.birthMonth);
      await this.selectDropdownOption(this.yearDropdown, params.birthYear);

      await this.checkCheckbox(this.newsletterCheckbox);
      await this.isCheckboxChecked(this.newsletterCheckbox);
      await this.checkCheckbox(this.specialOffersCheckbox);
      await this.isCheckboxChecked(this.specialOffersCheckbox);

      await this.fillElement(this.firstNameField, params.firstName);
      await this.fillElement(this.lastNameField, params.lastName);
      await this.fillElement(this.companyField, params.company);
      await this.fillElement(this.addressField, params.address);
      await this.selectDropdownOption(this.countryDropdown, params.country);
      await this.fillElement(this.stateField, params.state);
      await this.fillElement(this.cityField, params.city);
      await this.fillElement(this.zipcodeField, params.zipcode);
      await this.fillElement(this.mobileNumberField, params.mobileNumber);
      await this.clickElement(this.createAccountBtn);

      await this.waitForElement(this.accountCreatedText);
      await this.clickElement(this.continueBtn);

      await this.waitForElement(this.loggedInText);
      await this.clickElement(this.deleteAccountBtn);
      await this.waitForElement(this.accountDeletedText);
      await this.clickElement(this.continueBtn);
    });
  };

};