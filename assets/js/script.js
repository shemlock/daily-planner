//Make sure the document is loaded fully before running js
$(document).ready(function() {

    //1.GETTING THE DATE 

    // Use advancedFormat plugin to get "th,nd,rd,st" added to the date

    dayjs.extend(window.dayjs_plugin_advancedFormat);
  
    /* 
    - Create currentDay variable and store todays date in it
    - Use dayjs library to get todays date 
    - Set the dates format and use Do to get the "th,nd,rd,st" bit
    */

    var currentDay = dayjs().format('dddd, MMMM Do');

    // Use $ and # to select the element from your HTML that has the id "current day"
    // Then set the text for it to be the currentDay variable (which stores today's date in the preferred format) 

     $('#currentDay').text(currentDay);

    //2. ADDING THE HOURS, WORK BLOCKS AND SAVE BUTTON

    //Declare variables for starting and ending hours 
    //Set them to 9am and 5pm

    var hoursStart = 9;
    var hoursEnd = 17; 

    /* 
    - Declare a function for converting the start and end hours
    - Converting them from 24 hour format to 12 hour format
    - Set hour as the parameter 

    - Use an if statement to check if hour is >= 12
    
    - If it is, it'll be formatted as PM by
    - Checking if the hour is exactly 12 
    - Then using a ternary operator
    - If it equal to 12 then 12 is returned, if not the hour minus 12 is returned
    - 12 is taken away from the hour to convert it from 24hour to 12hour
    - eg 13 would become 1
    - Then a PM string is concatenated to the result


    - If not, it'll be formatted as AM by
    - Checking if the hour is exactly 0
    - Then using a ternary operator
    - If it is equal to 0 then 12 is returned
    - Because 0 in 24hour is 12 in 12hour
    - If its not equal to 0, the hour is returned
    - Then a AM string is concatenated to the result
    */

    function convertTime(hour) {
        if (hour >=12) {
            return (hour === 12 ? 12: hour - 12) + ' PM';
        }   else {
            return (hour === 0 ? 12: hour) + ' AM';
        }
    }

    /*
    - Declare the container variable 
    - Select the container class from the html by using $ and .
    - Assign it to the container variable
    */

    var container = $('.container');

    /*
    - Use a for loop with the hour variable to loop through all the hours
    - The starting point is the hour variable with the value of hoursStart variable
    - The condition is hour being less than or equal to the value of the hoursEnd variable
    - The increment is hour plus one

    - Declare a varaible called workBlock
    - Create a new div element
    - Add classes to style it
    - Add a data attribute to store the hour value
    - Use $ to create a new div in the html
    - Use .addClass to add the "time block" class and the "row" class
    - These are in the CSS
    - Use .attr to set the data attribute "data-time"
    - Set data-time to the value of hour

    - Declare a variable called hourCol
    - Create a new div element using $
    - Use .addClass to add "hour" and "col-1" classes
    - hour class is in the CSS
    - col-1 is Bootstrap class for grid layout, setting the column 
      width in the grid to be 1 out of 12 for all size devices
    - Use .text to set the text for the div
    - Call the convertTime fucntion and pass hour as the argument

    - Declare a variable called taskText
    - Create a new textarea element in the HTML using $
    - Needs to be a textarea element so users can input multiple
      lines of text if they want to
    - Use .addClass to add "description" and "col-10" classes
    - description class is in the css
    - col-10 is Bootstrap, setting the column width as 10 
      out of 12 columns on all size devices
      
    - Declare a variable called saveButton
    - Create a new button element in the HTML using $
    - Use .addClass to add "saveBtn" and "col-1" classes
    - saveBtn is in the CSS
    - col-1 is Bootstrap
    - use .html to add an icon for the save button
    - add the classes from Font Awesome for getting 
      a plus sign icon (using version 5.15.4)
    */

    for (var hour = hoursStart; hour <= hoursEnd; hour++) {

        //the entire row
        var workBlock = $('<div>').addClass('time-block row').attr('data-time', hour);
        
        //for the hour column
        var hourCol = $('<div>').addClass('hour col-1').text(convertTime(hour));

        //for the text area where user can input tasks or events
        var taskText = $('<textarea>').addClass('description col-10');
        
        //for the save button 
        var saveButton = $('<button>').addClass('saveBtn col-1').html('<i class="fas fa-plus-square"></i>')
        
        //append hourCol, taskText and saveButton to workBlock
        workBlock.append(hourCol, taskText,saveButton);

        //append timeBlock to the container class
        $('.container').append(workBlock);

    }
  
});