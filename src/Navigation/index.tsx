import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './Type/StackNavigation';

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    );
};

export default AppNavigator;
