import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import { IconButton  } from 'react-native-paper';

export default function CustomCard({ logo ="", title = '', description = '', onPress, arrow = false, pressed, lastIcon = true, icon="plus-circle", iconPressed="minus-circle", iconColor = "#00ff18", iconPressedColor = "#Adadad" }) {
  const getIcon = function() {
    if (arrow) {
      return pressed ? 'arrow-down-circle' : 'arrow-right-circle'
    }
    if (pressed) {
      return iconPressed
    }
    return icon
  }
  const getColor = function() {
    if (arrow) {
      return "#Adadad"
    }
    if (pressed) {
      return iconPressedColor
    }
    return iconColor
  }
  return (
    <Pressable onPress={onPress}>
      <View style={styles.mainCardView}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          { logo &&
            <View style={styles.subCardView}>
              <Image
                source={logo}
                resizeMode="contain"
                style={{
                  borderRadius: 25,
                  height: 50,
                  width: 50,
                }}
              />
            </View>
          }
          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 14,
                color: "black",
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {title}
            </Text>
            <View
              style={{
                marginTop: 4,
                borderWidth: 0,
                width: '85%',
              }}>
              <Text
                style={{
                  color: "gray",
                  fontSize: 12,
                }}>
                {description}
              </Text>
            </View>
          </View>
        </View>
        {lastIcon &&
          <IconButton
            icon={getIcon()}
            color={getColor()}
            size={25}
            onPress={onPress}
          />
        }
      </View>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainCardView: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
