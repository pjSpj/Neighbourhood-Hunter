$(".chosen-select").chosen({ width: "95%"})

var isValid = true;
let user = {}

$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    
   if ($(".chosen-select").val() === "0") {
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
        }  
        
        console.log(user)  
        // CLEAR USER INPUT ON SUBMIT
        $(".chosen-select").val("").trigger("chosen:updated");

        return user
    }
    else {
        alert("Fill in the selections");
    }

    db.Survey.create({
        housing: user.question1,
        social: user.question2,
        outdoors: user.question3,
        health: user.question4

    }).then(function(data) {
        console.log(data);
      res.json(data);
    //   $.ajax("/api/newSurvey", {
    //     type: "POST",
    //     data: newBurger
    //   }).then(
    //     function() {
    //       console.log("Cooked up a burger!");
    //       location.reload();
    //     }
    //   );
    });

});

