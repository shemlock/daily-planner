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

    function convertTime(hour) {
        if (hour >=12) {
            return (hour === 12 ? 12: hour - 12) + ' PM';
        }   else {
            return (hour === 0 ? 12: hour) + ' AM';
        }
    }

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
      the floppy disk save icon (using version 5.15.4)

      -Then append hourCol, taskText and saveButton 
        to workBlock
      -Then append workBlock to the container
      
    */

    
    for (var hour = hoursStart; hour <= hoursEnd; hour++) {

        //for the entire row
        var workBlock = $('<div>').addClass('time-block row').attr('data-time', hour);
        
        //for the hour column
        var hourCol = $('<div>').addClass('hour col-1').text(convertTime(hour));

        //for the text area where user can input tasks or events
        var taskText = $('<textarea>').addClass('description col-10');
        
        //for the save button 
        var saveButton = $('<button>').addClass('saveBtn col-1').html('<i class="fas fa-save"</i>')
        
        //appending hourCol, taskText and saveButton to workBlock
        workBlock.append(hourCol, taskText,saveButton);

        //appending timeBlock to the container class
        $('.container').append(workBlock);

        //Added from Step 3
        //loading the saved data for each time block

        /*
        -Declare a variable called savedData
        -Set the value to be the result of 
         calling the loadingData function and passing 
         hour as the argument. 
        -Use an if statement to check if savedData has any value
         (ie any data has been loaded from local storage)
        -If it does then use JQuery's .val method
         to set the value of taskText to be the value in savedData 
         */
         var savedData = loadingData(hour);
         if (savedData) {
             taskText.val(savedData);
        }
    }

  //3. SAVING USER INPUTS TO LOCAL STORGARE
    
  /*
    - Declare a function called savingData
    - Set the parameters to hour and data 
    - hour is gunna represent which specific work block it is using the hour number
    - data is gunna represent whatever the user inputs into 
      the text area bit. 
    - Access the localStorage object. 
    - Then call the setItem method on the localStorage object
      to save the data 
    - setItem takes 2 arguments ( 'key', 'value')
    - make the key 'work-block' + hour 
    - This will give each workBlock a unique key, like work-block1, work-block2
    - Make the value data

  */

  // Function for saving data to local storage
    function savingData(hour, data) {
      localStorage.setItem('work-block' + hour, data);
    }

  /*
    - Declare a function called loadingData
    - Set the parameter to hour
    - This is used to identify which specific work block the data should be loaded from 
    - Then load the data by: 
      returning the result of
      calling the getItem method on the localStorage object
    - Then use the key 'work-block' + hour , from the 
      savingData function, so it returns any data associated 
      with that key. 
  */

  // Function for loading the data from local storage
    function loadingData(hour) {
      return localStorage.getItem('work-block' + hour);
  }

  /* 
    - Declare a function called removingData
    - Set the parameter to hour
    - Access the localStorage object 
    - Then delete data by:
      calling the removeItem method on the localStorage object
    - Use the key 'work-block' + hour 
  */
  // Function for removing data from local storage 
    function removingData(hour) {
        localStorage.removeItem('work-block' + hour);
    }

/* 
 Now that the loadingData function has been created
 Make sure to add it to the for loop in step two 
 So that if there is saved data, it can be loaded
 to the text area from local storage.  
*/

// EVENT LISTENERS

/*
 - Select the container class
 - Set up the event listener by: 
 - calling JQuerys on method to create the event listener
 - setting the type of event to be 'click'
 - Then use the .saveBtn selector to specify that 
   when the click event happens your looking to target 
   elements that have the saveBtn class 
 - Declare a function to be the argument for the on method

 - For the event handling fucntion 
 - Declare a variable called hourTime
 - Use JQuerys 'this' keyword to refer
   to the element that triggered the event
   (ie the saveBtn)
 - Check to html to see where data-time is in relation
   to saveBtn. 
 - saveBtn is a child of data-time so use the .parent method 
 - Then to find out what hour it is use the data() method 
   and access the data-time attribute using 'time'
   (The data-time attribute was added to workBlock in step one)

 - Declare a variable called userText
 - Use 'this' again. 
 - Check the html to see where description is in relation
   to the saveBtn 
 - Description comes right before saveBtns so use 
   the .prev method
 - use the val method to get the value of description
   (ie whatever text the user entered)

 - Then call the savingData function
 - Pass hourTime and userText as the arguments 
*/

// Event listener for clicks on the save buttons.
$('.container').on('click', '.saveBtn', function() {
    var hourTime = $(this).parent().data('time');
    var userText = $(this).prev('.description').val();
    savingData(hourTime, userText);
});

/*
 - Select the container class
 - Set up the event listener by: 
 - calling the on method to create the event listener
 - setting the type of event to be 'input'
 - Then use the .description selector to specify that 
   your looking to target inputs in elements that have
   the description class 
 - Declare a function to be the argument for the on method

 - Declare a variable called hourBlock
 - Use JQuerys 'this' keyword to refer
   to the element that triggered the event
   (ie the text area that has the description class)
 - Check the html to see where time-block is in relation
   to description. 
 - time-block is the parent of description but don't
   use .parent like before, use .closest for flexibility
 - This way no matter how nested the elements get or if 
   the html changes, it'll still find the closest time-block
 - To find out what hour it is use the data() method 
   and access the data-time attribute using 'time'.

 - Then create an if statement that checks if descritption
    is empty. 
 - If it is, then corresponding data will be removed 
    from Local Storage. 
 - Call the removingData function and pass hourBlock as 
    the argument. 
  
 */

// Event listener for removing data if the text area 
// is empty 
$('.container').on('input', '.description', function() {
    var hourBlock = $(this).closest('.time-block').data('time');
    if ($(this).val() === '') {
        removingData(hourBlock);
    } 
});




});