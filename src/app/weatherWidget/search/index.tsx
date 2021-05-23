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
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

type SearchProps = {
    units: string,
    setUnits(units: string): void
    setLocation(location: {}): void
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: "2rem",
            width: '100%',
            maxWidth: 500,
        },
        inline: {
            display: 'inline',
        },
    }),
);

const Search = ({ units, setUnits, setLocation }: SearchProps) => {
    // initialising state
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(false);

    // sets debouncedSearchTerm after user types in search query
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const classes = useStyles();

    // this function will be triggered when the debouncedSearchTerm is modified
    useEffect(
        () => {
            if (debouncedSearchTerm) {
                // if debouncedSearchTerm exists, then to display searching prompt, and search for a location
                setIsSearching(true);
                searchLocations(debouncedSearchTerm).then(results => {
                    // if location is found, remove searching prompt, and set the results state
                    setIsSearching(false);
                    setResults(results);
                    if (results.length === 0) {
                        // if the user searches for a location, but no results are found, then display error message
                        setError(true)
                    } else {
                        setError(false)
                    }
                });
            } else {
                setResults([]);
            }
        },
        [debouncedSearchTerm]
    );

    // when a user clicks a location result, it will set the location based on the selected location's coordinates
    const handleOnClick = (result: any) => {
        const { lat, lon } = result
        setLocation({
            lat,
            lon
        })
        setResults([])
    }

    // makes API call which will search for all locations based on the search value
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
                return [];
            });
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" padding="2rem">
            <Box width="60%">
                <TextField
                    data-testid="outlined-search"
                    fullWidth
                    id="outlined-search"
                    label="Search Locations"
                    type="search"
                    variant="standard"
                    color="secondary"
                    onChange={e => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon color="secondary" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            { isSearching && <div style={{ paddingTop: "2rem" }}>Searching ...</div>}
            <List data-testid="search-results" aria-label="search-results" className={classes.root}>
                {error &&
                    <Typography
                        component="span"
                        variant="h6"
                        className={classes.inline}
                        color="error"
                    >
                        No locations found
                    </Typography>
                }
                {results && results.map((result, index) => (
                    <ListItem divider dense button onClick={() => handleOnClick(result)} key={index}>
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
            <ToggleUnit units={units} setUnits={setUnits} />
        </Box >
    );
}

export default Search