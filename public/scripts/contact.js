var serverURL = "http://localhost:8080/api/"

function Messages(name, messages) {
    this.name = name;
    this.messages = messages;
}

function clearForm() {
    $("#txtName").val("");
    $("#txtMessages").val("");
}

function saveMessages() {
    // get the values
    var name = $("#txtName").val();
    var messages = $("#txtMessages").val();

    var theMessages = new Item(name, messages);
    var jsonString = JSON.stringify(theMessages);

    $.ajax({
        // String, numbers, True and false can only be sent through AJAX
            url: serverURL + "message",
            type: "POST", 
            data: jsonString,
            contentType: "application/json",
            success: function(response){
                console.log("Success: ", response);
                // data saved!
                clearForm();
                // show notification
                $("#alertSuccess").removeClass("hidden"); // Showing the text
                // Set how much you want to wait till the function is executed
                setTimeout( function(){
                    $("#alertSuccess").addClass("hidden"); // Hiding the text
                }, 3000); // Time in seconds example (1 sec is 100)
    
            },
            error: function(errorDetails){
                console.log("Error: ", errorDetails);
            }
        });
}