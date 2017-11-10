import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

function TabContainer(props) {
	return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

class Search extends Component {

	constructor (props) {
		super(props);
		this.state = this.props.state || {
			tab: 0,
			dateFrom: '',
			dateTo: '',
			timeFrom: '',
			timeTo: '',
		};

		this.handleChangeTab = this.handleChangeTab.bind(this);
	}

	setDateState(object, date) {
		let newState = {[object]: date};

		console.log(date);

		switch (object)
		{
			case 'dateFrom':
				if (this.state.dateTo && new Date(date) > new Date(this.state.dateTo))
					newState.dateTo = '';
			break;

			case 'dateTo':
				if (this.state.dateFrom && new Date(date) < new Date(this.state.dateFrom))
					newState.dateFrom = '';
			break;

			default:
			break;
		}
		this.setState(newState);
	}

	handleChangeTab(evenet, tab) {
		this.setState({ tab });
	}

	componentWillUnmount() {
		if (this.props.onClose)
			this.props.onClose(this.state)
	}

	render() {
		const {
			tab,
			dateFrom,
			dateTo,
			timeFrom,
			timeTo,
		} = this.state;
		const { classes } = this.props;

		return (
			<Paper>
				<Tabs
					value={tab}
					onChange={this.handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					fullWidth
				>
					<Tab label="Date" />
					<Tab label="Heure" />
					<Tab label="Texte" />
				</Tabs>
				{
					tab === 0 &&
					<TabContainer>
						<TextField
							id="date-from"
							label="Après le"
							type="date"
							onChange={event => { this.setDateState("dateFrom", event.target.value) }}
							value={dateFrom}
							className={classes.textField}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							id="date-to"
							label="Jusqu'au"
							type="date"
							onChange={event => { this.setDateState("dateTo", event.target.value) }}
							value={dateTo}
							className={classes.textField}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</TabContainer>
				}
				{
					tab === 1 &&
					<TabContainer>
						<TextField
							id="time-from"
							label="Après"
							type="time"
							onChange={(event) => this.setState({ timeFrom: event.target.value })}
							value={timeFrom}
							className={classes.textField}
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{
								step: 600, // 10 min
							}}
						/>
						<TextField
							id="time-to"
							label="Jusqu'à"
							type="time"
							onChange={(event) => this.setState({ timeTo: event.target.value })}
							value={timeTo}
							className={classes.textField}
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{
								step: 600, // 10 min
							}}
						/>
					</TabContainer>
				}
				{ tab === 2 && <TabContainer>Coming Soon</TabContainer> }
			</Paper>
		);
	}
}

const styles = theme => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},
});

export default withStyles(styles)(Search);
