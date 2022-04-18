import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type OrderSummaryProps = {
    name: string,
    phone: string,
    email: string,
    songsCount: number,
    total: number
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ name, phone, email, songsCount, total }) => {

    return <Box>
        <Typography>Order done successfully</Typography><br />
        <Typography>Name: {name}</Typography><br />
        <Typography>Phone: {phone} </Typography><br />
        <Typography>Email: {email}</Typography><br />
        <Typography>Num of songs: {songsCount}</Typography><br />
        <Typography>Total: {total}</Typography><br />
    </Box>
}

export default OrderSummary