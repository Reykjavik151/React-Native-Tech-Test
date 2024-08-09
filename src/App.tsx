import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ScrollView, View, FlatList, ListRenderItemInfo } from "react-native";

import type { User } from "./types/User";
import { RestaurantInfoRow, RestaurantInfoTitle } from "./components";

const App = () => {
  const [selectedInfos, setSelectedInfos] = useState([] as User[]);
  const [restaurantInfo, setRestaurantInfo] = useState([] as User[]);

  useEffect(() => {
    const getRestaurantInfo = async () => {
      try {
        const res = await fetch("https://reqres.in/api/users?page=2");
        const data = (await res.json()) as { data: User[]; page: number };
        setRestaurantInfo(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getRestaurantInfo();
  }, []);

  const onRestaurantInfoPress = useCallback(
    (tappedUser: User) => {
      const isAlreadySelected = selectedInfos.find(
        (selectedUser) => selectedUser.id === tappedUser.id
      );

      if (isAlreadySelected) {
        setSelectedInfos((prev) =>
          prev.filter((selectedUser) => selectedUser.id !== tappedUser.id)
        );
        return;
      }

      setSelectedInfos((prev) => [...prev, tappedUser]);
    },
    [selectedInfos, setSelectedInfos]
  );

  const renderRestaurantInfo = useCallback(
    ({ item }: ListRenderItemInfo<User>) => {
      return (
        <RestaurantInfoRow
          item={item}
          selectedItems={selectedInfos}
          onPress={onRestaurantInfoPress}
        />
      );
    },
    [onRestaurantInfoPress]
  );

  const ListFooter = useMemo(() => {
    return (
      <View>
        {selectedInfos.map((selectedUser) => (
          <RestaurantInfoTitle
            key={selectedUser.id}
            title={`${selectedUser.first_name} ${selectedUser.last_name},`}
          />
        ))}
      </View>
    );
  }, [selectedInfos]);

  return (
    <ScrollView>
      <FlatList
        data={restaurantInfo}
        renderItem={renderRestaurantInfo}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedInfos}
        ListFooterComponent={ListFooter}
      />
    </ScrollView>
  );
};

export default App;
