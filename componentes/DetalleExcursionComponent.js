import { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Card, Text, Divider, IconButton } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  excursiones: state.excursiones,
  comentarios: state.comentarios,
});

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>

        <ImageBackground
          source={{ uri: baseUrl + excursion.imagen }}
          style={styles.image}
        >
          <Text style={styles.tituloImagen}>
            {String(excursion.nombre)}
          </Text>
        </ImageBackground>

        <Card.Content>
          <Text style={styles.descripcion}>
            {String(excursion.descripcion)}
          </Text>
        </Card.Content>

        {/* Boton Favorito*/}
        <View style={styles.iconoContainer}>
          <IconButton
            icon={props.favorita ? 'heart' : 'heart-outline'}
            size={28}
            iconColor="black"
            onPress={() =>
              props.favorita
                ? console.log('La excursión ya está en favoritos')
                : props.onPress()
            }
          />
        </View>

      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  const renderComentarioItem = ({ item }) => {
    // Formatear fecha
    const fecha = new Date(item.dia);

    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const hora = fecha.toLocaleTimeString('es-ES');

    return (
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.comentarioTexto}>
          {String(item.comentario)}
        </Text>

        <Text style={styles.comentarioValoracion}>
          {item.valoracion} estrellas
        </Text>

        <Text style={styles.comentarioAutor}>
          -- {item.autor}, {fechaFormateada}, {hora}
        </Text>
        <Divider />
      </View>
    );
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title="Comentarios"
        titleStyle={styles.titulo}
        style={styles.cardTitle}
      />

      <FlatList
        data={comentarios}
        renderItem={renderComentarioItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />

    </Card>
  );
}


class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: [],
    };
  }

  marcarFavorito(excursionId) {
    this.setState({
      favoritos: this.state.favoritos.concat(excursionId)
    });
  }

  render() {
    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.state.favoritos.some(el => el === +excursionId)}
          onPress={() => this.marcarFavorito(+excursionId)}
        />
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter(
            (comentario) => comentario.excursionId === +excursionId
          )}
        />
      </ScrollView>
    );
  }
}

// En estilos igual tenemos que añadir alguna cosa mas para los comentarios
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
    fontWeight: 'bold',
  },
  cardTitle: {
    alignItems: 'center',
  },
  tituloImagen: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    height: 150,
    justifyContent: 'flex-start',
  },
  comentarioTexto: {
    fontSize: 14,
  },

  comentarioValoracion: {
    fontSize: 14,
    marginTop: 5,
  },

  comentarioAutor: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  iconoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default connect(mapStateToProps)(DetalleExcursion);