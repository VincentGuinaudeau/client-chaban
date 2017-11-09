import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Popover from 'material-ui/Popover';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ResfreshIcon from 'material-ui-icons/Refresh';

// import { Link } from 'react-router-dom';

class Header extends Component {

	constructor (props)
	{
		super(props);
		this.state = {
			popover_open: false,
			popover_anchor: null
		}
		this.button = null;
	}

	popover_state_change(new_state)
	{
		if (new_state !== true && new_state !== false)
			new_state = !this.state.popover_open;
		const popover_anchor = findDOMNode(this.button);
		this.setState({	popover_open: new_state, popover_anchor });
	}

	render() {
		const { data, onRefresh, classes } = this.props;
		const { popover_anchor, popover_open } = this.state;

		//console.log(onRefresh);
		return (
			<AppBar position="static">
				<Toolbar>
					<IconButton
						ref={node => {this.button = node;}}
						className={classes.menuButton}
						color="contrast"
						aria-label="Menu"
						fab
						onClick={() => this.popover_state_change()}
					>
						<MenuIcon/>
					</IconButton>
					<Popover
						open={popover_open}
						anchorEl={popover_anchor}
						onRequestClose={() => this.popover_state_change(false)}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
					>
						<Paper>Search Menu</Paper>
					</Popover>
					<Typography type="title" color="inherit" className={classes.flex}>
						Horaire de levé du pont Chaban
					</Typography>
					<IconButton
						className={classes.refreshButton}
						color="contrast"
						aria-label="Rafraichir"
						onClick={onRefresh}
						disabled={data === null}
					>
						<ResfreshIcon/>
					</IconButton>
				</Toolbar>
			</AppBar>
		);
	}
}

const styles = theme => ({
	menuButton: {
		backgroundColor: 'transparent',
		marginLeft: -12,
		marginRight: 20,
	},
	refreshButton: {
		backgroundColor: 'transparent',
		position: 'absolute',
		right: '10px',
	}
});

export default withStyles(styles)(Header);
