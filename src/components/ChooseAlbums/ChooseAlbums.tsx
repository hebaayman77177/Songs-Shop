
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes, selectors } from '../../features/userChoices'
import Checkbox from '@mui/material/Checkbox';


const singersAlbums = [
    {
        singer: 0,
        albums: [
            { id: 0, name: "album 0" },
            { id: 1, name: "album 1" },
            { id: 2, name: "album 2" },
        ]
    },
    {
        singer: 1,
        albums: [
            { id: 3, name: "album 3" },
        ]
    },
]

export default function ChooseAlbums() {
    const dispatch = useDispatch()
    const choosenSingers = useSelector(selectors.getSingerChoices)
    const choosenAlbumns = useSelector(selectors.getAlbumChoices)

    const choosenSingersAlbums = singersAlbums
        .filter(singerAlbumns => choosenSingers[singerAlbumns.singer])
        .map(singerAlbumns => singerAlbumns.albums)
        .flat()

    const checkHandler = (id: number, choice: boolean) => {
        dispatch({
            type: actionTypes.ALTER_ALBUM,
            payload: {
                id,
                choice: !choice
            }
        })
    }

    return <Grid container spacing={2}>
        {choosenSingersAlbums.map(album => {
            return <Grid item xs={6} md={4}>
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Checkbox
                            checked={!!choosenAlbumns[album.id]}
                            onClick={() => checkHandler(album.id, choosenAlbumns[album.id])}
                        />
                        <Typography gutterBottom variant="h5" component="h2">
                            {album.name}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        })
        }
    </Grid>
}