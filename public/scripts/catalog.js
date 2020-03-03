//var serverURL = "http://restclass.azurewebsites.net/API/"; // Ajax is asking this server
var serverURL = "http://localhost:8080/api/"
var categories = [];
var items = [];


function fetchCatalog(){
   /* items = [
        {
            // Item 1
            "code" : "123",
            "description" : "Football",
            "price" : 99.55,
            "image" : "https://purepng.com/public/uploads/large/purepng.com-american-footballamerican-footballamericanfootballgridiron-footballgridironsportoval-1701528085915z1rba.png",
            "category" : "Outdoor",
            "stock" : 99,
            "deliveryDays" : 18
            // End Outline
        },
        {
            // Item 3
            "code" : "456",
            "description" : "Gatorade",
            "price" : 43.88,
            "image" : "https://product-images.ibotta.com/offer/JwrRKPv6yPT91LyX1FY_nA-normal.png",
            "category" : "Outdoor",
            "stock" : 199,
            "deliveryDays" : 8
            // End Outline
        },
        {
            // Item 3
            "code" : "789",
            "description" : "Water",
            "price" : 19.99,
            "image" : "data:image/png;base64,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",
            "category" : "Outdoor",
            "stock" : 299,
            "deliveryDays" : 4
            // End Outline
        },
    ]*/
    // Items from this function will be brought down there
    $.ajax({
        url: serverURL + "items",
        type: "GET",
        success: function(response){
            console.log("Response: ", response);
            
            // Solve, show only MY items
            // travel response array
            // get each item on the array
            // if the item.user == "Leo"
            // then, push item into items array

            for(var i=0; i < response.length; i++){
                var item = response[i];
                if(item.user == "Leo"){
                    items.push(item);
                }
            }
            displayCatalog();
        },
        error: function(errorDetails){
            console.log("Error: ", errorDetails)
        }
    });
}

function displayCatalog(){
    // travel the array
    for(var i=0; i < items.length; i++){ // up here i++ makes the 0 a 1
        // get the item
        var item = items[i]; // i in the slot is for the array up there
        // draw the item on the DOM (HTML)
        drawItem(item);

        var cat = item.category;
        // ask if the categories array contains cat
        if( !categories.includes(cat) ){
            // then push cat into categories
            categories.push(cat);
        }
    }
    console.log(categories);
    drawCategories();
}

function drawItem(item){ // Down here
    // create the syntax
    var sntx = 
    `<div class='item'>
        <img src='${item.image}'>
        <label class='code' >${item.code}</label>
        <label class='category' >${item.category}</label>
        <label class='description' >"${item.description}</label> 
        <label class='price' >$ ${(item.price * 1).toFixed(2)}</label>
        <button class='btn btn-sm btn-info'> + </button>
    </div>`;
    // get the element from the screen
    var container = $("#catalog");
    // append the syntax to the element
    container.append(sntx);
}

function drawCategories(){
    // Get the container for categories
    var container = $("#categories");
    // travel the categories array
    for(var i=0; i< categories.length; i++){
        var c = categories[i];
        // create an LI for category
        var li = `<li class="list-group-item"><a href="#" onclick="searchByCategory">${c}</a> </li>`;
        // add li to container
        container.append(li);
    }
}


function search(){
    console.log("User wants to search")

    var text = $("#txtSearch").val().toLowerCase(); // Get the text
    
    // clear prev results
    $("#catalog").html("")

    // Travel array and show only items that contains the text
    for(var i=0; i< items.length; i++){
        var item = items[i];

        // If the title contains the text, then show the item on the screen
        // OR the catagory contains the text
        // OR the code is equal to the text
        // OR the preice is equal to the text
        // Then show the item on the screen
        if( item.description.toLowerCase().includes(text)
            || item.category.toLowerCase().includes(text)
            || item.code == text
            || item.price == text
        ){
            drawItem(item);
        }
        if ( item.category.toLoweCase() == catName.toLowerCase() ){
            drawItem(item);
        }
    }
}

function searchByCategory(catName){
    console.log("Search by cat", catName);

    // clear

    // travel the array

}

function init(){
    console.log("This is the Catalog")

    // Get Data
        fetchCatalog();
        displayCatalog();

    // hook events
    $("#btnSearch").click(search)
    // Making Enter key work
    $("#txtSearch").keypress( function(e){
        // console.log(e); <-- Shows us information of keys that are  pressed!!!

        if(e.keyCode == 13 ){
            search();
        }
    });

    // Contains the item css class
    $("#catalog").on("click", ".item", function(){
        //console.log("The element was selected!");
        //$(this).toggleClass("selected");
        var img = $(this).find('img').clone();

        $(".modal-body").html(img);
        $("#modal").modal();
     });

}

// HTTP Methods
// HTTP status codes

window.onload = init;

// Get, Post, Put, Patch, Delete
// Get can not send anything to the server
// Everything else is used to send to the server. ["HTTP ACTIONS"]
// HTTP STATUS CODES <--- Website