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
	
		var exceptions = 0;
		
		// Simple checking done to see if name has a value
		if(!$('.user-name').val()) {
			$('.user-name').parent('.pad-box').addClass('error');
			$('.user-name-error').text("Please provide a name");
			exceptions++;
			$('.user-name').on("keypress", function(){
				if($('.user-name').val()) {
					$(this).parent('.pad-box').removeClass('error');
					$('.user-name-error').text(' ');
				}
			});
		}

		// Check to see if birth year is <= 2001
		var birth_year = $('select[name="user-birth-year"]')[0].value || 2014;
		if( birth_year > 2001) {
			$('.user-birth-year-error').parent('.pad-box').addClass('error');
			$('.user-birth-year-error').text("Birth year must be >= 2001");
			exceptions++;
			$('select[name="user-birth-year"]').change(function(){
				birth_year = $('select[name="user-birth-year"]')[0].value || 2014;
				if(birth_year <= 2001) {
					$('.user-birth-year-error').parent('.pad-box').removeClass('error');
					$('.user-birth-year-error').text(' ');
				}
			});
		} 

		// Check to see if email is valid
		if(!$('.user-email').val().match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
			$('.user-email').parent('.pad-box').addClass('error');
			$('.user-email-error').text("Please provide a valid email");
			exceptions++;
			$('.user-email').on("keypress", function(){
				if($('.user-email').val().match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
					$(this).parent('.pad-box').removeClass('error');
					$('.user-email-error').text(' ');
				}
			});
		} 

		// Regex to check for five digits with a possible four more digits
		var zip_string = $('.user-zip-code').val() || '';
		if($('.user-ca-resident-yes')[0].checked && !zip_string.match(/^\d{5}(-\d{4})?(?!-)$/)) {
			$('.user-zip-code').parent('.pad-box').addClass('error');
			$('.user-zip-code-error').text("Please provide a valid zip code");
			exceptions++;
			$('.user-zip-code').on("keypress", function(){
				zip_string = $('.user-zip-code').val() || '';
				if($('.user-ca-resident-yes')[0].checked && zip_string.match(/^\d{5}(-\d{4})?(?!-)$/)) {
					$(this).parent('.pad-box').removeClass('error');
					$('.user-zip-code-error').text(' ');
				}
			});
		}

		if(exceptions === 0) {
			// Get rid of form and show success page
			$('.main-form').html("<h1 class='center'>Great Success!</h1><h3 class='center'>One of our team members will contact you shortly.</h3>");
			// Validations pass... Send off to the server
		}



}