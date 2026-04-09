import { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';

class Contacto extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          
          <Card.Title
            title="Información de contacto"
            titleStyle={styles.titulo}
            style={styles.cardTitle}
          />

          <Divider />

          <Card.Content>
            <Text style={styles.texto}>
              Kaixo Mendizale!{'\n\n'}
              Si quieres participar en las salidas de montaña que organizamos o quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a través de diferentes medios. Puedes llamarnos por teléfono los jueves de las semanas que hay salida (de 20:00 a 21:00). También puedes ponerte en contacto con nosotros escribiendo un correo electrónico, o utilizando la aplicación de esta página web. Y además puedes seguirnos en Facebook.{'\n\n'}
              Para lo que quieras, estamos a tu disposición!{'\n\n'}
              Tel: +34 948 277151{'\n'}
              Email: gaztaroa@gaztaroa.com
            </Text>
          </Card.Content>

        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  card: {
    margin: 8,
  },
  titulo: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardTitle: {
    alignItems: 'center',
  },
  texto: {
    marginTop: 10,
    lineHeight: 20,
  },
});

export default Contacto;