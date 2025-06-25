import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home.screen';
import DashboardScreen from '../../screens/DashboardScreen';
import ModuleDetailScreen from '../../screens/ModuleDetailScreen';
import CRMDashboardScreen from '../../screens/CRM/CRMDashboardScreen';
import FinanceDashboardScreen from '../../screens/Finance/FinanceDashboardScreen';
import CRMFeatureScreen from '../../screens/FeaturesScreens/crm.screen';
import AccountingFeature from '../../screens/FeaturesScreens/AccountingFeature';
import LMSFeature from '../../screens/FeaturesScreens/LMSFeature';
import CalendarFeature from '../../screens/FeaturesScreens/CalendarFeature';
import EmailFeature from '../../screens/FeaturesScreens/EmailFeature';
import DashboardFeature from '../../screens/FeaturesScreens/DashboardFeature';
import ContactsFeature from '../../screens/FeaturesScreens/ContactsFeature';
import SocialFeature from '../../screens/FeaturesScreens/SocialFeature';
import SurveyFeature from '../../screens/FeaturesScreens/SurveyFeature';
// import other feature screens as needed
import Header from '../../components/common/Header';

const RootStack = createNativeStackNavigator();

export const MainNavigators = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="Dashboard" component={DashboardScreen} />
      <RootStack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
      <RootStack.Screen name="CRM" component={CRMDashboardScreen} />
      <RootStack.Screen name="Finance" component={FinanceDashboardScreen} />
      <RootStack.Screen name="CRMFeature" component={CRMFeatureScreen} />
      <RootStack.Screen name="AccountingFeature" component={AccountingFeature} />
      <RootStack.Screen name="LMSFeature" component={LMSFeature} />
      <RootStack.Screen name="CalendarFeature" component={CalendarFeature} />
      <RootStack.Screen name="EmailFeature" component={EmailFeature} />
      <RootStack.Screen name="DashboardFeature" component={DashboardFeature} />
      <RootStack.Screen name="ContactsFeature" component={ContactsFeature} />
      <RootStack.Screen name="SocialFeature" component={SocialFeature} />
      <RootStack.Screen name="SurveyFeature" component={SurveyFeature} />
      {/* Add other feature screens here as needed */}
    </RootStack.Navigator>
  );
};