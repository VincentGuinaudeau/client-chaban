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
		}
		this.loadData = this.loadData.bind(this);
	}
	
	loadData() {
		this.setState({ data: null });
		fetch('http://localhost:1337')
		.then(res => res.json())
		.then(data => {
			data.unshift({
				id: 0,
				date: "1/11/17",
				start: "13:00",
				end: "18:00",
				totale: true,
				reason: "Voilier MIR",
				link: "http://sedeplacer.bordeaux-metropole.fr/Toutes-les-infos-circulation/Pont-Chaban-Delmas-Fermetures/12-11-2017-MAINTENANCE"
			});
			this.setState({	data });
		})
		.catch(error => this.setState({ data: { error } }));
	}

	componentDidMount() {
		this.loadData();
	}

	render() {
		const { data } = this.state;
		const { classes } = this.props;

		return (
			<Grid container justify="center" className={classes.root}>
				<Grid item className={classes.container}>
					<Header data={data} onRefresh={this.loadData}/>
					<Content data={data} onRefresh={this.loadData}/>
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
	paper: {
		padding: 16,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
});

export default withStyles(styles)(App);
