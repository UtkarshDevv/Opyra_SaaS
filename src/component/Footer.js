import React from "react";
import { StyleSheet , View , Text , TouchableOpacity} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const Footer = () => {
  const handleSocialPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <Text style={styles.footerBrand}>OpyraSAAS</Text>

        <View style={styles.socialIcons}>
           <TouchableOpacity
    style={styles.socialIcon}
    onPress={() => handleSocialPress("https://twitter.com")}
  >
    <Ionicons name="logo-twitter" size={24} color="#fff" />
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.socialIcon}
    onPress={() => handleSocialPress("https://instagram.com")}
  >
    <Ionicons name="logo-instagram" size={24} color="#fff" />
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.socialIcon}
    onPress={() => handleSocialPress("https://linkedin.com")}
  >
    <Ionicons name="logo-linkedin" size={24} color="#fff" />
  </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footerDivider} />

      <View style={styles.footerBottom}>
        <Text style={styles.copyright}>© 2025 OpyraSAAS</Text>

        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Privacy</Text>
          </TouchableOpacity>
          <Text style={styles.footerSeparator}>•</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Terms</Text>
          </TouchableOpacity>
          <Text style={styles.footerSeparator}>•</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    footer: {
    backgroundColor: '#000000',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 40,
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  footerBrand: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  socialIcon: {
    backgroundColor: '#FF0000',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIconText: {
    fontSize: 18,
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 20,
  },
  footerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyright: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerLink: {
    fontSize: 14,
    color: '#FF0000',
    fontWeight: '500',
  },
  footerSeparator: {
    fontSize: 14,
    color: '#FFFFFF',
  },
})

export default Footer;
