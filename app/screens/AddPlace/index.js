import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
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
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function AddPlace({route, navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [name, setName] = useState('');
  const [] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const [] = useState('');
  const [] = useState('');
  const [] = useState('');
  const [loading, setLoading] = useState(false);
  const [success] = useState({
    name: true,
    street: false,
    city: true,
    postCode: true,
    country: true,
    contactName: true,
    email: true,
    phone: true,
  });

  const [region] = useState({
    latitude: 1.9344,
    longitude: 103.358727,
    latitudeDelta: 0.05,
    longitudeDelta: 0.004,
  });
  const [renderMapView, setRenderMapView] = useState(false);

  const [modalitys, setModalitys] = useState([
    {id: '1', name: 'Wifi', checked: true},
    {id: '2', name: 'Parking'},
    {id: '3', name: 'Premier'},
    {id: '4', name: 'Shower'},
  ]);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setRenderMapView(true);
    });
  }, []);

  /**
   *
   * Called when process checkout
   */
  const onSubmit = () => {
    const bookingType = route.params?.bookingType;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      switch (bookingType) {
        case 'Event':
          navigation.navigate('EventTicket');
          break;
        case 'Bus':
          navigation.navigate('BusTicket');
          break;
        default:
          navigation.navigate('PaymentMethod');
          break;
      }
    }, 500);
  };

  const onSelectModality = select => {
    console.warn(select);
  };

  const onAddImage = image => {};


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
          <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
            <Text headline semibold style={{marginTop: 20}}>
              {t('place_information')}
            </Text>
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setName(text)}
              placeholder={t('place_name')}
              success={success.name}
              value={name}
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
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Tag
                  primary={item.checked}
                  style={{marginLeft: 15, width: 80}}
                  outline={!item.checked}
                  onPress={() => onSelectModality(item)}>
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
                onPress={() => {
                  onAddImage();
                }}>
                {t('add_image')}
              </Button>
            </View>
            <View style={styles.contentImageGird}>
              <View style={{flex: 4, marginRight: 10}}>
                <Card>
                  <Text headline semibold whiteColor>
                    Dallas
                  </Text>
                </Card>
              </View>
              <View style={{flex: 6}}>
                <View style={{flex: 1}}>
                  <Card>
                    <Text headline semibold whiteColor>
                      Warsaw
                    </Text>
                  </Card>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <View style={{flex: 6, marginRight: 10}}>
                    <Card>
                      <Text headline semibold whiteColor>
                        Yokohama
                      </Text>
                    </Card>
                  </View>
                  <View style={{flex: 4}}>
                    <Card>
                      <Text headline semibold whiteColor>
                        10+
                      </Text>
                    </Card>
                  </View>
                </View>
              </View>
            </View>

            <Text headline semibold style={{marginTop: 20}}>
              {t('place_location')}
            </Text>
            <View
              style={{
                height: 180,
                width: '100%',
                marginTop: 10,
              }}>
              {renderMapView && (
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  region={region}
                  onRegionChange={(event) => {}}>
                  <Marker
                    coordinate={{
                      latitude: 1.9344,
                      longitude: 103.358727,
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
