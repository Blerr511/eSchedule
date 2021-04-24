import {useTheme} from 'hooks';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

const UndefinedIcon = () => <Icon size={20} color={useTheme().pallet.primary} name="question" />;

export default UndefinedIcon;
