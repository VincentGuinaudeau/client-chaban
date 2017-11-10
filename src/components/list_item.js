import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import BoatIcon from 'material-ui-icons/DirectionsBoat';
import BuildIcon from 'material-ui-icons/Build';

const weekDays = [
	"Dimanche",
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi"
]

const months = [
	"janvier",
	"février",
	"mars",
	"avril",
	"mai",
	"juin",
	"juillet",
	"août",
	"septembre",
	"octobre",
	"novembre",
	"décembre"
]

function convert_hour(str)
{
	return str.replace(':', ' h ').replace(/ 00$/, '');
}

class Content extends Component {

	render() {
    	const { elem, classes } = this.props;

		let reason = "Passage du " + elem.reason;
		if (elem.reason === "MAINTENANCE")
			reason = "Maintenance";

		// tranforming the date to a more readable format (dd/mm/yy => weekDay MonthDay month)
		const parsed_date = elem.date.split('/');
		const date = new Date();
		date.setFullYear('20' + parsed_date[2]);
		date.setMonth(parsed_date[1] - 1);
		date.setDate(parsed_date[0]);
		const display_date = weekDays[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()];

		return (
			<a target="_blank" href={elem.link} className={classes.link}>
				<ListItem button>
					<Avatar>
						{
							elem.reason === "MAINTENANCE" ?
							<BuildIcon/> :
							<BoatIcon/>
						}
					</Avatar>
					<ListItemText
						primary={<span><b>{display_date}</b> : de <b>{convert_hour(elem.start)}</b> à <b>{convert_hour(elem.end)}</b></span>}
						secondary={<span>{reason} : Fermeture {elem.totale ? "totale" : "partielle"}.</span>}
						className={classes.text}
					/>
				</ListItem>
			</a>
		);
	}
}

const styles = theme => ({
	link: {
		textDecoration: 'none',
	},
	text: {
		textAlign: 'start',
	},
});

export default withStyles(styles)(Content);
