import {useTheme} from 'hooks';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CalendarIcon = () => <Icon size={20} color={useTheme().pallet.primary} name="calendar" />;

export default CalendarIcon;
