import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/core';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainScreen({navigation}) {
  navigation.setOptions({
    headerRight:()=>(
      <Button title="Refresh" onPress={()=> navigation.replace('Home')}/>
    )
  })
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"#ff0"}}>
      <Text style={{fontSize:35, color:"#f00"}}>Main Screen</Text>
      <Button title="Notifications" onPress={()=> navigation.navigate('Notify')}/>
      <Button title="Add-Ons" onPress={()=> navigation.navigate('Addons')}/>
    </View>
  );
}

function Notify({navigation}) {
  const isFocused=useIsFocused()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor:"#ff0"}}>
      <Text style={{fontSize:25, color:isFocused? 'red':'green'}}>Notifications</Text>
      <Text style={{fontSize:20}}>No new notifications</Text>
      <Button title="Back to Main Menu" onPress={()=> navigation.navigate('Home')}/>
    </View>
  );
}

function Addons({navigation}) {
  navigation.setOptions({
    headerRight:()=>(
      <Button title="Login" onPress={()=> navigation.replace('Notify')}/>
    )
  })
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor:"#ff0"}}>
      <Text style={{fontSize:25, color:"#f00"}}>Log in to see available Add-Ons</Text>
      <Button title="Main Screen" onPress={()=> navigation.navigate('Home')}/>
    </View>
  );
}

function navigator() {
  return (
    <Tab.Navigator screenOptions={({route})=>({
      tabBarIcon:({color,size})=>{
        let iconName
        if(route.name=='Home')
        {
          iconName='home'
        }
        else if(route.name=='Notify')
        {
          iconName='notifications'
        }
        else if(route.name=='Addons')
        {
          iconName='add'
        }
        return <Ionicons name={iconName} size={size} color={color} />
      }})}
      tabBarOptions={{
        activeBackgroundColor: 'cyan'
      }}
      >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Notify" component={Notify} />
      <Tab.Screen name="Addons" component={Addons} />
    </Tab.Navigator>
  );
}

function getHeaderTitle(route){
  const routeName = route.state? route.state.routes[route.state.index].name : 'Home'
  switch(routeName){
    case 'Home':
    return 'Overview';
    case 'Notify':
    return 'Hello';
    case 'Addons':
    return 'Add';
  }
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notify" screenOptions={{gestureEnabled: true ,gestureDirection:"horizontal"}} headerMode="float">
        <Stack.Screen options={({route})=>({title:getHeaderTitle(route)})} name="Home" component={navigator} />
        <Stack.Screen options={{ headerRight:()=>(<Button title="Press" onPress={()=>alert("Don't touch that!!")}/>)}} name="Notify" component={Notify} />
        <Stack.Screen options={{title:'Add'}} name="Addons" component={Addons} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;     