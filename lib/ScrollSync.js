import * as React from 'react';
import { ScrollView, View } from 'react-native';
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
export function ScrollSync(_a) {
    var rowItems = _a.rowItems, containerStyle = _a.containerStyle, _b = _a.type, type = _b === void 0 ? 'horizontal' : _b;
    var _c = React.useState(-1), contentPosition = _c[0], setContentPosition = _c[1];
    var _d = React.useState(new Map()), scrollLengths = _d[0], setScrollLengths = _d[1];
    var itemsRef = React.useRef([]);
    /**
     * Change positions of other ScrollViews on each scroll
     * @param event Event of scroll
     * @param num Row number
     */
    var onScroll = function (event, num) {
        if (contentPosition !== num) {
            event.preventDefault();
            return;
        }
        var scrollableCoord = type === 'horizontal' ? event.nativeEvent.contentOffset.x : event.nativeEvent.contentOffset.y;
        var viewSize = type === 'horizontal' ? event.nativeEvent.layoutMeasurement.width : event.nativeEvent.layoutMeasurement.height;
        var contentSize = type === 'horizontal' ? event.nativeEvent.contentSize.width : event.nativeEvent.layoutMeasurement.height;
        var percentScroll = scrollableCoord / (contentSize - viewSize);
        for (var index = 0; index < itemsRef.current.length; index++) {
            if (index === num)
                continue;
            var element = itemsRef.current[index];
            if (element) {
                var elWidth = (scrollLengths.get(index) || 0) - viewSize;
                var scrollOffset = percentScroll * elWidth;
                element.scrollTo({ x: scrollOffset });
            }
        }
    };
    /**
     *
     * @param length
     * @param num
     */
    var storeContentLength = function (length, num) {
        scrollLengths.set(num, length);
        setScrollLengths(scrollLengths);
    };
    return (React.createElement(View, { style: containerStyle }, rowItems.map(function (items, rowI) {
        return React.createElement(ScrollView, { key: "scRow_" + rowI, ref: function (el) { return itemsRef.current[rowI] = el; }, onContentSizeChange: function (w, h) { return storeContentLength(type === 'horizontal' ? w : h, rowI); }, onScrollBeginDrag: function () { return setContentPosition(rowI); }, onScrollAnimationEnd: function () { return setContentPosition(-1); }, onScroll: function (e) { return onScroll(e, rowI); }, horizontal: type === 'horizontal', showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false, scrollEventThrottle: 16 }, items);
    })));
}
//# sourceMappingURL=ScrollSync.js.map