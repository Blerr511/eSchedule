import {useTheme} from 'hooks';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SettingsIcon = () => <Icon size={20} color={useTheme().pallet.primary} name="user-cog" />;

export default SettingsIcon;
