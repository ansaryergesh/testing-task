import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl, Grid, IconButton, InputLabel, MenuItem, Pagination, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons,getPokemonById } from "../store/pokemons.slice";
import { useNavigate } from "react-router-dom";
import { Favorite } from "@mui/icons-material";
import Spinner from "../containers/Spinner";
import { Box, Stack } from "@mui/system";
import Pokemon from "./Pokemon";
import { Paginator } from "./Pagination";

const Pokemons = () => {
    const navigate = useNavigate();
    const { pokemons, loading, total } = useSelector(state => state.pokemons)
    const dispatch = useDispatch()
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(Math.floor(total / size))
    const [searchFilter, setSearchFilter] = useState("")
    const [openModal,setOpenModal] = useState(false)
    const handleOpen = (index) =>  {
        const id = (page*size) + index+1;
        dispatch(getPokemonById(id))
        setOpenModal(true)
    };
    const handleClose = () => setOpenModal(false);
    useEffect(() => {
        dispatch(getPokemons({ size, page }))
    }, [])

    useEffect(() => {
        setSearchFilter("")
        if (total) {
            setTotalPage(Math.floor(total / size))
        }
    }, [total, size])

    const changeSize = e => {
        const sizeValue = e.target.value
        dispatch(getPokemons({ size: sizeValue, page: 1 }))
        setSize(sizeValue)
    }

    const changePage = (e, value) => {
        setPage(value)
        setSearchFilter("")
        dispatch(getPokemons({ size, page: value }))
    }



    const SizeBar = () => {
        return (
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Size per page</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={size}
                    label="Age"
                    onChange={changeSize}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </FormControl>
        )
    }

    const PokemonsList = () => {
        const pokemonFiltered = pokemons && pokemons.length > 2 ? pokemons.filter(p => p.name.includes(searchFilter)) : pokemons;
        return (
            <>
                <Pokemon  open={openModal} handleClose={handleClose}/>
                {pokemonFiltered && pokemonFiltered.map((pokemon, index) => (
                    <Grid key={index} item xs={12} md={6} lg={3}>
                        <Card >
                            <CardActionArea>
                                <CardMedia
                                    sx={{ width: 100, height: 100 }}
                                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(page*size) + index+1}.png`}
                                    title={pokemon.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {pokemon.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Pokémon is a Japanese media franchise managed by The Pokémon Company, founded by Nintendo, Game Freak, and Creatures.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                            <CardActions>
                                <IconButton aria-label="add to favorites">
                                    <Favorite />
                                </IconButton>
                                <Button size="small" onClick={() => handleOpen(index)}> More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                {!pokemonFiltered.length && <Typography gutterBottom variant="span" component="div">
                    {`No results were found for the query ${searchFilter}`}
                </Typography>}
            </>
        )
    }
    return (
        <div>
            <h1>Pokemens</h1>
            <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
            />
            <SizeBar />
            <Grid container spacing={2}>
                <PokemonsList />
                {loading && <Spinner />}
            </Grid>
            <Paginator page={page} totalPage={totalPage} changePage={changePage}/>
        </div>
    )
}

export default Pokemons;