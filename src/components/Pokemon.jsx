import { Backdrop, Box, Modal, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import Spinner from "../containers/Spinner";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

const Pokemon = (props) => {
    const { pokemonDetailed, loading } = useSelector(state => state.pokemons)
    return (
        <Modal aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={props.open}
            onClose={props.handleClose}
            item
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            xs={3}>
            <Box sx={style}>
                {loading && <Spinner />}
                <Typography id="spring-modal-title" variant="h6" component="h2">
                    {pokemonDetailed.name}
                </Typography>
                <img src={pokemonDetailed.sprites.front_default} />
                <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                    Height : {pokemonDetailed.height + "\n"}
                    Weight : {pokemonDetailed.weight}
                </Typography>
                <Box sx={{
                    display: "flex", flexWrap: "wrap", p: 1,
                    alignItems:"center",
                    m: 1, bgcolor: 'background.paper',
                    maxWidth: 300,
                    borderRadius: 1,
                }}>
                    <Typography id="spring-modal-title" variant="h6" component="h5">
                        Ability
                    </Typography>
                    {pokemonDetailed.types && pokemonDetailed.types.map(t => (
                        <Item>

                            {t.type.name}
                        </Item>

                    ))}
                </Box>


            </Box>
        </Modal>
    )

}

export default Pokemon