import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Drawer } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Stocks from '../Stocks';
import Welcome from '../Welcome'

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	options: {
		width: 250
	}
});

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}
	
	toggleDrawer = (open) => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		this.setState({
			open: open
		});
	};

	render() {
		const { classes } = this.props;
		const options = (
			<div className={classes.options} role="presentation" onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
				<List>
					<Link to="/">
						<ListItem button key="Home">
							<ListItemIcon><HomeIcon /></ListItemIcon>
							<ListItemText primary="Home" />
						</ListItem>
					</Link>
					<Link to="/Stocks">
						<ListItem button key="Stocks Project">
							<ListItemIcon><AccountCircleIcon /></ListItemIcon>
							<ListItemText primary="Stocks Project" />
						</ListItem>
					</Link>
					<ListItem button key="My Work">
						<ListItemIcon><WorkIcon /></ListItemIcon>
						<ListItemText primary="My Work" />
					</ListItem>
				</List>
			</div>
		);

		return (
			<Router>
				<div className={classes.root}>
					<Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
						{options}
					</Drawer>
					<AppBar position="static">
						<Toolbar>
							<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.toggleDrawer(true)}>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" className={classes.title}>
								Home
            				</Typography>
						</Toolbar>
					</AppBar>
				</div>
				{/* <Route path="/App" component={App} /> */}
				<Route exact path="/" component={Welcome} />
				<Route path="/Stocks" component={Stocks} />
			</Router>
		);
	}
}
export default withStyles(styles)(Header)