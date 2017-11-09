import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import { LinearProgress } from 'material-ui/Progress';

import ListItem from './list_item';

class Content extends Component {

	render() {
		const { data, classes } = this.props;

		let error = null

		switch (true) {
			case (data === null): // chargement
				return (
					<Paper className={classes.paper}>
						<LinearProgress color="accent"/>
					</Paper>
				);
			break;
				
			case (data instanceof Array && !!data.length): // Données
				return (
					<Paper className={classes.paper}>
						<List disablePadding>
						{
							data.map((elem, index) => (
								<div key={elem.id}>
									<Divider light/>
									<ListItem elem={elem}/>
								</div>
							))
						}
						</List>
					</Paper>
				);
			break;
			
			case (data instanceof Array && !data.length): // Pas de données
				return (
					<Paper className={classes.paper}>
						Pas de levé prévue
					</Paper>
				);
			break;
			
			case (typeof data === "Object"): // erreur
				error = data.error || null;
			case (error !== null):
			default:
				return (
					<Paper className={classes.paper}>
						Oups !<br/>Nous n'avons pas réussi à récupérer les données<br/>
					</Paper>
				);
			break;
		}
		console.log("wololo");
	}
}

const styles = theme => ({
});

export default withStyles(styles)(Content);
