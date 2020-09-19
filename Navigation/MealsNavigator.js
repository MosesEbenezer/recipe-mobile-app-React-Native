import { exp } from 'react-native/Libraries/Animated/src/Easing';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CategoryScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailsScreen';
import Colors from '../constants/Colors';

const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: CategoryScreen,
			navigationOptions: {
				headerTitle: 'Meal Categories',
			},
		},
		CategoryMeals: {
			screen: CategoryMealsScreen,
		},
		MealDetail: {
      screen: MealDetailScreen,
      navigationOptions: {
				headerTitle: 'Meal Detail',
			},
    }
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
			},
			headerTintColor:
				Platform.OS === 'android' ? 'white' : Colors.primaryColor,
		},
	}
);

export default createAppContainer(MealsNavigator);
