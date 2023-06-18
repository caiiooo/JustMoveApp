import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  inputItem: {
    flex: 6.5,
    paddingLeft: 10,
  },
  buttonAddImage: {
    marginTop: 10,
  },
  contentImageGird: {
    // height: Utils.scaleWithPixel(160),
    marginTop: 10,
  },
  image: {
    width: 100,
    borderRadius: 8,
    height: 100,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    height: Utils.scaleWithPixel(360),
  },
});
