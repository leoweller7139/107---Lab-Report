//var serverURL = "http://restclass.azurewebsites.net/API/"; // Ajax is asking this server
var serverURL = "http://localhost:8080/api/"

// Object Constructor -- Starts with Cap // (code) this.code = code
function Item(code, desc, price, image, category, stock, deliveryDays){
    this.code = code;
    this.description = desc;
    this.price = price;
    this.image = image;
    this.category = category;
    this.stock = stock;
    this.deliveryDays = deliveryDays;
    this.user = "Leo"; 
}

function clearForm(){
    $("#txtCode").val("");
    $("#txtCode").focus();
    $("#txtDescription").val("");
    $("#txtPrice").val("");
    $("#txtImage").val("");
    $("#txtCategory").val("");
    $("#txtStock").val("");
    $("#txtDeliveryDays").val("");
}

function saveItem(){
    // get the values
    var code = $("#txtCode").val();
    var desc = $("#txtDescription").val();
    var price = $("#txtPrice").val();
    var image = $("#txtImage").val();
    var category = $("#txtCategory").val();
    var stock = $("#txtStock").val();
    var delivery = $("#txtDeliveryDays").val();

    // create an object
    var theItem = new Item(code, desc, price, image, category, stock, delivery );
    // Only need to send this variable to the server because it contains all information
    // instead of all 7 seperatly, its more NEAT

    var jsonString = JSON.stringify(theItem);

    //send object to server
    $.ajax({
    // String, numbers, True and false can only be sent through AJAX
        url: serverURL + "items",
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

function recieveMessage(){
    
}

function drawItem(){

}
    function displayMessage(){
        console.log(messagelist);
        // getg the container for categories
        var container = $("#messages");

        for (var i = 0; i < messagelist.length; i++){
            var c = messagelist[i];
            var li 
        }
    }

function testAjax(){ // Ajax is a commincation function to recieve and send data to servers
    // Async
    // Javascript
    // And
    // XML com JSON
    $.ajax({
        url: serverURL + "test",
        type: 'GET', // No Data / Can't send anything to server
        success: function(res){
            console.log("Payment Finished");
            console.log("Server says", res);
        },
        error: function(err){
            console.log("Payment Finished");
            console.log("Error Occured", err);
        },
    });
    //console.log("Done, Thank you for the payment");
    //console.log("Not Finished Yet");
}

function init(){
    console.log("This is Admin page!!");

    // retrieve initial date

    // hook events
    $("#btnSave").click(saveItem)
}


window.onload = init;