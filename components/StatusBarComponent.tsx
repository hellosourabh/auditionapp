import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../app/context/ThemeContext';

export const StatusBarComponent = () => {
  const { isDark } = useTheme();

  return (
    <StatusBar style={isDark ? 'light' : 'dark'} />
  );
};
