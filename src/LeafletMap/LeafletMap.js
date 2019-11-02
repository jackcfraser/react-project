import React from 'react';
import { Box, Drawer, Fab, Tooltip } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import styled from 'styled-components';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import HeatMapLayer from 'react-leaflet-heatmap-layer';
import Papa from 'papaparse';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';

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

const heatmapData = [];

class LeafletMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        });

        // for (var i=0; i<5; i++){
        //     heatmapData.push({x: this.generatePoints(-23, -24, 5), y: this.generatePoints(150, 151, 5), z: this.generatePoints(0, 100, 2)});
        // }

        var dataPath = require('./myskyatnight.csv');
        Papa.parse(dataPath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: this.onCSVReady
        })

    }

    onCSVReady(result) {
        var unique = [];
        for (var obj in result.data) {
            if(!unique.includes(result.data[obj]['obs_type'])){
                unique.push(result.data[obj]['obs_type']);
            }

            if(result.data[obj]['obs_type'] == 'DSM')
                heatmapData.push({x: result.data[obj]['lat'], y: result.data[obj]['lon'], z: result.data[obj]['sqm_value']});
            
        }

        console.log(unique);
    }

    toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({
            open: open
        });
    };

    generatePoints(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
        // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

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
                    <HeatMapLayer
                        fitsBoundsOnLoad
                        fitsBoundsOnUpdate
                        points={heatmapData}
                        longitudeExtractor={m => m['y']}
                        latitudeExtractor={m => m['x']}
                        intensityExtractor={m => parseFloat(m['z'])}
                    />

                    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                    {/* <Marker position={position}>
                        <Popup>
                            My marker
                        </Popup>
                    </Marker> */}

                    {/* {heatmapData.map((value, index) => {
                        return <Marker position={[value['x'], value['y']]}/>
                    })} */}

                    {/* <Circle center={position} fillColor="blue" radius={200} /> */}

                </Map>

            </MapBox>
        );
    }
}

export default LeafletMap
