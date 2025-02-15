import React, { useEffect, useRef, useState } from 'react';
import { COLORS } from '../../theme/color';
import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;

const ToastContainer = styled(Animated.View)`
  position: absolute;
  top: 30px;
  left: 50%;
  width: 95%;
  background-color: ${(props) => props.backgroundColor || COLORS.MainYellow};
  padding: 12px 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ToastText = styled.Text`
  color: ${COLORS.Black};
  font-weight: 400;
`;

const Alert = ({ message, visible, duration = 2000, onHide, backgroundColor }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,

            }).start();

            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    if (onHide) onHide();
                })
            }, duration)
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <ToastContainer
            style={{ opacity: fadeAnim, transform: [{ translateX: -0.475 * screenWidth }] }}
            backgroundColor={backgroundColor}
        >
            <ToastText>{message}</ToastText>
        </ToastContainer>
    )
}

export default Alert