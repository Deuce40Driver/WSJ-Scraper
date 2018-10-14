// I was trying to figure out how to render my json results from my scrape to the page. I was trying to make it so the user didnt have to go the /scrape 
// page then back to the home page to see the results, but instead the results would show in the articles card immediately after click the Get Articles button.
// Unfortuantely I need to move on to figuring out the same thing for the the final project.


/*
$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>")
  }
});
*/


$(document).on("click", "#getBtn", function() {
  $("#articles").empty();
  $.ajx({
    method: "GET",
    url: "/articles"  
  }).then(function(data) {
    console.log(data)
  })
})
