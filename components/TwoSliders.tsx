import React from 'react';
import Svg, { Line, Circle } from 'react-native-svg';
import { View } from 'react-native';

interface TwoSlidersProps {
  color?: string;
  size?: number;
}

export const TwoSliders = ({ color = '#fff', size = 24 }: TwoSlidersProps) => {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {/* First slider */}
        <Line x1="4" y1="9" x2="20" y2="9" />
        <Circle cx="8" cy="9" r="2.5" fill="none" />

        {/* Second slider */}
        <Line x1="4" y1="15" x2="20" y2="15" />
        <Circle cx="16" cy="15" r="2.5" fill="none" />
      </Svg>
    </View>
  );
};
