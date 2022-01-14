import React from 'react';
import '../styles/landingPage.css';
import { Link } from 'react-router-dom';
//-------------------------------------------------------------------------------------------------

export default function LandingPage(){
	return(
	<div className="landing">
		<div className="containerLanding">				
			<Link to='/home'>
				<button className="btn"><strong>TAKE IT!</strong></button>
			</Link>				
		</div>
	</div>
	)
}