import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Image as SvgImage, Defs, ClipPath } from 'react-native-svg';

interface AuditionCircleLogoProps {
  size?: number;
}

export const AuditionCircleLogo = ({ size = 100 }: AuditionCircleLogoProps) => {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {/* Define a circular clip path */}
        <Defs>
          <ClipPath id="circleClip">
            <Circle cx="50" cy="50" r="48" />
          </ClipPath>
        </Defs>

        {/* Black circle background */}
        <Circle cx="50" cy="50" r="50" fill="#000000" />

        {/* Background image (slightly larger) to fill any gaps */}
        <SvgImage
          href="https://www.theauditionapp.com/wp-content/uploads/2025/01/AUDITION-1.png"
          x="-5"
          y="0"
          width="110"
          height="110"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#circleClip)"
          opacity="0.5"
        />

        {/* Main image */}
        <SvgImage
          href="https://www.theauditionapp.com/wp-content/uploads/2025/01/AUDITION-1.png"
          x="0"
          y="5"
          width="95"
          height="95"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#circleClip)"
        />

        {/* White border */}
        <Circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
