import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';

export function ScrollSync({rowItems, containerStyle}: {rowItems: JSX.Element[][], containerStyle?: StyleProp<ViewStyle>}) {
    const [contentPosition, setContentPosition] = React.useState(-1);
    const [scrollWidths, setScrollWidths] = React.useState<Map<number, number>>(new Map());
    const itemsRef = React.useRef<Array<ScrollView | null>>([]);
    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>, num: number) => {
        if (contentPosition !== num) {
            event.preventDefault();
            return;
        }
        const scrollableCoord = event.nativeEvent.contentOffset.x;
        const viewWidth = event.nativeEvent.layoutMeasurement.width;
        const contentWidth = event.nativeEvent.contentSize.width;
        const percentScroll = scrollableCoord / (contentWidth - viewWidth)
        for (let index = 0; index < itemsRef.current.length; index++) {
            if (index === num) continue;
            const element = itemsRef.current[index];
            if (element) {
                const elWidth = (scrollWidths.get(index) || 0) - viewWidth;
                const scrollOffset = percentScroll * elWidth;
                element.scrollTo({ x: scrollOffset })
            }

        }
    };
    const storeContentWidth = (w: number, num: number) => {
        scrollWidths.set(num, w);
        setScrollWidths(scrollWidths);
    }
    return (
        <View style={containerStyle}>
            {rowItems.map((items, rowI) =>
                <ScrollView
                    key={`scRow_${rowI}`}
                    ref={(el: ScrollView | null) => itemsRef.current[rowI] = el}
                    onContentSizeChange={(w: number) => storeContentWidth(w, rowI)}
                    onScrollBeginDrag={() => setContentPosition(rowI)}
                    onScrollAnimationEnd={() => setContentPosition(-1)}
                    onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => onScroll(e, rowI)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}>
                    {items}
                </ScrollView>)}
        </View>
    );
}