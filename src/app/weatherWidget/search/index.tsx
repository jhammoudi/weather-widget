import React, { useState, useEffect } from 'react';
import useDebounce from './use-debounce';
import axios from 'axios'
import ToggleUnit from './toggleUnit/'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

type SearchProps = {
    units: string,
    setUnits(units: string): void
    setLocation(location: {}): void
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '36ch',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
    }),
);

const Search = ({ units, setUnits, setLocation }: SearchProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const classes = useStyles();

    useEffect(
        () => {
            if (debouncedSearchTerm) {
                setIsSearching(true);
                searchLocations(debouncedSearchTerm).then(results => {
                    setIsSearching(false);
                    console.log("settings results", results)
                    setResults(results);
                });
            } else {
                setResults([]);
            }
        },
        [debouncedSearchTerm]
    );

    const handleOnClick = (result: any) => {
        console.log("clicked", result)
        const { lat, lon } = result
        setLocation({
            lat,
            lon
        })
    }

    const searchLocations = (search: any) => {
        const params = {
            limit: 3,
            q: search,
            appid: process.env.REACT_APP_WEATHER_API
        }
        return axios
            .get(`${process.env.REACT_APP_WEATHER_GEO_API_URL}/direct?`, {
                params
            })
            .then(r =>
                r.data
            )
            .catch(error => {
                console.error(error);
                return [];
            });
    }

    return (
        <div>
            <TextField id="outlined-search" label="Search Locations" type="search" variant="outlined" onChange={e => setSearchTerm(e.target.value)} />
            <ToggleUnit units={units} setUnits={setUnits} />
            {isSearching && <div>Searching ...</div>}
            <List className={classes.root}>
                {results && results.map((result, index) => (
                    <ListItem divider disableGutters button onClick={() => handleOnClick(result)} key={index}>
                        <ListItemIcon>
                            <img src={`${process.env.REACT_APP_WEATHER_URL}/images/flags/${result.country.toLowerCase()}.png`} alt="Country Flag" />
                        </ListItemIcon>
                        <ListItemText
                            primary={result && `${result.name}, ${result.state ? `${result.state}, ` : ''} ${result.country} `}
                            secondary={
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {`(${result.lat.toFixed(2)}, ${result.lon.toFixed(2)})`}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Search