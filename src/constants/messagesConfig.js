/* Error Messages Mapping */

export const LOGIN_ERRORS = Object.freeze({
	accountDisabled : 'Your account is Disabled.'
})

export const RegExps = Object.freeze({
	name : /^[a-zA-Z][a-zA-Z0-9]{1,}$/
})

export const authenticationErrors = Object.freeze({
	wrongCredentials : 'Wrong username or password.',
	noAccountWithEmail : 'Error: no Drupal account was found for the specified email',
	noAccountWithPhone : 'Error: no Drupal account was found for the specified phone'
})

export const serverErrors = Object.freeze({
	invalidCredsErrorTxt : 'Username or Password is incorrect',
	accountNotPressentErrorTxt : 'Account with this Email does not exist',
	serverIssue : 'Internal Server Error',
	noRecords : "No records found.",
	noFeedMsg : "No activity yet",
	serverErrorMsg : 'Something went wrong. Please try Again"'

})

export const loginErros = Object.freeze({
	wrongOTP : "Wrong OTP entered. Please re-check the OTP code.",
	noAccount : "No account was found for the specified email or phone number.",
	serverIssue : "Something went wrong. Please try again.",
	wrongUserNameOrPass : 'Wrong username or password.',
	phoneNumberMissing : "Your phone number is not registered with us."
})

export const verificationMsgConfig = Object.freeze({
	validationSuccess : 'Verification Success.',
	verifyAccountMsg : 'Please verify your account.',
	emailVerifyText : 'Verify with Email',
	sendCodeToMobileText : 'Send verification code to mobile.',
	incorrectAccText : 'Not your Account?',
	codeSentText : 'Verification code sent successfull. Please Follow the steps sent to your mail.',
	enterCodeText : 'Please Enter the 6 digit code we have sent to your mobile',
	notRecievedText: 'Didn\'t get it?',
	resentConfirmation : 'Send it again?',
	retypeText : 'Re-type the number',
	retypeEmailText : 'Re-type the email',
	passwordResetMailText : 'Your password reset email has been sent!',
	checkInboxText : 'Please check your inbox to continue.',
	emailSentText : 'Email Sent.',
	retypeNumberText : "Re-type phone number"




})


export const validationErrors = Object.freeze({
	required : 'Required',
	noError	 : '',
	password : {
		minLengthMsg : "Password must contain atleast 6 letters"
	},
	email :{
		invalidEmailMsg : "Invalid email address",
		emailRegEx : new RegExp ('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$','i')
	},

	mobile: {
		invalidPhoneNumberMsg : "Invalid Phone number. Make sure you added country code.",
		RgEx : /^\+(?:[0-9] ?){6,14}[0-9]$/
	},

	fullname : {
		"required":"Full Name field is required.",
		"invalid" : "Name should be atleast 3 characters without special keys.",
		"RgEx": /^[a-zA-Z][a-zA-Z0-9\s]{1,}$/
	},
	OTP: {
		"invalid" 	: "Code should be exactly 6 numbers.Please try again",
		"wrongOTP" 	: "Please re-check the OTP code or phone number is been verified already.",
		"phoneNumberMissing" : "Phone number is missing to send OTP."
	}
})

export const unAtuhorizedTexts = Object.freeze({
	invalidCreds : "Unauthorized : Wrong username or password.",
	invalidToken : "Unauthorized",
	accountNotPressent : "Unauthorized : Error: no Drupal account was found for the specified email"
})

export const customMessages = Object.freeze({
	tryAgain : "Please try again."
})
