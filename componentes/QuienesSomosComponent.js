import { Component } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Card, Text, List, Divider } from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { baseUrl, colorGaztaroaClaro } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = (state) => { // cada componente no tiene porque tener acceso a todo el estado
    return {
        actividades: state.actividades
    }
}

// COMPONENTE FUNCIONAL (CARD SUPERIOR)
function Historia() {
    return (
        <Card style={styles.card}>
            <Card.Title
                title="Un poquito de historia"
                titleStyle={styles.titulo}
                style={styles.cardTitle}
            />

            <Divider />

            <Card.Content>
                <Text style={styles.texto}>
                    El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.{'\n\n'}

                    Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.{'\n\n'}

                    Gracias!
                </Text>
            </Card.Content>
        </Card>
    );
}


// COMPONENTE DE CLASE (CARD INFERIOR)
class QuienesSomos extends Component {

    render() {
        const renderActividadItem = ({ item }) => {
            return (
                <View>
                    <List.Item
                        title={item.nombre}
                        description={item.descripcion}
                        titleNumberOfLines={0}
                        descriptionNumberOfLines={6}
                        left={(props) => (
                            <Image
                                source={{ uri: baseUrl + item.imagen }}
                                style={[props.style, styles.imagen]}
                            />
                        )}
                        titleStyle={styles.tituloLista}
                        descriptionStyle={styles.descripcionLista}
                    />
                    <Divider />
                </View>
            );
        };

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {/* CARD SUPERIOR */}
                    <Historia />

                    {/* CARD INFERIOR */}
                    <Card style={styles.card}>
                        <Card.Title
                            title="Actividades y recursos"
                            titleStyle={styles.titulo}
                            style={styles.cardTitle}
                        />

                        <Divider />

                        <FlatList
                            data={this.props.actividades.actividades}
                            renderItem={renderActividadItem}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled={false}
                        />
                    </Card>
                </ScrollView>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: colorGaztaroaClaro,
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

    // estilos lista
    imagen: {
        width: 40,
        height: 40,
        alignSelf: 'center',
    },
    tituloLista: {
        fontSize: 16,
    },
    descripcionLista: {
        fontSize: 14,
        lineHeight: 20,
    },
});

export default connect(mapStateToProps)(QuienesSomos); 