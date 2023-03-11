$(document).ready(function () {
  // Get HTML elements
  const $saveButton = $('.saveBtn');
  const $hourDivs = $('.time-block');
  const $currentDay = $('#currentDay');

  // Get tasks from local storage
  let tasks = JSON.parse(localStorage.getItem('tasks'));

  // If nothing in local storage, set tasks to empty array
  if (!tasks) {
    tasks = [];
  }

  // Call the three functions when page loads
  function init() {
    applyClass();
    showTasks();
    showCurrentDay();
  }

  init();

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

  function showTasks() {
    // For each item in tasks array
    tasks.forEach((element) => {
      // Find HTML element with id that matches the item's hour
      // Find HTML element's textarea child
      // Set that HTML element's text content to the item's task
      $('#' + element.hour).children('textarea').text(element.task);
    });
  }

  function showCurrentDay() {
    // Get current day and modify format ex. Friday, March 20, 2023
    const currentDay = dayjs().format('dddd, MMMM D, YYYY');
    
    // Set text of currentDay element to the above
    $currentDay.text(currentDay);
  }
});
