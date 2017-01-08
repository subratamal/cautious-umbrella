import countryData from 'country-data'
const createLocationString = function  (locationObj) {
	let countries = countryData.countries;
	let locationString =''
	if(locationObj){
		if(locationObj.city){
			locationString = locationObj.city + ', '
		}
		if(locationObj.country){
			locationString = locationString + countries[locationObj.country].name
		}
	}
	
	return locationString
	
}

export default createLocationString