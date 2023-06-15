import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, TouchableOpacity} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {SafeAreaView, Icon, Text} from '@components';
import {ApplicationActions} from '@actions';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import * as ExpoImagePicker from 'expo-image-picker';

export default function ImageSelector({navigation, route}) {
  const {
    onPhotoSelected,
    allowsMultiple = false,
    allowsEditing = true,
  } = route.params;
  const {t} = useTranslation();
  const {colors} = useTheme();

  const openCamera = async () => {
    try {
      console.log('status,', ExpoImagePicker);
      const {status} = await ExpoImagePicker.requestCameraPermissionsAsync();

      console.log('status', status);
      if (status === 'granted') {
        let result = await ExpoImagePicker.launchCameraAsync({
          allowsEditing: allowsEditing,
          aspect: [4, 3],
          quality: 0.2,
        });

        if (!result.canceled) {
          navigation.goBack();
          onPhotoSelected(result);
          return result.assets;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const selectoImageFromLibrary = async () => {
    const {status} =
      await ExpoImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      let result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: allowsEditing,
        aspect: [4, 3],
        quality: 0.2,
        allowsMultipleSelection: allowsMultiple,
      });

      if (!result.canceled) {
        navigation.goBack();
        onPhotoSelected(result);
        return result.assets;
      }
    }
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'left', 'bottom']}>
      <View style={styles.contain}>
        <View style={[styles.contentModal, {backgroundColor: colors.card}]}>
          <View style={{padding: 8}}>
            <TouchableOpacity
              style={[
                styles.item,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => openCamera()}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text body1 style={{marginHorizontal: 8}}>
                  {t('select_camera')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => selectoImageFromLibrary()}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text body1 style={{marginHorizontal: 8}}>
                  {t('select_library')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentAction}>
            <TouchableOpacity
              style={{padding: 8, marginHorizontal: 24}}
              onPress={() => navigation.goBack()}>
              <Text body1 grayColor>
                {t('cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
