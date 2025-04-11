import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Text } from 'react-native-svg';

interface AuditionLogoProps {
  width?: number;
  height?: number;
}

export const AuditionLogo = ({ width = 350, height = 350 }: AuditionLogoProps) => {
  // Create vertical stack of hollow text (5-6 copies going down)
  const verticalLayers = [
    { dy: 0, opacity: 1.0 },    // Main text
    { dy: 25, opacity: 0.9 },   // First copy below
    { dy: 50, opacity: 0.8 },   // Second copy below
    { dy: 75, opacity: 0.7 },   // Third copy below
    { dy: 100, opacity: 0.6 },  // Fourth copy below
    { dy: 125, opacity: 0.5 },  // Fifth copy below
  ];

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 350 350" preserveAspectRatio="xMidYMid meet">
        {/* Main solid text at the top */}
        <Text
          x="175"
          y="100"
          fontSize="75"
          fontWeight="900"
          fontFamily="Arial-Black, Arial"
          letterSpacing="0"
          fill="#FFFFFF"
          strokeWidth="1"
          stroke="#FFFFFF"
          textAnchor="middle"
        >
          AUDITION
        </Text>

        {/* Create the vertical stack of hollow text copies */}
        {verticalLayers.slice(1).map((layer, index) => (
          <Text
            key={index}
            x="175"
            y={100 + layer.dy}
            fontSize="75"
            fontWeight="900"
            fontFamily="Arial-Black, Arial"
            letterSpacing="0"
            fill="transparent"
            stroke="#FFFFFF"
            strokeWidth="2"
            opacity={layer.opacity}
            textAnchor="middle"
          >
            AUDITION
          </Text>
        ))}
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
