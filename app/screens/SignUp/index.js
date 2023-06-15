import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Button,
  TextInput,
  Image,
} from '@components';
import userService from '@services/userService';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function SignUp({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [photo, setPhoto] = useState(null);
  const [username, setUsername] = useState('caio');
  const [email, setEmail] = useState('caio@Hiboost.com.br');
  const [password, setPassword] = useState('1234');
  const [repassword, setRepassword] = useState('1234');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    username: true,
    password: true,
    passwordRepeat: true,
    email: true,
    photo: true,
  });

  /**
   * call when action signup
   *
   */
  const onSignUp = () => {
    if (username.trim() == '' || email.trim() == '') {
      console.log('aaa');
      setSuccess({
        ...success,
        username: username != '' ? true : false,
        email: email != '' ? true : false,
        address: address != '' ? true : false,
      });
      return false;
    }
    if (password.trim() == '' || repassword.trim() == '') {
      setSuccess({
        ...success,
        password: false,
        repassword: false,
      });
      return false;
    }
    if (password !== repassword) {
      setRepassword('');
      setSuccess({
        ...success,
        repassword: false,
      });
      return false;
    }
    submitSignUp();
  };

  const submitSignUp = () => {
    console.log('tentando enviar');
    setLoading(true);
    userService
      .createUser({
        username,
        email,
        password,
        photo,
      })
      .then(result => {
        setLoading(false);
        if (result.success) navigation.navigate('SignIn');
      })
      .catch(error => {
        setLoading(false);
        if (error?.error && typeof error?.error === 'string')
          return Alert.alert(error.error);
        if (error?.error?.message && typeof error?.error?.message === 'string')
          return Alert.alert(error.error.message);
        return Alert.alert('Erro desconhecido');
      });
  };

  const onPhotoSelected = assets => {
    console.log(assets.uri);
    setPhoto(assets.uri);
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('sign_up')}
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
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <View style={styles.contain}>
            <View style={styles.thumb}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ImageSelector', {
                    onPhotoSelected,
                    multipleImg: false,
                  })
                }
                activeOpacity={0.9}>
                {photo ? (
                  <Image source={{uri: photo}} style={styles.image} />
                ) : (
                  <Icon
                    name="camera"
                    size={20}
                    color={colors.primary}
                    enableRTL={true}
                  />
                )}
              </TouchableOpacity>
            </View>
            <TextInput
              onChangeText={text => setEmail(text)}
              placeholder={t('input_email')}
              keyboardType="email-address"
              success={success.email}
              value={email}
            />
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setUsername(text)}
              placeholder={t('input_username')}
              success={success.username}
              value={username}
            />
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              success={success.password}
              placeholder={t('input_password')}
              value={password}
            />
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setRepassword(text)}
              secureTextEntry={true}
              success={success.repassword}
              placeholder={t('input_repassword')}
              value={repassword}
            />

            <Button
              full
              style={{marginTop: 20}}
              loading={loading}
              onPress={() => onSignUp()}>
              {t('sign_up')}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
