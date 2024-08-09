import React from "react";
import { TextProps, Text } from "react-native";

type RestaurantInfoTitleProps = {
  title: string;
} & Omit<TextProps, "children">;

export const RestaurantInfoTitle = React.memo(
  ({ title, ...rest }: RestaurantInfoTitleProps) => {
    console.log("text", title);

    return <Text {...rest}>{title}</Text>;
  },
  (prevProps, nextProps) => prevProps.title === nextProps.title
);
