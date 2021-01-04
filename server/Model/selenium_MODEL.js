// const { Builder, By, Key, until, Select } = require("selenium-webdriver");
// const { elementIsDisabled } = require("selenium-webdriver/lib/until");
// const fireBase_DAL = require("../DAL/fireBase_DAL");
// require("chromedriver");
// exports.startSelenium = async () => {
//   //Getting data from FireBase DAl and Shaping It For The Selenium Work
//   let finalDataFromFireBase = await fireBase_DAL.getData();
//   let city = finalDataFromFireBase.city;
//   let guests = finalDataFromFireBase.guests;
//   let checkInDate = finalDataFromFireBase.checkIn.split("-");
//   let checkOutDate = finalDataFromFireBase.checkOut.split("-");
//   let checkInDay = checkInDate[1];
//   let checkInMonth = checkInDate[2];
//   let checkInYear = checkInDate[0];
//   let checkOutDay = checkOutDate[2];
//   let checkOutMonth = checkOutDate[1];
//   let checkOutYear = checkOutDate[0];

//   //

//   //Selenium Logic
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get(
//     `https://www.booking.com/searchresults.html?ss=${city}&checkin_year=${checkInYear}&checkin_month=${checkInMonth}&checkin_monthday=${checkInDay}&checkout_year=${checkOutYear}&checkout_month=${checkOutMonth}&checkout_monthday=${checkOutDay}&group_adults=${guests}`
//   );
//   let searchButton = (
//     await driver.findElement(By.xpath('//*[@id="frm"]/div[5]/div[2]/button'))
//   ).click();
// };
const { Builder, By, Key, until, Select } = require("selenium-webdriver");
const { elementIsDisabled } = require("selenium-webdriver/lib/until");
const fireBase_DAL = require("../DAL/fireBase_DAL");
require("chromedriver");
exports.startSelenium = async () => {
  //Getting data from FireBase DAl and Shaping It For The Selenium Work
  let finalDataFromFireBase = await fireBase_DAL.getData();
  let city = finalDataFromFireBase.city;
  let guests = finalDataFromFireBase.guests;
  let checkInDate = finalDataFromFireBase.checkIn.split("-");
  let checkOutDate = finalDataFromFireBase.checkOut.split("-");
  console.log(checkOutDate);
  console.log(checkInDate);
  let checkInDay = checkInDate[2];
  let checkInMonth = checkInDate[1];
  let checkInYear = checkInDate[0];
  let checkOutDay = checkOutDate[2];
  let checkOutMonth = checkOutDate[1];
  let checkOutYear = checkOutDate[0];

  //

  //Selenium Logic
  let driver = await new Builder().forBrowser("chrome").build();
  driver.manage().window().maximize();
  await driver.get(
    `https://www.booking.com/searchresults.html?ss=${city}&checkin_year=${checkInYear}&checkin_month=${checkInMonth}&checkin_monthday=${checkInDay}&checkout_year=${checkOutYear}&checkout_month=${checkOutMonth}&checkout_monthday=${checkOutDay}&group_adults=${guests}`
  );
  let searchButton = await (
    await driver.findElement(By.xpath('//*[@id="frm"]/div[5]/div[2]/button'))
  ).click();
  let firstR = await driver.findElement(
    By.xpath(
      '//*[@id="hotellist_inner"]/div[1]/div[2]/div[1]/div[1]/div[1]/h3/a'
    )
  );
  let secondR = await driver.findElement(
    By.xpath(
      '//*[@id="hotellist_inner"]/div[2]/div[2]/div[1]/div[1]/div[1]/h3/a'
    )
  );
  let thirdR = await driver.findElement(
    By.xpath(
      '//*[@id="hotellist_inner"]/div[3]/div[2]/div[1]/div[1]/div[1]/h3/a'
    )
  );
  let firstHotel = await firstR.getAttribute("href");
  let secondHotel = await secondR.getAttribute("href");
  let thirdHotel = await thirdR.getAttribute("href");
  let returnFinalHotelsObject = {
    firstHotel: firstHotel,
    secondHotel: secondHotel,
    thirdHotel: thirdHotel,
  };
  return returnFinalHotelsObject;
};
45;
