import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {BottomNavigation, BottomNavigationAction, CssBaseline, Typography} from '@material-ui/core';

const useStyles = makeStyles( (theme) => ({
    footer:{
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-around',
        color: theme.palette.primary.contrastText,
        backgroundColor: 'rgb(0, 23, 20)'

    }
}))

export default function Footer(){
    const classes = useStyles()
    return (
        //Para que el footer no tenga margenes blancos
        //en los costados y abajo y ocupe todo el ancho
        <CssBaseline>
        <BottomNavigation className ={classes.footer}>
            
            <Typography> Sobre Nosotros </Typography>
            <Typography> Development Team </Typography>
            <Typography> Contacto </Typography>
            <Typography> Ayuda </Typography>

        </BottomNavigation>
        </CssBaseline>
    )
}