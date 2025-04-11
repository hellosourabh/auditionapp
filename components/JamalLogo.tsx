import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Text } from 'react-native-svg';

interface AuditionLogoProps {
  width?: number;
  height?: number;
}

export const JamalLogo = ({ width = 350, height = 350 }: AuditionLogoProps) => {
  // Create vertical stack of hollow text (5-6 copies going down)
  const verticalLayers = [
    { dy: 0, opacity: 1.0 },    // Main text
    { dy: 40, opacity: 0.9 },   // First copy below
    { dy: 80, opacity: 0.8 },   // Second copy below
    { dy: 120, opacity: 0.7 },  // Third copy below
    { dy: 160, opacity: 0.5 },  // Fourth copy below
    { dy: 200, opacity: 0.3 },  // Fifth copy below
  ];

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 350 350">
        {/* Main solid text at the top */}
        <Text
          x="10"
          y="70"
          fontSize="90"
          fontWeight="900"
          fontFamily="Arial-Black, Arial"
          letterSpacing="2"
          fill="#FFFFFF"
          strokeWidth="1"
          stroke="#FFFFFF"
        >
          JAMAL
        </Text>

        {/* Create the vertical stack of hollow text copies */}
        {verticalLayers.slice(1).map((layer, index) => (
          <Text
            key={index}
            x="10"
            y={70 + layer.dy}
            fontSize="90"
            fontWeight="900"
            fontFamily="Arial-Black, Arial"
            letterSpacing="2"
            fill="transparent"
            stroke="#FFFFFF"
            strokeWidth="2"
            opacity={layer.opacity}
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
