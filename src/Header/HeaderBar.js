import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MapIcon from '@material-ui/icons/Map';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Drawer } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Stocks from '../Stocks';
import Welcome from '../Welcome';
import LeafletMap from '../LeafletMap/LeafletMap';

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
			open: false,
			href: window.location.href,
			title: this.determineTitle(window.location.href)
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

	componentDidUpdate(){
		if(this.state.href !== window.location.href){
			this.setState({
				href: window.location.href,
				title: this.determineTitle(window.location.href)
			});
		}
	}

	determineTitle(href){
		var windowTitle;
		// This is really bad. Needs fixing to dynamically look at the URL.
		switch(href){
			case 'http://localhost:3000/':
				windowTitle = 'Home';
			break;
			case 'http://localhost:3000/Stocks':
				windowTitle = 'Stocks Project';
			break;
			case 'http://localhost:3000/Map':
				windowTitle = 'Leaflet Project';
			break;
			default:
				windowTitle = '???';
			break;
		}
		return windowTitle;
	}

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
					<Link to="/Map">
						<ListItem button key="Leaflet Project">
							<ListItemIcon><MapIcon /></ListItemIcon>
							<ListItemText primary="Leaflet Project" />
						</ListItem>
					</Link>
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
								{this.state.title}
            				</Typography>
						</Toolbar>
					</AppBar>
				</div>
				<Route exact path="/" component={Welcome} />
				<Route path="/Stocks" component={Stocks} />
				<Route path="/Map" component={LeafletMap} />
			</Router>
		);
	}
}
export default withStyles(styles)(Header)