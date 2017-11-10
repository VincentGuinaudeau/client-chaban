import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Popover from 'material-ui/Popover';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import ResfreshIcon from 'material-ui-icons/Refresh';

import Search from './search';

class Header extends Component {

	constructor (props)
	{
		super(props);
		this.state = {
			popover_open: false,
			popover_anchor: null,
		}

		this.button = null;
		this.search_state = null;

		this.store_search_state = this.store_search_state.bind(this);
		this.call_refresh = this.call_refresh.bind(this);
	}

	has_filter_search(search_state)
	{
		if (!search_state)
			return false;
		switch (search_state.tab)
		{
			case 0:
				return !!(search_state.dateFrom || search_state.dateTo);
			case 1:
				return !!(search_state.timeFrom || search_state.timeTo);
			case 2:
				return false; // Coming Soon
			default: // Unexpected. We assume the search field is empty
				return false;
		}
	}

	need_reload(old_search_state, new_search_state)
	{
		const has_filter_old = this.has_filter_search(old_search_state);
		const has_filter_new = this.has_filter_search(new_search_state);
		if (has_filter_old !== has_filter_new) // 
			return true;
		if (has_filter_old === false) // the two state are empty search
			return false;
		if (old_search_state.tab !== new_search_state.tab)
			return true;
		switch (new_search_state.tab)
		{
			case 0:
				return (old_search_state.dateFrom !== new_search_state.dateFrom ||
						old_search_state.dateTo   !== new_search_state.dateTo);
			case 1:
				return (old_search_state.timeFrom !== new_search_state.timeFrom ||
						old_search_state.timeTo   !== new_search_state.timeTo);
			default: // Normally unreachable becaue has_filter_search + conditions above already handle this
				return false;
		}
	}

	call_refresh()
	{
		this.props.onRefresh(this.search_state);
	}

	store_search_state(search_state)
	{
		if (this.need_reload(this.search_state, search_state))
			this.props.onRefresh(search_state);
		this.search_state = search_state;
	}

	popover_state_change(new_state)
	{
		if (new_state !== true && new_state !== false)
			new_state = !this.state.popover_open;
		const popover_anchor = findDOMNode(this.button);
		this.setState({	popover_open: new_state, popover_anchor });
	}

	render() {
		const { data, classes } = this.props;
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
						onClick={() => this.popover_state_change()}
					>
						{
							this.has_filter_search(this.search_state)
							?
							<Badge badgeContent="!" color="accent">
								<SearchIcon/>
							</Badge>
							:
							<SearchIcon/>
						}
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
						<Search state={this.search_state} onClose={this.store_search_state}/>
					</Popover>
					<Typography type="title" color="inherit" className={classes.flex}>
						Horaire de levée du pont Chaban Delmas
					</Typography>
					<IconButton
						className={classes.refreshButton}
						color="contrast"
						aria-label="Rafraichir"
						onClick={this.call_refresh}
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
