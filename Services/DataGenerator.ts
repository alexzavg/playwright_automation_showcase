export class DataGenerator {

  // The string returned is in the format of "YYYYMMDDHHMMSS", e.g. "20190212152415"
  public async currentDateString(){
    var date = new Date();    
    var testDate = date.getFullYear() + (date.getMonth() + 1) + date.getDate() + (date.getHours() + 3) + date.getMinutes() + date.getSeconds();
    return testDate;
  };

  // The string returned is the email address in the format of "autotest_YYYYMMDDHHMMSS@test.com", e.g. "autotest_20190212152415@test.com
  public async randomEmail() {
    var str = await this.randomString(5);
    var date = new Date();    
    var testDate = 
        date.getFullYear() + 
        (date.getMonth() + 1).toString().padStart(2, '0') + 
        date.getDate().toString().padStart(2, '0') + 
        (date.getHours() + 3).toString().padStart(2, '0') + 
        date.getMinutes().toString().padStart(2, '0') + 
        date.getSeconds().toString().padStart(2, '0');
    return ('autotest_' + testDate + str + '@test.com');
  };

  // Returns random string with specific length, e.g. if length = 6, then output will be "abcdef"
  public async randomString(length: number) {
    var str = '';
    var i;
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    for (i = 0; i < length; i++) {
        str += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return str;
  };

  // Returns random number with specific length, e.g. if length = 6, then output will be "123456"
  public async randomNumber(length: number) {
    var str = '';
    var i;
    var numbers = '123456789';
    for (i = 0; i < length; i++) {
        str += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    let num = Number(str);
    return num;
  };

  // Returns random special character with specific length, e.g. if length = 6, then output will be "!@#$%^"
  public async specialChar(length: number) {
    var char = '';
    var i;
    var specialCharacters = '!@#$^&*{}|_';
    for (i = 0; i < length; i++) {
        char += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
    }
    return char;
  };

  // Returns current time in ISO format, e.g: 2019-02-12T15:24:15.731Z
  public async getCurrentTimeISO() {
    var date = new Date();
    date.setTime(Date.now());
    var time = date.toISOString();
    console.log(time);
    return time;
  };

  // Returns a string with random number within the given range of Min & Max values
  public async getRandomNumberRange(min: number, max: number): Promise<number> {
    const randomNum = await Math.floor(Math.random() * (max - min + 1) + min);
    return randomNum;
  };

};