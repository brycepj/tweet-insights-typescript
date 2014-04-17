
$(document).ready(function(e) {
    
    console.log("Sending ajax request...");

		$.ajax({
            type: "GET",
            url: "/timeline",
            success: function (data) {
            	data = JSON.parse(data);
            	for (var i = 0; i < data.length; i++){
            		console.log(data[i].text);
            	}
            }
        });    	
});				//end jQuery...
