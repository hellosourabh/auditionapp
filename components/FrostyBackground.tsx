import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Filter, FeGaussianBlur, FeColorMatrix, FeTurbulence, FeDisplacementMap } from 'react-native-svg';

interface FrostyBackgroundProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  intensity?: number;
}

export const FrostyBackground = ({ 
  width = '100%', 
  height = '100%', 
  borderRadius = 30,
  intensity = 5
}: FrostyBackgroundProps) => {
  return (
    <View style={[styles.container, { width, height, borderRadius }]}>
      <Svg width="100%" height="100%" viewBox="0 0 300 200">
        <Defs>
          {/* Frost effect filter */}
          <Filter id="frost" x="-20%" y="-20%" width="140%" height="140%">
            {/* Base blur */}
            <FeGaussianBlur in="SourceGraphic" stdDeviation={intensity} />
            
            {/* Add some noise texture */}
            <FeTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
            <FeDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
            
            {/* Adjust colors for frosty look */}
            <FeColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.7 0"
            />
          </Filter>
          
          {/* Gradient for the frosty look */}
          <LinearGradient id="frostyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
            <Stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
          </LinearGradient>
        </Defs>
        
        {/* Dark background */}
        <Rect x="0" y="0" width="300" height="200" fill="rgba(0, 0, 0, 0.6)" rx={borderRadius} ry={borderRadius} />
        
        {/* Frosty overlay */}
        <Rect 
          x="0" 
          y="0" 
          width="300" 
          height="200" 
          fill="url(#frostyGradient)" 
          filter="url(#frost)"
          rx={borderRadius} 
          ry={borderRadius}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
