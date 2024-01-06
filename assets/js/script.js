//Make sure the document is loaded fully before running js
$(document).ready(function() {

    //1.GETTING THE DATE 

    //use advancedFormat plugin to get "th,nd,rd,st" added to the date

    dayjs.extend(window.dayjs_plugin_advancedFormat);
  
    //create currentDay variable and store todays date in it
    //use dayjs library to get todays date 
    //set the dates format and use Do to get the "th,nd,rd,st" bit

    var currentDay = dayjs().format('dddd, MMMM Do');

    //Use $ to select the element from your HTML that has the id "current day"
    //Then set the text for it to be the currentDay variable (which stores today's date in the preferred format) 

     $('#currentDay').text(currentDay);
  
});