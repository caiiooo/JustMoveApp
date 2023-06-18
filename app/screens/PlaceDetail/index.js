import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  StarRating,
  PostListItem,
  HelpBlock,
  Button,
  RoomType,
  Card,
  PlaceRateDetail,
  CommentItem,
} from '@components';
import * as Utils from '@utils';
import placeService from '@services/placeService';
import {ReviewData} from '@data';
import {InteractionManager, RefreshControl, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import styles from './styles';
import {HelpBlockData} from '@data';
import {useTranslation} from 'react-i18next';

export default function PlaceDetail({navigation, route}) {
  const {_id} = route.params;
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [place, setPlace] = useState(null);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [renderMapView, setRenderMapView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [region] = useState({
    latitude: 1.9344,
    longitude: 103.358727,
    latitudeDelta: 0.02,
    longitudeDelta: 0.004,
  });
  const [roomType] = useState([
    {
      id: '1',
      image: Images.room8,
      name: 'Standard Twin Room',
      price: '$399,99',
      available: 'Hurry Up! This is your last room!',
      services: [
        {icon: 'wifi', name: 'Free Wifi'},
        {icon: 'shower', name: 'Shower'},
        {icon: 'users', name: 'Max 3 aduts'},
        {icon: 'subway', name: 'Nearby Subway'},
      ],
    },
    {
      id: '2',
      image: Images.room5,
      name: 'Delux Room',
      price: '$399,99',
      available: 'Hurry Up! This is your last room!',
      services: [
        {icon: 'wifi', name: 'Free Wifi'},
        {icon: 'shower', name: 'Shower'},
        {icon: 'users', name: 'Max 3 aduts'},
        {icon: 'subway', name: 'Nearby Subway'},
      ],
    },
  ]);
  const [todo] = useState([
    {
      id: '1',
      title: 'South Travon',
      image: Images.trip1,
    },
    {
      id: '2',
      title: 'South Travon',
      image: Images.trip2,
    },
    {
      id: '3',
      title: 'South Travon',
      image: Images.trip3,
    },
    {
      id: '4',
      title: 'South Travon',
      image: Images.trip4,
    },
    {
      id: '5',
      title: 'South Travon',
      image: Images.trip5,
    },
  ]);
  const [helpBlock] = useState(HelpBlockData);
  const deltaY = new Animated.Value(0);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setRenderMapView(true);
    });
  }, []);

  useEffect(() => {
    console.log('----------------', _id);
    setLoading(true);
    placeService
      .getPlace(_id)
      .then(result => {
        console.log('result', result);
        if (result) setPlace(result);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        if (error?.error && typeof error?.error === 'string')
          return Alert.alert(error.error);
        if (error?.error?.message && typeof error?.error?.message === 'string')
          return Alert.alert(error.error.message);
        return Alert.alert('Erro desconhecido');
      });
  }, [_id]);

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 40;

  const renderPhotos = photos => {
    if (!photos || !Array.isArray(photos)) return;
    if (photos.length === 1)
      return (
        <>
          <View style={{flex: 4, marginRight: 10}}>
            <Card image={{uri: place.photo[0]}}></Card>
          </View>
          <View style={{flex: 6}}></View>
        </>
      );
    if (photos.length === 2)
      return (
        <>
          <View style={{flex: 4, marginRight: 10}}>
            <Card image={place.photo[0]}></Card>
          </View>
          <View style={{flex: 6}}>
            <View style={{flex: 1}}>
              <Card image={place.photo[1]}>
                <Text headline semibold whiteColor></Text>
              </Card>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
              }}></View>
          </View>
        </>
      );
    if (photos.length === 3)
      return (
        <>
          <View style={{flex: 4, marginRight: 10}}>
            <Card image={place.photo[0]}>
              <Text headline semibold whiteColor>
                Dallas
              </Text>
            </Card>
          </View>
          <View style={{flex: 6}}>
            <View style={{flex: 1}}>
              <Card image={place.photo[1]}>
                <Text headline semibold whiteColor></Text>
              </Card>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <View style={{flex: 6, marginRight: 10}}>
                <Card image={place.photo[2]}>
                  <Text headline semibold whiteColor>
                    Yokohama
                  </Text>
                </Card>
              </View>
            </View>
          </View>
        </>
      );
    if (photos.length === 4)
      return (
        <>
          <View style={{flex: 4, marginRight: 10}}>
            <Card image={place.photo[0]}>
              <Text headline semibold whiteColor>
                Dallas
              </Text>
            </Card>
          </View>
          <View style={{flex: 6}}>
            <View style={{flex: 1}}>
              <Card image={place.photo[1]}>
                <Text headline semibold whiteColor></Text>
              </Card>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <View style={{flex: 6, marginRight: 10}}>
                <Card image={place.photo[2]}>
                  <Text headline semibold whiteColor>
                    Yokohama
                  </Text>
                </Card>
              </View>
              <View style={{flex: 4}}>
                <Card image={place.photo[3]}>
                  <Text headline semibold whiteColor>
                    {photo.length - 4}+
                  </Text>
                </Card>
              </View>
            </View>
          </View>
        </>
      );
  };

  if (!place) return <></>;

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={{uri: place?.photo[0]?.url}}
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(200),
                Utils.scaleWithPixel(200),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}
      />
      {/* Header */}
      <Header
        title=""
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={BaseColor.whiteColor}
              enableRTL={true}
            />
          );
        }}
        renderRight={() => {
          return <Icon name="images" size={20} color={BaseColor.whiteColor} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('PlaceImageGalery', {
            photo: place.photo,
            title: place.name,
          });
        }}
      />
      <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}>
          {/* Main Container */}
          <View style={{paddingHorizontal: 20}}>
            {/* Information */}
            <View
              style={[
                styles.contentBoxTop,
                {
                  marginTop: marginTopBanner,
                  backgroundColor: colors.card,
                  shadowColor: colors.border,
                  borderColor: colors.border,
                },
              ]}>
              <Text title2 semibold style={{marginBottom: 5}}>
                {place.name}
              </Text>
              <StarRating
                disabled={true}
                starSize={14}
                maxStars={5}
                rating={place.rating}
                selectedStar={rating => {}}
                fullStarColor={BaseColor.yellowColor}
              />
            </View>
            {/* Description */}
            {/* <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text headline semibold>
                {t('description')}
              </Text>
              <Text body2 style={{marginTop: 5}}>
                218 Austen Mountain, consectetur adipiscing, sed eiusmod tempor
                incididunt ut labore et dolore
              </Text>
            </View> */}
            {/* Facilities Icon */}
            <View
              style={[
                styles.contentService,
                {borderBottomColor: colors.border},
              ]}>
              {place.modality.map((item, index) => (
                <View style={{alignItems: 'center'}} key={'service' + index}>
                  <Icon name={item.name} size={24} color={colors.accent} />
                  <Text overline grayColor style={{marginTop: 4}}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
            {/* Map location */}
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text headline style={{marginBottom: 5}} semibold>
                {t('location')}
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
                    region={{
                      ...region,
                      latitude: place.location.coordinates[1],
                      longitude: place.location.coordinates[0],
                    }}
                    onRegionChange={() => {}}>
                    <Marker
                      coordinate={{
                        latitude: place.location.coordinates[1],
                        longitude: place.location.coordinates[0],
                      }}
                    />
                  </MapView>
                )}
              </View>
            </View>

            {/* Galery */}
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <Text headline semibold>
                  {t('galery')}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PlaceImageGalery', {
                      photo: place.photo,
                      title: place.name,
                    })
                  }>
                  <Text footnote grayColor>
                    Show more
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contentImageGird}>
                {renderPhotos(place.photo)}
              </View>
            </View>
            {/* Review */}
            <View style={styles.blockView}>
              <ReviewTab reviews={place.reviews} rating={place.rating} />
            </View>
          </View>
        </ScrollView>
        {/* Pricing & Booking Process */}
        {/* <View
          style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
          <View>
            <Text caption1 semibold>
              {t('price')}
            </Text>
            <Text title3 primaryColor semibold>
              $399.99
            </Text>
            <Text caption1 semibold style={{marginTop: 5}}>
              {t('avg_night')}
            </Text>
          </View>
          <Button onPress={() => navigation.navigate('PreviewBooking')}>
            {t('book_now')}
          </Button>
        </View> */}
      </SafeAreaView>
    </View>
  );
}

function ReviewTab({navigation, rating, reviews}) {
  const [refreshing] = useState(false);
  const [rateDetail] = useState({
    point: rating,
    maxPoint: 5,
    totalRating: 25,
    // data: ['80%', '10%', '10%', '0%', '0%'],
  });
  const [reviewList] = useState(ReviewData);
  const {colors} = useTheme();

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          colors={[colors.primary]}
          tintColor={colors.primary}
          refreshing={refreshing}
          onRefresh={() => {}}
        />
      }
      data={reviewList}
      keyExtractor={(item, index) => item.id}
      ListHeaderComponent={() => (
        <PlaceRateDetail
          point={rateDetail.point}
          maxPoint={rateDetail.maxPoint}
          totalRating={rateDetail.totalRating}
          data={rateDetail.data}
        />
      )}
      renderItem={({item}) => (
        <CommentItem
          style={{marginTop: 10}}
          image={item.source}
          name={item.name}
          rate={item.rate}
          date={item.date}
          title={item.title}
          comment={item.comment}
        />
      )}
    />
  );
}
