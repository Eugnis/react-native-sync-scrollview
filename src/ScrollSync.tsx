import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';

// Props for ScrollSync component
export interface ScrollSyncProps {
    /** Array of arrays with custom {@link JSX.Element} */
    rowItems: JSX.Element[][];
    /** Custom style for ScrollSync container */
    containerStyle?: StyleProp<ViewStyle>;
    /** Custom style for ScrollViews */
    scrollViewsStyle?: StyleProp<ViewStyle>;
    /** Choose Horizontal or Vertical type, default is Horizontal */
    type?: 'horizontal' | 'vertical';
}

/**
 * ScrollSync component
 * Code example:
 * ```jsx
 * // Create Array of Arrays with items (range function from lodash)
 * const rowItems: JSX.Element[][] = range(4).map(rowI => range(Math.random() * 20 + 10).map(index => (
 *   <View key={`row${rowI}-${index}`}><Text>Test</Text></View>
* )));
* // Styles for View container for ScrollViews
* const styles = StyleSheet.create({
*   scrollSync: { height: 150, margin: 10, padding: 2, borderRadius: 10, borderWidth: 1, borderColor: 'gray' },
* });
* ...
 * // use ScrollSync component in render
 * <ScrollSync rowItems={rowItems} containerStyle={styles.scrollSync} />
 * ```
 */
export function ScrollSync({ rowItems, containerStyle, scrollViewsStyle, type = 'horizontal' }: ScrollSyncProps) {
    const [contentPosition, setContentPosition] = React.useState(-1);
    const [scrollLengths, setScrollLengths] = React.useState<Map<number, number>>(new Map());
    const itemsRef = React.useRef<Array<ScrollView | null>>([]);
    /**
     * Change positions of other ScrollViews on each scroll
     * @param event Event of scroll
     * @param num Row number
     */
    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>, num: number) => {
        if (contentPosition !== num) {
            event.preventDefault();
            return;
        }
        const scrollableCoord = type === 'horizontal' ? event.nativeEvent.contentOffset.x : event.nativeEvent.contentOffset.y;
        const viewSize = type === 'horizontal' ? event.nativeEvent.layoutMeasurement.width : event.nativeEvent.layoutMeasurement.height;
        const contentSize = type === 'horizontal' ? event.nativeEvent.contentSize.width : event.nativeEvent.contentSize.height;
        const percentScroll = scrollableCoord / (contentSize - viewSize);
        for (let index = 0; index < itemsRef.current.length; index++) {
            if (index === num) continue;
            const element = itemsRef.current[index];
            if (element) {
                const elLength = (scrollLengths.get(index) || 0) - viewSize;
                const scrollOffset = percentScroll * elLength;
                element.scrollTo(type === 'horizontal' ? { x: scrollOffset } : { y: scrollOffset })
            }
        }
    };
    /**
     * Store content position
     * @param length Content position
     * @param num Number of Row
     */
    const storeContentLength = (length: number, num: number) => {
        scrollLengths.set(num, length);
        setScrollLengths(scrollLengths);
    }
    return (
        <View style={containerStyle}>
            {rowItems.map((items, rowI) =>
                <ScrollView
                    key={`scRow_${rowI}`}
                    ref={(el: ScrollView | null) => itemsRef.current[rowI] = el}
                    onContentSizeChange={(w: number, h: number) => storeContentLength(type === 'horizontal' ? w : h, rowI)}
                    onScrollBeginDrag={() => setContentPosition(rowI)}
                    onScrollAnimationEnd={() => setContentPosition(-1)}
                    onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => onScroll(e, rowI)}
                    horizontal={type === 'horizontal'}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={scrollViewsStyle}
                    scrollEventThrottle={16}>
                    {items}
                </ScrollView>)}
        </View>
    );
}