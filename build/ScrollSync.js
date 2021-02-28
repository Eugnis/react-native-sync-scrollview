import * as React from 'react';
import { ScrollView, View } from 'react-native';
export default function ScrollSync(_a) {
    var rowItems = _a.rowItems, containerStyle = _a.containerStyle;
    var _b = React.useState(-1), contentPosition = _b[0], setContentPosition = _b[1];
    var _c = React.useState(new Map()), scrollWidths = _c[0], setScrollWidths = _c[1];
    var itemsRef = React.useRef([]);
    var onScroll = function (event, num) {
        if (contentPosition !== num) {
            event.preventDefault();
            return;
        }
        var scrollableCoord = event.nativeEvent.contentOffset.x;
        var viewWidth = event.nativeEvent.layoutMeasurement.width;
        var contentWidth = event.nativeEvent.contentSize.width;
        var percentScroll = scrollableCoord / (contentWidth - viewWidth);
        for (var index = 0; index < itemsRef.current.length; index++) {
            if (index === num)
                continue;
            var element = itemsRef.current[index];
            if (element) {
                var elWidth = (scrollWidths.get(index) || 0) - viewWidth;
                var scrollOffset = percentScroll * elWidth;
                element.scrollTo({ x: scrollOffset });
            }
        }
    };
    var storeContentWidth = function (w, num) {
        scrollWidths.set(num, w);
        setScrollWidths(scrollWidths);
    };
    return (React.createElement(View, { style: containerStyle }, rowItems.map(function (items, rowI) {
        return React.createElement(ScrollView, { key: "scRow_" + rowI, ref: function (el) { return itemsRef.current[rowI] = el; }, onContentSizeChange: function (w) { return storeContentWidth(w, rowI); }, onScrollBeginDrag: function () { return setContentPosition(rowI); }, onScrollAnimationEnd: function () { return setContentPosition(-1); }, onScroll: function (e) { return onScroll(e, rowI); }, horizontal: true, showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false, scrollEventThrottle: 16 }, items);
    })));
}
//# sourceMappingURL=ScrollSync.js.map