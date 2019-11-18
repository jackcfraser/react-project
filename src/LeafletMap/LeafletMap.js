import React from 'react';
import { Box, Drawer, Fab, Tooltip } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import styled from 'styled-components';
import { Map, TileLayer } from 'react-leaflet';
import HeatMapLayer from 'react-leaflet-heatmap-layer';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import DataHelper from '../Helpers/DataHelper.js';

import GeoSearch from './GeoSearch';

const MapBox = styled(Box)`
    display: block;
    position: absolute;
    height: 92.7%;
    width: 100%;
`;

const SearchBox = styled(Box)`
    position: absolute;
    left: 4%;
    top: 1.4%;
    z-index: 2;
`;

const DrawerButtonBox = styled(Box)`
    position: absolute;
    right: 1%;
    top: 1.4%;
    z-index: 2;
`;

//var heatmapData = [];

class LeafletMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            heatmapData: DataHelper.getLightData(),
            isLoaded: false
        }

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        });
    }

    componentDidMount() {
        DataHelper.getLightData().then(
            (result) => {this.setState({isLoaded: true, heatmapData: result});},
            //TODO implement error handling
            (error) => {this.setState({isLoaded: false});}
        )
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
        const position = [-23.3200495, 150.5276997];

        const options = (
            <List>
                <ListItem button key="Home">
                    <ListItemIcon><AppsIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
            </List>
        );

        return (
            <MapBox>
                <Drawer open={this.state.open} onClose={this.toggleDrawer(false)} anchor="right">
                    {options}
                </Drawer>
                <SearchBox>
                    <GeoSearch />
                </SearchBox>
                <DrawerButtonBox>
                    <Tooltip title="Show/Hide List" placement="left">
                        <Fab color="secondary" size="small" onClick={this.toggleDrawer(true)} onKeyDown={this.toggleDrawer(true)}>
                            <AppsIcon />
                        </Fab>
                    </Tooltip>
                </DrawerButtonBox>
                <Map
                    center={position}
                    zoom={15}
                    maxZoom={18}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                >
                    {this.state.isLoaded === true ? <HeatMapLayer
                        fitsBoundsOnLoad
                        fitsBoundsOnUpdate
                        points={this.state.heatmapData}
                        longitudeExtractor={m => m['y']}
                        latitudeExtractor={m => m['x']}
                        intensityExtractor={m => parseFloat(m['z'])}
                    /> : null}
                    


                    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                    {/* <Circle center={position} fillColor="blue" radius={200} /> */}

                </Map>

            </MapBox>
        );
    }
}

export default LeafletMap
