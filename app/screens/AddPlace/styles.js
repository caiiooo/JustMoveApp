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
    flexDirection: 'row',
    height: Utils.scaleWithPixel(160),
    marginTop: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
