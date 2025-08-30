import AntDesign from '@expo/vector-icons/AntDesign';

import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
export default function TabsLayout() {
  return (
  <Tabs screenOptions={{tabBarActiveTintColor: "coral"}}> 

    <Tabs.Screen name="index" options={{title: "Home", 
    tabBarIcon:
     ({ color, focused })=>  
      {
        return focused ? (
                  
        <Entypo name="home" size={24} color={color} /> //this is color of our tabBar icon
                ) :(
                  <AntDesign name="home" size={24} color="black" />
                );
          }   ,
       

    }} 
    />
    <Tabs.Screen name="login" options={{title: "Login"}} />
  </Tabs>
    

  
  );
}
 