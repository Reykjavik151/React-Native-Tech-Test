import React from "react";
import { Pressable, View, Image, Text } from "react-native";

import type { User } from "../../types/User";

type RestaurantInfoRowProps = {
  onPress: (item: User) => void;
  item: User;
  selectedItems: User[];
};

export const RestaurantInfoRow = React.memo(
  ({ onPress, item, selectedItems }: RestaurantInfoRowProps) => {
    const { first_name, last_name, email, avatar } = item;

    console.log("item", item.id);

    const isSelected = selectedItems.find(
      (selectedUser) => selectedUser.id === item.id
    );

    return (
      <Pressable onPress={() => onPress(item)}>
        <View
          style={[
            {
              flex: 1,
              padding: 8,
              borderColor: "black",
              borderWidth: 2,
              borderRadius: 4,
              marginVertical: 4,
              marginHorizontal: 8,
              alignItems: "center",
              flexDirection: "row",
            },
            isSelected
              ? {
                  backgroundColor: "lightskyblue",
                }
              : null,
          ]}
        >
          <Image
            source={{ uri: avatar }}
            style={{ width: 50, height: 50 }}
            resizeMode="center"
          />

          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={{ fontSize: 16, marginBottom: 1 }}>
              {first_name} {last_name}
            </Text>
            <Text style={{ color: "#616161" }}>{email}</Text>
          </View>
        </View>
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    const isPrevSelected = prevProps.selectedItems.find(
      (selectedUser) => selectedUser.id === prevProps.item.id
    );

    const isNextSelected = nextProps.selectedItems.find(
      (selectedUser) => selectedUser.id === nextProps.item.id
    );

    return isPrevSelected === isNextSelected;
  }
);
