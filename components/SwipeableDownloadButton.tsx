import { View,Platform } from 'react-native'
import React, { useState } from 'react'
import { defaultStyle } from '../styles/default.style'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { SWIPABLE_WIDTH, SWIPABLE_AREA, SWIPABLE_RANGE } from './constants/swipeableButton.constant'

type T_SwipeableDownloadButtonProps = {
    url: string
}

export default function SwipeableDownloadButton({ url }: T_SwipeableDownloadButtonProps) {
    const offset = useSharedValue(0);
    const [swipeText, setSwipeText] = useState("");
    const handleDownload = async () => {
        setSwipeText("Downloading...")
        const filename = new Date().getTime() + '.jpg';
        const result = await FileSystem.downloadAsync(
            url,
            FileSystem.documentDirectory + filename
        );
        if (result.status === 200) {
            await save(result.uri);
        }
    }

    const save = async (fileUri: string) => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
            try {
                const asset = await MediaLibrary.createAssetAsync(fileUri);
                const album = await MediaLibrary.getAlbumAsync('Download');
                if (album == null) {
                    await MediaLibrary.createAlbumAsync('Download', asset, false);
                } else {
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                }
            } catch (err) {
                console.log("Save err: ", err)
            }
        } else {
            alert("Please allow permissions to download");
        }
    
        // Reset animation and text after saving
        offset.value = withSpring(0);
        setSwipeText('');
    };

    const pan = Gesture.Pan()
        .onChange((event) => {
            offset.value = event.translationX;
        })
        .onFinalize(() => {
            console.log(offset.value);
            if (offset.value < SWIPABLE_WIDTH / 2 - SWIPABLE_AREA / 2) {
                offset.value = withSpring(0);
                return;
            } else {
                offset.value = withSpring(SWIPABLE_RANGE);
                runOnJS(handleDownload)();
                return;
            }
        });
    const InterpolateXInput = [0, SWIPABLE_RANGE];
    const animatedStyles = {
        swipeable: useAnimatedStyle(() => {
            return {
                transform: [
                    { translateX: offset.value },
                ]
            };
        }),
        swipeText: useAnimatedStyle(() => {
            return {
                opacity: interpolate(
                    offset.value,
                    InterpolateXInput,
                    [0.9, 0],
                    Extrapolate.CLAMP,
                ),
                transform: [
                    {
                        translateX: interpolate(
                            offset.value,
                            InterpolateXInput,
                            [0, SWIPABLE_WIDTH / 2 - SWIPABLE_AREA],
                            Extrapolate.CLAMP,
                        ),
                    },
                ],
            };
        }),
    }
    return (
        <View style={[defaultStyle.container, defaultStyle.swipeableContainer, {
            marginBottom: 20,
            marginTop: 20,
            marginHorizontal: 20,
            flex: 0,
            width: 'auto',
        }]}>
            <Animated.Text style={defaultStyle.downloadText}>{swipeText}</Animated.Text>
            <Animated.Text style={animatedStyles.swipeText}>Swipe to download</Animated.Text>
            <GestureDetector
                gesture={pan}
            >
                <Animated.View style={[defaultStyle.swipeableButton, animatedStyles.swipeable]}></Animated.View>
            </GestureDetector>
        </View>
    )
}