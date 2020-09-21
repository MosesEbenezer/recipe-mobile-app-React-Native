import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoryScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailsScreen';
import FavoritesScreen from '../screens/FavouritesScreen';
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
			// navigationOptions: {
			// 	headerTitle: 'Meal Detail',
			// },
		},
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

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return (
					<Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarColor: Colors.primaryColor
		},
	},
	Favorites: {
		screen: FavoritesScreen,
		navigationOptions: {
			// tabBarLabel: 'Fav',
			tabBarIcon: (tabInfo) => {
				return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colors.accentColor
		},
	},
};

const MealsFavTabNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(tabScreenConfig, {
			activeTintColor: 'white',
			shifting: true,
			barStyle: {
				// backgroundColor: Colors.primaryColor
			}
		})
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					activeTintColor: Colors.accentColor,
					activeBackgroundColor: '#FAF0E6',
					// backgroundColor: '#f5f5f5'
				},
		  });

export default createAppContainer(MealsFavTabNavigator);
