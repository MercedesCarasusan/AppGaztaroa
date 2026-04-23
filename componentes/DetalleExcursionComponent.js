import { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Modal } from 'react-native';
import { Card, Text, Divider, IconButton, TextInput, Button } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';


const mapStateToProps = (state) => ({
  excursiones: state.excursiones,
  comentarios: state.comentarios,
  favoritos: state.favoritos
});

const mapDispatchToProps = dispatch => ({
  postFavorito: (id) => dispatch(postFavorito(id)),
  postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))

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

          {/* BOTÓN FORMULARIO */}
          <IconButton
            icon="pencil"
            size={28}
            iconColor="black"
            onPress={props.onPressComentario}
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
      showModal: false,
      valoracion: 5,
      autor: '',
      comentario: ''
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false
    });
  }

  gestionarComentario(excursionId) {

    this.props.postComentario(
      excursionId,
      this.state.valoracion,
      this.state.autor,
      this.state.comentario
    );

    this.resetForm();
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  render() {
    const { excursionId } = this.props.route.params;

    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
        >
          <View style={styles.modalContainer}>

            <Text style={styles.modalTitulo}>Añadir comentario</Text>

            <View style={styles.estrellas}>
              {[1, 2, 3, 4, 5].map((num) => (
                <IconButton
                  key={num}
                  icon={num <= this.state.valoracion ? "star" : "star-outline"}
                  iconColor="gold"
                  size={30}
                  onPress={() => this.setState({ valoracion: num })}
                />
              ))}
            </View>

            <Text style={styles.valoracionTexto}>
              {this.state.valoracion === 5 ? 'Excelente' :
                this.state.valoracion === 4 ? 'Muy bueno' :
                  this.state.valoracion === 3 ? 'Normal' :
                    this.state.valoracion === 2 ? 'Regular' : 'Malo'}
            </Text>

            <TextInput
              placeholder="Autor"
              left={<TextInput.Icon icon="account" />}
              value={this.state.autor}
              onChangeText={(text) => this.setState({ autor: text })}
              style={styles.input}
            />

            <TextInput
              placeholder="Comentario"
              left={<TextInput.Icon icon="comment" />}
              value={this.state.comentario}
              onChangeText={(text) => this.setState({ comentario: text })}
              style={styles.input}
            />

            <View style={styles.botones}>
              <Button onPress={() => this.resetForm()}>
                Cancelar
              </Button>

              <Button mode="contained" onPress={() => this.gestionarComentario(+excursionId)}>
                Enviar
              </Button>
            </View>

          </View>
        </Modal>

        <ScrollView>
          <RenderExcursion
            excursion={this.props.excursiones.excursiones[+excursionId]}
            favorita={this.props.favoritos.favoritos.some(el => el === +excursionId)}
            onPress={() => this.marcarFavorito(+excursionId)}
            onPressComentario={() => this.toggleModal()}
          />
          <RenderComentario
            comentarios={
              this.props.comentarios.comentarios
                .filter((comentario) => comentario.excursionId === +excursionId)
                .sort((a, b) => new Date(b.dia) - new Date(a.dia))
            }
          />
        </ScrollView>
      </View>

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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  modalTitulo: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  estrellas: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  valoracionTexto: {
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 20
  },
  input: {
    marginBottom: 10
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);