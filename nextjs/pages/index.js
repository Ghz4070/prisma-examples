import React, {useState} from 'react';
import Axios from "axios";
import {
    Box,
    Container,
    makeStyles,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    root: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
    card: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
        margin: '25px',
    },
    delete_button: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
        margin: '25px',
    }
}));

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Index({data}) {
    console.log(data);
    const classes = useStyles();
    const [_data, setData] = useState(data);

    async function deleteProduct(id) {
        const res = await Axios.delete(`http://localhost:4000/productDelete/${id}`);
        console.log(res.data.state);
        if (res.data.state === 1) {
            console.log("Produit Supprimé");
            setData(_data.filter(item => item.id !== id));
        }
    }

    return (
        <Container maxWidth="sm">
            {_data.map((product) =>
                <Box className={classes.card} key={product.id}>
                    <div><strong m={2}>Name : </strong>{product.name}</div>
                    <div><strong m={2}>Description : </strong>{product.description}</div>
                    <div><strong m={2}>Category : </strong>{product.category}</div>
                    <div><strong m={2}>Price : </strong>{product.price}</div>
                    <button className={classes.delete_button} onClick={() => deleteProduct(product.id)}>Delete</button>
                </Box>
            )}
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Table className={classes.table} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </Container>

    );
};
Index.getInitialProps = async function () {
    const res = await Axios.get('http://localhost:4000/recupAllProduct');
    return {
        data: res.data
    }
};

