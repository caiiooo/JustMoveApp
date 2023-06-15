import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  TouchableOpacity,
  InteractionManager,
  Image,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import * as ImagePicker from 'expo-image-picker';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  TextInput,
  Icon,
  Text,
  Button,
  Tag,
  Card,
} from '@components';
import {modalitysActions} from '@actions';
import placeService from '@services/placeService';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {useTranslation} from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';

import styles from './styles';

export default function AddPlace({route, navigation}) {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const modalitys = useSelector(state => state.modality.modalitys);

  const [placeName, setPlaceName] = useState('Test place');
  const [placeLocation, setPlaceLocation] = useState({});
  const [placeModality, setPlaceModality] = useState({});

  const [placeImages, setPlaceImages] = useState([]);

  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState({
    placeName: true,
    placeLocation: false,
    placeModality,
  });

  const [renderMapView, setRenderMapView] = useState(false);

  useEffect(() => {
    dispatch(modalitysActions.onGetModalitys());
  }, []);
  useEffect(() => {
    console.log("=============================")
    console.log(modalitys)
    console.log(modalitys.length)
  }, [modalitys]);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setRenderMapView(true);
    });
  }, []);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('locations', location);
      const {coords} = location;
      setLocation({latitude: coords.latitude, longitude: coords.longitude});
      setPlaceLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    })();
  }, []);

  const isValidForm = () => {
    let formValid = true;
    let nextSucessState = success;
    if (placeName === '') {
      nextSucessState = {...nextSucessState, placeName: false};
      formValid = false;
    }
    if (placeModality === {}) {
      nextSucessState = {...nextSucessState, placeModality: false};
      formValid = false;
    }
    if (placeLocation === {}) {
      nextSucessState = {...nextSucessState, placeLocation: false};
      formValid = false;
    }

    setSuccess(nextSucessState);
    return formValid;
  };
  /**
   *
   * Called when process checkout
   */
  const onSubmit = () => {
    if (isValidForm()) {
      setLoading(true);
      const place = {
        name: placeName,
        location: placeLocation,
        modality: placeModality,
        photo: placeImages,
      };
      placeService
        .createPlace(place)
        .then(result => {
          console.log('result', result);
          if (result.success) {
            navigation.navigate('Place');
            console.log(result.data.message);
          }
          setLoading(false);
        })
        .then(error => {
          console.log(error);
        })
        .catch(error => {
          setLoading(false);
          if (error?.error && typeof error?.error === 'string')
            return Alert.alert(error.error);
          if (
            error?.error?.message &&
            typeof error?.error?.message === 'string'
          )
            return Alert.alert(error.error.message);
          return Alert.alert('Erro desconhecido');
        });
    }
  };

  const onSelectModality = select => {
    setPlaceModality(select);
  };

  const onPhotoSelected = assets => {
    console.log(Array.isArray(assets.assets))
    console.log(Array.isArray(placeImages))
    if (!Array.isArray(assets.assets)) assets.assets = [assets.assets];
    setPlaceImages([...placeImages, ...assets.assets]);
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('add_place')}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 30}}>
            <Text headline semibold style={{marginTop: 20}}>
              {t('place_information')}
            </Text>
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setPlaceName(text)}
              placeholder={t('place_name')}
              success={success.placeName}
              value={placeName}
            />

            <Text headline semibold style={{marginTop: 20}}>
              {t('place_modality')}
            </Text>
            <View style={{padding: 10}}></View>
            <FlatList
              contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={modalitys}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <Tag
                  primary={item._id === placeModality}
                  style={{marginLeft: 15, width: 80}}
                  outline={item._id !== placeModality}
                  onPress={() => onSelectModality(item._id)}>
                  {item.name}
                </Tag>
              )}
            />

            <Text headline semibold style={{marginTop: 20}}>
              {t('place_images')}
            </Text>
            <View style={styles.buttonAddImage}>
              <Button
                full
                onPress={() =>
                  navigation.navigate('ImageSelector', {
                    onPhotoSelected,
                    allowsMultiple: true,
                    allowsEditing: false,
                  })
                }>
                {t('add_image')}
              </Button>
            </View>
            <FlatList
              style={styles.contentImageGird}
              data={placeImages}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      margin: 10,
                    }}>
                    <Image
                      style={styles.image}
                      source={{uri: item.uri}}></Image>
                  </View>
                );
              }}
            />

            <Text headline semibold style={{marginTop: 20}}>
              {t('place_location')}
            </Text>
            <View
              style={{
                width: '100%',
                marginTop: 10,
              }}>
              {renderMapView && (
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  region={{
                    latitude: location.latitude || 1.9344,
                    longitude: location.longitude || 103.358727,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.1,
                  }}
                  onRegionChange={event => {
                    // console.log(event);
                    // setPlaceLocation({
                    //   latitude: event.latitude || 1.9344,
                    //   longitude: event.longitude || 103.358727,
                    // });
                  }}>
                  <Marker
                    // onDragEnd={(e) => {console.log('dragEnd', e.nativeEvent.coordinate)}}
                    onDragEnd={e => {
                      setPlaceLocation(e.nativeEvent.coordinate);
                    }}
                    draggable
                    coordinate={{
                      latitude: location.latitude || 1.9344,
                      longitude: location.longitude || 103.358727,
                    }}
                  />
                </MapView>
              )}
            </View>
          </ScrollView>
          <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
            <Button
              loading={loading}
              full
              onPress={() => {
                onSubmit();
              }}>
              {t('add_place_button')}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
