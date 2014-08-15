/* This is the main.js file for the form */

var birth_year;

$(document).ready(function() {

	/******************************
	******** Validations **********
	Name (textfield) ✓
	Birth Year (drop down) ✓
	Entered value must be numeric
	Selected value must be less than or equal to 2001
	Email (textfield) ✓
	Entered value must be a valid email address
	California Resident? (Check Box) ✓
	Unchecked by default ✓
	Zip Code (textfield) ✓
	Only enabled when "California Resident" check box is checked ✓
	Entered value must be valid US zip code ✓
	Submit Button ✓
	********************************/

	// Add option to select statement on load
	// Better to count down (assuming people are more likely 0 years old than 114)
	for(var i=2014; i >= 1900; i--) {
		$('.user-birth-year').append($("<option class='option-select'></option>")
         .attr("value",i)
         .text(i)); 
	}


	// Removed webkit form functionality, so need to manually track new select clicks
	$('.option-select').click(function() {
		window.alert("something:",$(this.val()));
	});
	
	// Show zip code box if CA Resident is selected
	$('.user-ca-resident-yes').click(function() {
		$('.hiding').removeClass('hiding').addClass('showing');
	});

	// Reverse if the CA Resident is changed
	$('.user-ca-resident-no').click(function() {
		$('.showing').removeClass('showing').addClass('hiding');
	});


});

var formSubmit = function() {
	
		
		// Simple checking done to see if name has a value
		if(!$('.user-name').val()) {
			$('.user-name').parent('.pad-box').addClass('error');
			$('.user-name-error').text("Please provide a name");
			$('.user-name').on("keypress", function(){
				if($('.user-name').val()) {
					window.alert('clicked');
					$(this).parent('.pad-box').removeClass('error');
					$('.user-name-error').text(' ');
				}
			});
		}

		window.alert("birth year ", $('select[name="user-birth-year"]').text());
		// Check to see if birth year is <= 2001
		if(!parseInt($('select[name="user-birth-year"]').text()) <= 2001) {
			$('.user-birth-year').parent('.pad-box').addClass('error');
			$('.user-birth-year-error').text("Birth year must be >= 2001");
			$('.user-birth-year').on("keypress", function(){
				if($('.user-birth-year').val()) {
					$('.user-birth-year').parent('.pad-box').removeClass('error');
					$('.user-birth-year-error').text(' ');
				}
			});
		}  

		// Regex to check for five digits with a possible four more digits
		var zip_string = $('.user-zip-code').val() || '';
		if(!zip_string.match(/^\d{5}(-\d{4})?(?!-)$/)) {
			$('user-zip-code').addClass('error');
			$('.user-zip-code-error').text("Please provide a valid zip code");
		}


		// Get rid of form and show success page

		// Validations pass... Send off to the server
		

}