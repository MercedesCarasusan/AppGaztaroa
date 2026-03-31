import React, { Component } from 'react';
import Calendario from './CalendarioComponent';
import { EXCURSIONES } from '../comun/excursiones';

import DetalleExcursion from './DetalleExcursionComponent';
import { View } from 'react-native';


// Este componente guarda una lista de excursiones en su estado y se la pasa al componente 
// Calendario para que las muestre. Es el componente padre de Calendario, y el único que conoce los datos de las excursiones. 
// El componente Calendario es un componente hijo, que recibe los datos de las excursiones a través de sus props
class Campobase extends Component { // componentes de react native

    constructor(props) { // se ejecuta al crear el componente
        super(props); // obligatorio para usar this en una clase que hereda de component
        this.state = { // state: datos que pueden cambiar a lo largo de la vida del componente
            excursiones: EXCURSIONES,
            seleccionExcursion: null
        };
    }
    onSeleccionExcursion(excursionId) {
        this.setState({seleccionExcursion: excursionId})
    }

    render() { // Define lo que se muestra en pantalla, se ejecuta cada vez que el estado del componente cambia
        return (
            <View style={{ flex: 1 }}>
                <DetalleExcursion excursion={this.state.excursiones.filter((excursion) => excursion.id ===this.state.seleccionExcursion)[0]}/>
                <Calendario excursiones={this.state.excursiones} onPress={( 
                    excursionId) => this. onSeleccionExcursion(excursionId)} />
            </View>      
        );
    }
}

export default Campobase; // permite usar este componente en otros archivos