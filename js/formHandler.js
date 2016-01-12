$(function()
{
	var successMsg = "Your message has been sent."; // Message shown on success.
	var failMsg = "Sorry it seems that our mail server is not responding, Sorry for the inconvenience!"; // Message shown on fail.
	
	$("input,textarea").jqBootstrapValidation(
    {
     	preventSubmit: true,
     	submitSuccess: function($form, event)
	 	{
			event.preventDefault(); // prevent default submit behaviour
			
			//var processorFile = "./bin/"+$form.attr('id')+".php";

            var uvSubdomain = "roomflag";

            // Create an API client (non-trusted) within the UserVoice settings/channels section.  Paste the key only here.
            var uvKey = "AK5AeNH43etRDYSWrefcUw";


            var email = $form.find("input.email").val();


            $.ajax({
                dataType: "jsonp",
                url: 'https://' + uvSubdomain + '.uservoice.com/api/v1/tickets/create_via_jsonp.json?callback=?',
                data: {
                    format: "json",
                    client: uvKey,
                    ticket: {
                        message: "I'm interested in RoomFlag!",
                        subject: "Interested in RoomFlag"
                    },
                    //name: name,
                    email: email
                },
                success: function(data) {
                    alert("Thank you! We've set up a ticket for you and will let you know when we've opened our doors");  // You might want to redirect the user here, or show a stylized message to them.
                },
                error: function(d, msg) {
                    //alert("Error");  // Darn -- something went wrong.  You might want to display a message to the user.
                    //console.log(d);
                    //console.log(msg);
                }
            });

            //$.jsonp({
            //    url: 'https://' + uvSubdomain + '.uservoice.com/api/v1/tickets/create_via_jsonp.json?callback=?',
            //    data: {
            //        client: uvKey,
            //        ticket: {
            //            message: "I'm interested in RoomFlag!",
            //            subject: "Interested in RoomFlag"
            //        },
            //        //name: name,
            //        email: email
            //    },
            //    success: function(data) {
            //        alert('Thank you!');  // You might want to redirect the user here, or show a stylized message to them.
            //    },
            //    error: function(d, msg) {
            //        alert("Error");  // Darn -- something went wrong.  You might want to display a message to the user.
            //    }
            //});

         },
         filter: function() // Handle hidden form elements
		 {
			 return $(this).is(":visible");
         },
	 });
});