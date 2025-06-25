import React from 'react'
import { StyleSheet, View , Text } from 'react-native'

const Header = () => {
  return (
    <View style={styles.header}>
            <Text style={styles.brandName}>OpyraSaaS</Text>
            <View style={styles.menuIcon}>
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
            </View>
          </View>
  )
}

const styles= StyleSheet.create({
     header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
  },
  brandName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  menuIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 1,
  },
})

export default Header