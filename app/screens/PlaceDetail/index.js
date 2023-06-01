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
  RateDetail,
  CommentItem
} from '@components';
import * as Utils from '@utils';
import {ReviewData} from '@data';
import {InteractionManager, RefreshControl} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import styles from './styles';
import {HelpBlockData} from '@data';
import {useTranslation} from 'react-i18next';

export default function PlaceDetail({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [renderMapView, setRenderMapView] = useState(false);
  const [region] = useState({
    latitude: 1.9344,
    longitude: 103.358727,
    latitudeDelta: 0.05,
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

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 40;

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={Images.room6}
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
          navigation.navigate('PreviewImage');
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
                Hilton San Francisco
              </Text>
              <StarRating
                disabled={true}
                starSize={14}
                maxStars={5}
                rating={4.5}
                selectedStar={rating => {}}
                fullStarColor={BaseColor.yellowColor}
              />
              <Text
                body2
                style={{
                  marginTop: 5,
                  textAlign: 'center',
                }}>
                Facilities provided may range from a modest quality mattress in
                a small room to large suites
              </Text>
            </View>
            {/* Description */}
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text headline semibold>
                {t('description')}
              </Text>
              <Text body2 style={{marginTop: 5}}>
                218 Austen Mountain, consectetur adipiscing, sed eiusmod tempor
                incididunt ut labore et dolore
              </Text>
            </View>
            {/* Facilities Icon */}
            <View
              style={[
                styles.contentService,
                {borderBottomColor: colors.border},
              ]}>
              {[
                {key: '1', name: 'wifi'},
                {key: '2', name: 'coffee'},
                {key: '3', name: 'bath'},
                {key: '4', name: 'car'},
                {key: '5', name: 'paw'},
              ].map((item, index) => (
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
                    region={region}
                    onRegionChange={() => {}}>
                    <Marker
                      coordinate={{
                        latitude: 1.9344,
                        longitude: 103.358727,
                      }}
                    />
                  </MapView>
                )}
              </View>
            </View>

            {/* Galery */}
            <View style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <Text headline semibold>
                  {t('galery')}
                </Text>
                <TouchableOpacity>
                  <Text footnote grayColor>
                    Show more
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contentImageGird}>
                <View style={{flex: 4, marginRight: 10}}>
                  <Card image={Images.trip7}>
                    <Text headline semibold whiteColor>
                      Dallas
                    </Text>
                  </Card>
                </View>
                <View style={{flex: 6}}>
                  <View style={{flex: 1}}>
                    <Card image={Images.trip3}>
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
                      <Card image={Images.trip4}>
                        <Text headline semibold whiteColor>
                          Yokohama
                        </Text>
                      </Card>
                    </View>
                    <View style={{flex: 4}}>
                      <Card image={Images.trip6}>
                        <Text headline semibold whiteColor>
                          10+
                        </Text>
                      </Card>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* Review */}
            <View style={styles.blockView}>
              <ReviewTab></ReviewTab>
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

function ReviewTab({navigation}) {
  const [refreshing] = useState(false);
  const [rateDetail] = useState({
    point: 4.7,
    maxPoint: 5,
    totalRating: 25,
    data: ['80%', '10%', '10%', '0%', '0%'],
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
        <RateDetail
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
