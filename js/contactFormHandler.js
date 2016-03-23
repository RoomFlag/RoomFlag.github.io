$(function() {

  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "timeOut": "50000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  var successMsg = "Your message has been sent."; // Message shown on success.
  var failMsg = "Sorry it seems that our mail server is not responding, Sorry for the inconvenience!"; // Message shown on fail.

  $("input,textarea").not("[type=submit]").jqBootstrapValidation({
    preventSubmit: true,
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour

      var email = $form.find("input.email").val();
      var name = $form.find("input.contact-name").val();
      var phone = $form.find("input.contact-phone").val();
      var message = $form.find("textarea.contact-message").val();

      // Google Sheets Email Insert (GET https://script.google.com/macros/s/AKfycbzVaB0QneZdlR323dU-XYJHuqOMF8rpiKluMlWzZijKu1RV5fS7/exec)

      jQuery.ajax({
          url: "https://script.google.com/macros/s/AKfycbySMTMYq2E56M_-WgCP-z2Pi-v0lpaNIeRZQramji0t_z_0eBQ/exec",
          type: "GET",
          data: {
            "insert": "{\"SHEET_NAME\":\"Sheet1\",\"DATA\":[{\"email\":\"" + email + "\",\"date\":\"" + $.now() + "\"}]}",
          },
          data: {
            "insert": "{\"SHEET_NAME\":\"contact_sheet\",\"DATA\":[{\"email\":\"" + email + "\",\"date\":\"" + $.now() + "\",\"name\":\"" + name + "\",\"phone\":\"" + phone + "\",\"message\":\"" + message + "\"}]}",
          }
        })
        .done(function(data, textStatus, jqXHR) {
          console.log("HTTP Request Succeeded: " + jqXHR.status);
          console.log(data);
          // toastr["success"]("Thank you. Look out for an email from us soon!");
          // alert("Thank you! We've set up a ticket for you and will let you know when we've opened our doors"); // You might want to redirect the user here, or show a stylized message to them.
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          // console.log("HTTP Request Failed");
          toastr["error"]("Whoops. Something went wrong. Please try again.");
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
