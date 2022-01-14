import React from 'react';
import '../styles/ActivityCard.css';

//----------------------------------------------------------------------------------------------------------------

export default function ActivityCard(activity){
	return(
		<div id="actividades">
			{activity && (
				<div>
					<p>{activity.name} in {activity.season}</p>
					<p>Duration: {activity.duration}min</p>
					<p>Difficulty: {activity.dificulty}</p>
				</div>
			)}
		</div>
	)
}