# React Native Sync ScrollView

[![npm version](https://badge.fury.io/js/react-native-sync-scrollview.svg)](https://badge.fury.io/js/react-native-sync-scrollview)
[![Platform](https://img.shields.io/badge/react--native-0.6x-blue.svg)](http://facebook.github.io/react-native/)

Component for React Native which allows to synchronize scroll of multiple ScrollViews which can have different length. When you scroll one of inner ScrollViews, then others will scroll on same percentage position so scroll speed will be different, depends on their size.

Small component built using Typescript and React Hooks, so need `react-native 0.59+`.

Examples in examples folder and on Expo https://expo.io/@eugnis/projects/react-native-sync-scrollview-example

![React Native Sync ScrollView Example](https://user-images.githubusercontent.com/2463830/109437264-97de2580-7a2c-11eb-9c75-8543597f6154.gif)

**Expo snack with preview here: https://snack.expo.io/@eugnis/react-native-sync-scrollview**

## Installation

```
npm i react-native-sync-scrollview --save
```

or

```
yarn add react-native-sync-scrollview
```

## Basic Usage

![React Native Sync ScrollView Example](https://user-images.githubusercontent.com/2463830/109427087-70ba3080-79f9-11eb-9799-d4d2fb6c9b50.png)

To create horizontal Synchronized ScrollViews with 3 rows and with 20 +- 10 custom components each.

```jsx
// Create Array of Arrays with items (range function from lodash)
const rowItems: JSX.Element[][] = range(3).map((rowI) =>
  range(Math.random() * 20 + 10).map((index) => (
    <View key={`row${rowI}-${index}`}>
      <Text>Test</Text>
    </View>
  ))
);
// Styles for View container for ScrollViews
const styles = StyleSheet.create({
  scrollSync: {
    height: 150,
    margin: 10,
    padding: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
});

// use ScrollSync component in render
<ScrollSync rowItems={rowItems} containerStyle={styles.scrollSync} />;
```

## Configuration

| Property         | Type                       | Default      | Description                                               |
| ---------------- | -------------------------- | ------------ | --------------------------------------------------------- |
| rowItems         | JSX.Element[][]            | -            | Array of arrays with your custom JSX.Element components   |
| containerStyle   | style object               | undefined    | Style for View container which holds inner ScrollViews    |
| scrollViewsStyle | style object               | undefined    | Style for inner ScrollViews                               |
| type             | `horizontal` or `vertical` | `horizontal` | Choose Horizontal or Vertical type, default is Horizontal |
