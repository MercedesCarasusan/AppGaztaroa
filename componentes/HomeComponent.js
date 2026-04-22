import { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = (state) => { // cada componente no tiene porque tener acceso a todo el estado
  return {
    actividades: state.actividades,
    excursiones: state.excursiones,
    cabeceras: state.cabeceras
  }
}

function RenderItem(props) {

  const item = props.item;

  if (props.isLoading) {
    return (
      <IndicadorActividad />
    );
  }

  else if (props.errMess) {
    return (
      <View>
        <Text> {props.errMess} </Text>
      </View>
    );
  }

  else {
    if (item != null) {
      return (
        <Card style={styles.card}>

          <ImageBackground
            source={{ uri: baseUrl + item.imagen }}
            style={styles.image}
          >
            <Text style={styles.tituloImagen}>
              {item.nombre}
            </Text>
          </ImageBackground>

          <Card.Content>
            <Text style={styles.descripcion}>
              {item.descripcion}
            </Text>
          </Card.Content>

        </Card>
      );
    }
    else {
      return(<View></View>);
    }
  }
}

class Home extends Component {

  render() {
    return (
      <ScrollView>
        <RenderItem item={this.props.cabeceras.cabeceras.filter((item) => item.destacado)[0]}
          isLoading={this.props.cabeceras.isLoading}
          errMess={this.props.cabeceras.errMess}
        />
        <RenderItem item={this.props.excursiones.excursiones.filter((item) => item.destacado)[0]}
          isLoading={this.props.excursiones.isLoading}
          errMess={this.props.excursiones.errMess}
        />
        <RenderItem item={this.props.actividades.actividades.filter((item) => item.destacado)[0]}
          isLoading={this.props.actividades.isLoading}
          errMess={this.props.actividades.errMess}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  image: {
    marginHorizontal: 0,
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  titulo: {
    textAlign: 'center',
  },
  cardTitle: {
    alignItems: 'center',
  },
  tituloImagen: {
    color: 'chocolate',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    height: 150,
    justifyContent: 'flex-start',
  },
});

export default connect(mapStateToProps)(Home);