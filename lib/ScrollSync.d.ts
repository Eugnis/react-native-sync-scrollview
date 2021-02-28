/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
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
export declare function ScrollSync({ rowItems, containerStyle, scrollViewsStyle, type }: ScrollSyncProps): JSX.Element;
