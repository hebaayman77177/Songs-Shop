
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes, selectors } from '../../features/userChoices'
import Checkbox from '@mui/material/Checkbox';


const singers = [
    { id: 0, name: "songer 1" },
    { id: 1, name: "songer 2" },
    
]
export default function ChooseSingers() {
    const dispatch = useDispatch()
    const choosenSingers = useSelector(selectors.getSingerChoices)

    const checkHandler = (id: number, choice: boolean) => {
        dispatch({
            type: actionTypes.ALTER_SINGER,
            payload: {
                id,
                choice: !choice
            }
        })
    }

    return <Grid container spacing={2}>
        {singers.map(singer => {
            return <Grid item xs={6} md={4}>
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Checkbox
                            checked={!!choosenSingers[singer.id]}
                            onClick={() => checkHandler(singer.id, choosenSingers[singer.id])}
                        />
                        <Typography gutterBottom variant="h5" component="h2">
                            {singer.name}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        })
        }
    </Grid>
}