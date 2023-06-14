import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
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
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function SignUp({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    name: true,
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
    console.log('TEST');

    if (name.trim() == '' || email.trim() == '' || address.trim() == '') {
      setSuccess({
        ...success,
        name: name != '' ? true : false,
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
      setSuccess({
        ...success,
        repassword: false,
      });
      return false;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // navigation.navigate('SignIn');
    }, 500);
  };

  const onImageSelected = assets => {
    setImage(assets.uri);
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
                    onImageSelected,
                    multipleImg: false,
                  })
                }
                activeOpacity={0.9}>
                {image ? (
                  <Image source={{uri: image}} style={styles.image} />
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
              onChangeText={text => setName(text)}
              placeholder={t('input_name')}
              success={success.name}
              value={name}
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
