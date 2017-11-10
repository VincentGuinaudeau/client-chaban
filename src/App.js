import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Header from './components/header'
import Content from './components/content'

// import { Link } from 'react-router-dom';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null,
			filtered: false,
		};
		this.loadData = this.loadData.bind(this);
	}
	
	loadData(filter) {
		this.setState({ data: null });
		let url = 'http://localhost:1337';
		let param = '';
		let filtered = false;
		if (typeof filter === 'object' && filter !== null && filter.tab === 0)
		{
			if (filter.dateFrom)
				param += (param.length ? '&' : '?') + 'from=' + filter.dateFrom.split('-').reverse().join('-');
			if (filter.dateTo)
				param += (param.length ? '&' : '?') + 'to=' + filter.dateTo.split('-').reverse().join('-');
		}
		if (param.length)
		{
			filtered = true
			url += param
		}
		fetch(url)
		.then( res => res.json())
		.then( data => {
			if (data instanceof Array)
			{
				data.unshift({
					id: 0,
					date: "10/11/17",
					start: "09:20",
					end: "11:00",
					totale: false,
					reason: "MAINTENANCE",
					link: "http://sedeplacer.bordeaux-metropole.fr/Toutes-les-infos-circulation/Pont-Chaban-Delmas-Fermetures/12-11-2017-MAINTENANCE"
				});
				data.unshift({
					id: 1337,
					date: "1/11/17",
					start: "13:37",
					end: "18:00",
					totale: true,
					reason: "Voilier MIR",
					link: "http://sedeplacer.bordeaux-metropole.fr/Toutes-les-infos-circulation/Pont-Chaban-Delmas-Fermetures/12-11-2017-MAINTENANCE"
				});
				if (typeof filter === 'object' && filter !== null && filter.tab === 1)
				{
					const initialLength = data.length;
	
					const compTime = (time_a, time_b) => +time_a.replace(':', '') <= +time_b.replace(':', '');
					const timeInInterval        = time => compTime(filter.timeFrom, time) && compTime(time, filter.timeTo);
					const timeInReverseInterval = time => compTime(filter.timeFrom, time) || compTime(time, filter.timeTo);
	
					if (filter.timeFrom && filter.timeTo)
					{
						// Handling the case where To < From (targeting a time interval including midnight)
						if (compTime(filter.timeTo, filter.timeFrom))
							data = data.filter( e => timeInReverseInterval(e.start) || timeInReverseInterval(e.end));
						else
							data = data.filter( e => timeInInterval(e.start) || timeInInterval(e.end));
					}
					else
					{
						if (filter.timeFrom)
							data = data.filter( e => compTime(filter.timeFrom, e.start) || compTime(filter.timeFrom, e.end));
						if (filter.timeTo)
							data = data.filter( e => compTime(e.start, filter.timeTo) || compTime(e.end, filter.timeTo));
					}
					if (data.length !== initialLength)
						filtered = true;
				}
			}
			this.setState({	data, filtered });
		})
		.catch((error) => {console.log(error); this.setState({ data: { error } })});
	}

	componentDidMount() {
		this.loadData();
	}

	render() {
		const { data, filtered } = this.state;
		const { classes } = this.props;

		return (
			<Grid container justify="center" className={classes.root}>
				<Grid item className={classes.container}>
					<Header data={data} onRefresh={this.loadData}/>
					<Content data={data} filtered={filtered} onRefresh={this.loadData}/>
				</Grid>
			</Grid>
		);
	}
}

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.default,
		width: '100%',
		height: '100vh',
		paddingTop: '20px',
	},
	container: {
		width: '600px',
	},
});

export default withStyles(styles)(App);
