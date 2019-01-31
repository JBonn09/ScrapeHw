$(document).ready(function(){
  $.getJSON("/scrape", function(data) {

    console.log(data);

    for (var i = 0; i < data.length; i++) {
   
      $("#news").append("<a href = '"+ data[i].url+"' data-id='" + data[i]._id + "'>" + data[i].title + "</a>");
    }
  });

})

  $(document).on("click", "p", function() {

    $("#").empty();

    var thisId = $(this).attr("data-id");
  

    $.ajax({
      method: "GET",
      url: "/news/" + thisId
    })
     
      .then(function(data) {
        console.log(data);
 
        $("#articles").append("<h2>" + data.title + "</h2>");
 
        $("#articles").append("<input id='titleinput' name='title' >");
      
        $("#articles").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Comment</button>");
  
   
        if (data.articles) {
     
          $("#titleinput").val(data.articles.title);
  
          $("#bodyinput").val(data.articles.body);
        }
      });
  });
  

  $(document).on("click", "#savearticle", function() {

    var thisId = $(this).attr("data-id");

    $.ajax({
      method: "POST",
      url: "/news/" + thisId,
      data: {
   
        title: $("#titleinput").val(),

        body: $("#bodyinput").val()
      }
    })

      .then(function(data) {

        console.log(data);

        $("#articles").empty();
      });
  
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  