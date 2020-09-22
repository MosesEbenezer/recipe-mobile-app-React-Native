import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CategoryScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailsScreen';
import FavoritesScreen from '../screens/FavouritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
};

const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: CategoryScreen,
			navigationOptions: {
				headerTitle: 'Meal Categories',
				headerLeft: () => {
					<HeaderButtons HeaderButtonComponent={HeaderButton}>
						<Item title='Menu' iconName='ios-menu' onPress={() => {}} />
					</HeaderButtons>
				},
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
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const FavNavigator = createStackNavigator(
	{
		Favorites: FavoritesScreen,
		MealDetail: MealDetailScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
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
			tabBarColor: Colors.primaryColor,
		},
	},
	Favorites: {
		screen: FavNavigator,
		navigationOptions: {
			// tabBarLabel: 'Fav',
			tabBarIcon: (tabInfo) => {
				return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colors.accentColor,
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
				},
		  })
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					activeTintColor: Colors.accentColor,
					activeBackgroundColor: '#FAF0E6',
					// backgroundColor: '#f5f5f5'
				},
		  });

const FiltersNavigator = createStackNavigator({
	Filters: {
		screen: FiltersScreen,
		navigationOptions: {
			headerTitle: 'Filter Meals'
		}
	}
});

const MainNavigator = createDrawerNavigator({
	MealsFavs: MealsFavTabNavigator,
	Filters: FiltersNavigator,
});

export default createAppContainer(MainNavigator);
