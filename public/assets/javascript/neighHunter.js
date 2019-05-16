$(".chosen-select").chosen({ width: "95%"})

$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    var isValid = true;
    var user = {}
    
   if (($(".chosen-select").val() === "0") || ($(".chosen-select").val() === null)) {
        isValid = false;
    }
    //Get value of name and photo 
    //Push answers into array in object, push photo and name into object
    if (isValid === true) {
        user = {
                question1: $("#q1").val(),
                question2: $("#q2").val(),
                question3: $("#q3").val(),
                question4: $("#q4").val(),
                question4: $("#q5").val()
        }  
        
        console.log(user)  
        // CLEAR USER INPUT ON SUBMIT
        $(".chosen-select").val("").trigger("chosen:updated");
        $(".location").val("");


      $.ajax("/api/newSurvey", {
        type: "POST",
        data: user
      }).then(
        function() {
            console.log("request sent");
            location.replace("/result");
        }
      );

    }
    else {
        alert("Fill in the selections");
    }
    // db.Survey.create({
    //     housing: user.question1,
    //     social: user.question2,
    //     outdoors: user.question3,
    //     health: user.question4

    // }).then(function(data) {
    // });
});

