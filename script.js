// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // Get HTML elements
  const $saveButton = $('.saveBtn');
  const $hourDivs = $('.time-block');

  // When save button is clicked
  $saveButton.on('click', function() {
    // Get value of clicked button's parent element's id
    const hour = $(this).parent().attr('id');

    // Get value of input element that corresponds to clicked button
    const task = $(this).parent().children('textarea').val();

    // Create object for event with hour and task
    const entry = {
      hour: hour,
      task: task
    };

    // Add event to tasks array
    tasks.push(entry);

    // Stringify tasks array and add to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  function applyClass() {
    // Get the current hour
    const currentHour = dayjs().hour();

    // For each of the hour divs
    $hourDivs.each(function() {
      // Get the value of the id, convert to int
      const divHour = parseInt($(this).attr('id'));

      // Compare div hour to current hour and add class to div accordingly
      if (divHour < currentHour) {
        $(this).addClass('past');
      } else if (divHour === currentHour) {
        $(this).addClass('present');
      } else if (divHour > currentHour) {
        $(this).addClass('future');
      }
    });
  }
  applyClass();
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  // Get tasks from local storage
  let tasks = JSON.parse(localStorage.getItem('tasks'));

  // If nothing in local storage, set tasks to empty array
  if (!tasks) {
    tasks = [];
  }

  function showTasks() {
    // For each item in tasks array
    tasks.forEach((element) => {
      // Find HTML element with id that matches the item's hour
      // Find HTML element's textarea child
      // Set that HTML element's text content to the item's task
      $('#' + element.hour).children('textarea').text(element.task);
    });
  }

  showTasks();

  // TODO: Add code to display the current date in the header of the page.
});
