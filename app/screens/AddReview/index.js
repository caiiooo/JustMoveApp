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
import {BaseStyle, BaseColor, useTheme, Images} from '@config';
import {
  Header,
  SafeAreaView,
  TextInput,
  Icon,
  Text,
  Button,
  Tag,
  Card,
  StarRating
} from '@components';
import {modalitysActions} from '@actions';
import placeService from '@services/placeService';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {useTranslation} from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';

import styles from './styles';

export default function AddReview({route, navigation}) {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const modalitys = useSelector(state => state.modality.modalitys);

  const [reviewRating, setReviewRating] = useState(5);
  const [comment, setComment] = useState(5);
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
    console.log('=============================');
    console.log(modalitys);
    console.log(modalitys.length);
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
    console.log(Array.isArray(assets.assets));
    console.log(Array.isArray(placeImages));
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
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t('save')}
            </Text>
          );
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{paddingHorizontal: 20, padding: 30}}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={Images.profile2}
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 31,
                }}
              />
              <View style={{width: 160}}>
                <StarRating
                  starSize={26}
                  maxStars={5}
                  rating={reviewRating}
                  selectedStar={rating => {
                    setReviewRating(rating);
                  }}
                  fullStarColor={BaseColor.yellowColor}
                  containerStyle={{padding: 5}}
                />
                <Text caption1 grayColor style={{textAlign: 'center'}}>
                  {t('tap_to_rate')}
                </Text>
              </View>
            </View>
            <Text headline semibold style={{marginTop: 20}}>
              {t('review_coment')}
            </Text>
            <TextInput
              style={{marginTop: 20, height: 150}}
              onChangeText={text => setComment(text)}
              textAlignVertical="top"
              multiline={true}
              value={comment}
              placeholder={t('review_coment_placeholeder')}
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
          </ScrollView>
          {/* <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
            <Button
              loading={loading}
              full
              onPress={() => {
                onSubmit();
              }}>
              {t('add_review_button')}
            </Button>
          </View> */}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
