import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import { IconButton, Colors } from 'react-native-paper';

export default function CustomCard({ logo, logoColor = Colors.blue600, title = '', description = '', onPress, arrow = false, pressed, lastIcon = true }) {
  const getIcon = function() {
    if (arrow) {
      return pressed ? 'arrow-down-circle' : 'arrow-right-circle'
    }
    return 'plus-circle'
  }
  return (
    <Pressable onPress={onPress}>
      <View style={styles.mainCardView}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!logo ?
            <IconButton
              icon={'account-circle'}
              size={50}
              color={logoColor}
              style={{
                borderRadius: 25,
                height: 50,
                width: 50,
              }}
            />
            :
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
            color={arrow ? Colors.grey500 : Colors.green500}
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
