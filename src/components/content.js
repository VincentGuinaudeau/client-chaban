import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import { LinearProgress } from 'material-ui/Progress';

import ListItem from './list_item';

class Content extends Component {

	render() {
		const { data, filtered, classes } = this.props;

		switch (true) {
			case (data === null): // chargement
				return (
					<Paper>
						<LinearProgress color="accent"/>
					</Paper>
				);
				
			case (data instanceof Array && !!data.length): // Données
				return (
					<Paper>
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
			
			case (data instanceof Array && !data.length): // Pas de données
				return (
					<Paper className={classes.paper}>
						Pas de levées prévue{ filtered ? " pour les critères de recherche spécifié" : "" }.
					</Paper>
				);

			default:
				let error = "";
				if (data.error instanceof String)
					error = data.error;
				else if (data.error instanceof Error)
					error = data.error.name + " " + data.error.message;
				else if (data.error.error instanceof String)
					error = data.error.error;
				return (
					<Paper className={classes.paper}>
						Oups !<br/>Nous n'avons pas réussi à récupérer les données<br/>{ error ? "Erreur : " + error : "" }
					</Paper>
				);
		}
	}
}

const styles = theme => ({
	paper: {
		padding: 16,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
});

export default withStyles(styles)(Content);
