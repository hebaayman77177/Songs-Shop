
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes, selectors } from '../../features/userChoices'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';


const albumsSongs = [
    {
        album: { id: 0, name: "album0" },
        songs: [
            { id: 0, name: "song0", price: 10 },
            { id: 1, name: "song1", price: 20 },
        ]
    },
    {
        album: { id: 1, name: "album1" },
        songs: [
            { id: 2, name: "song2", price: 30 },
            { id: 3, name: "song3", price: 40 },
        ]
    },
    {
        album: { id: 2, name: "album2" },
        songs: [
            { id: 4, name: "song4", price: 40 },
            { id: 5, name: "song5", price: 50 },
        ]
    }
]

export default function ChooseAlbumSongs() {
    const dispatch = useDispatch()
    const choosenAlbumns = useSelector(selectors.getAlbumChoices)
    const choosenSongs = useSelector(selectors.getSongsChoices)


    const choosenAlbumsSongs = albumsSongs
        .filter(albumSongs => choosenAlbumns[albumSongs.album.id])

    const checkHandler = (id: number, price: number, choice: boolean) => {
        dispatch({
            type: actionTypes.ALTER_SONG,
            payload: {
                id,
                choice: { choosen: !choice, price: price }
            }
        })
    }

    return <Grid container spacing={2}>
        {choosenAlbumsSongs.map(albumSongs => {
            return <Grid item xs={12} >
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {albumSongs.album.name}
                        </Typography>
                        <Divider />
                        <Grid container>
                            {albumSongs.songs.map(song => {
                                return <Grid item xs={12}><FormControlLabel control={<Checkbox
                                    checked={!!choosenSongs[song.id]?.choosen}
                                    onClick={() => checkHandler(song.id, song.price, choosenSongs[song.id]?.choosen)}
                                />} label={`${song.name} - ${song.price}EGP`} />
                                </Grid>
                            })}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        })
        }
    </Grid>
}