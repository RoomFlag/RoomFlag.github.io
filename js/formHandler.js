

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

                var email = $form.find("input.email").val();

                // Google Sheets Email Insert (GET https://script.google.com/macros/s/AKfycbzVaB0QneZdlR323dU-XYJHuqOMF8rpiKluMlWzZijKu1RV5fS7/exec)

                jQuery.ajax({
                    url: "https://script.google.com/macros/s/AKfycbzVaB0QneZdlR323dU-XYJHuqOMF8rpiKluMlWzZijKu1RV5fS7/exec",
                    type: "GET",
                    data: {
                        "insert": "{\"SHEET_NAME\":\"Sheet1\",\"DATA\":[{\"email\":\"" + email + "\",\"date\":\"" + $.now() + "\"}]}",
                    }
                })
                    .done(function(data, textStatus, jqXHR) {
                        console.log("HTTP Request Succeeded: " + jqXHR.status);
                        console.log(data);
                        alert("Thank you! We've set up a ticket for you and will let you know when we've opened our doors");  // You might want to redirect the user here, or show a stylized message to them.
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log("HTTP Request Failed");
                    })
                    .always(function() {
                        /* ... */
                    });


            },
            filter: function() // Handle hidden form elements
            {
                return $(this).is(":visible");
            },
        });
});