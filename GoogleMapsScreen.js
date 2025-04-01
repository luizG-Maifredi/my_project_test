import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "./config/constants";
import 'react-native-get-random-values';
import MapViewDirections from "react-native-maps-directions";

export default function GoogleMapsScreen() {
  const mapRef = useRef(); 
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [markers, setMarkers] = useState([
    {
      id: 1,
      latitude: -20.758210,
      longitude: -41.457238,
      title: "Pin 1 estou aqui",
      description: "Essa é a localização do pin 1",
    },
    {
      id: 2,
      latitude: -20.758114,
      longitude: -41.461315,
      title: "Pin 2 estou aqui",
      description: "Essa é a localização do pin 2",
    },
  ]);

  async function moveToLocation(latitude, longitude) {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        },
        1000
      );
    }
  }

  const handleNewPin = (coordinate) => {
    console.log("Latitude:", coordinate.latitude);
    console.log("Longitude:", coordinate.longitude);
  // Exemplo: Adicionar um novo marcador no local clicado
    setMarkers(markers => [
    ...markers,
    {
      id: markers.length + 1,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      title: `Novo Pin ${markers.length + 1}`,
      description: "Marcador adicionado pelo usuário",
    }
  ]);
}

  return (
    <View style={styles.container}>
      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder="ORIGEM"
          onPress={(data, details = null) => {
              if (details?.geometry?.location) {
              let originCordinates = {
                latitude: details?.geometry?.location?.lat,
                longitude: details?.geometry?.location?.lng
              }  
              const { lat, lng } = details.geometry.location;
              setOrigin({latitude: originCordinates.latitude, longitude: originCordinates.longitude});
              console.log(origin)
              moveToLocation(originCordinates.latitude, originCordinates.longitude);
            }
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "pt-BR",
          }}
          styles={{
            textInputContainer: {
              backgroundColor: "white",
              borderRadius: 10,
              paddingHorizontal: 10,
              marginHorizontal: 5,
              elevation: 5, // Android
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 3,
            },
            textInput: {
              height: 40,
              fontSize: 16,
            },
            listView: {
              backgroundColor: "white",
              width: '90%',
              alignSelf: 'center',
              borderRadius: 6,
            },
          }}
        />

<GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder="DESTINO"
          onPress={(data, details = null) => {
            if (details?.geometry?.location) {
              let destinationCordinates = {
                latitude: details?.geometry?.location?.lat,
                longitude: details?.geometry?.location?.lng
              }  
              //const { lat, lng } = details.geometry.location;
              setDestination({latitude: destinationCordinates.latitude, longitude: destinationCordinates.longitude});
              console.log(destination)
              moveToLocation(destination.latitude, destination.longitude);
            }
          }}
          query={{
            
            key: GOOGLE_MAPS_API_KEY,
            language: "pt-BR",
          }}
          styles={{
            textInputContainer: {
              backgroundColor: "white",
              borderRadius: 10,
              paddingHorizontal: 10,
              marginHorizontal: 5,
              elevation: 5, // Android
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 3,
            },
            textInput: {
              height: 40,
              fontSize: 16,
            },
            listView: {
              backgroundColor: "black",
            },
          }}
        />
      </View>

      {/* Mapa */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        onPress={e => handleNewPin(e.nativeEvent.coordinate)}
        style={styles.map}
        initialRegion={{
          latitude: -20.758114,
          longitude: -41.461315,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {origin !== undefined ? 
        <Marker coordinate={origin}
        title="origem"
        description="saindo daqui"/> : null}

        {destination !== undefined ? 
        <Marker coordinate={destination}
        title="destino"
        description="indo pra ca"/> : null}
      
        {/*
          {markers.map((marker) => (
            <Marker
              draggable
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
            />
          ))}
        */}
        
        
        {/*<Marker
          draggable
          coordinate={{
            latitude: -20.7639,
            longitude: -41.5328,
          }}
          title={"Outro Pin"}
          description={"Exemplo de outra marcação"}
        />
        */}

        {origin != undefined && destination != undefined ? 
            <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeColor="blue"
            strokeWidth={3}
            mode="DRIVING"
          />
        : null}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: '100%',
      alignItems: 'center',
      
    },
    map: {
      ...StyleSheet.absoluteFillObject,

    },
    searchContainer: {
        position: "absolute",
        top: 20,
        left: 0,
        right: 0,
        zIndex: 1, // Para garantir que apareça acima do mapa
        display: 'flex',
        flexDirection: 'row',
    },
   });

