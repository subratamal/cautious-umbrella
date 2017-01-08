import React, { Component, PropTypes } from 'react'

class UniversitySearchResult extends React.Component {
  render() {
  	return(
  		<div className="ui grid">
	  		<div className="sixteen wide column">
	  			<p className="ui header search-result-text">University in Location, Degree and
	  			Course</p>
	  			<p><small className="result-count">Showing 2345 results</small></p>
	  		</div>
  		</div>
  	)
  }
}

export default UniversitySearchResult