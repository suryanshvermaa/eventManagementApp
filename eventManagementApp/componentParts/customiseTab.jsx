import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

export default function MyTabBar({ state, descriptors, navigation }) {

  const icons={
    index:(props)=><AntDesign name="home" size={26} color="gray" {...props}/>,
    createevent:(props)=><AntDesign name="pluscircleo" size={26} color="gray" {...props}/>,
    myevents:(props)=><SimpleLineIcons name="event" size={24} color="gray" {...props}/>
  }
  return (
    
    

    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
          key={route.name }

            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {
              icons[route.name]({
                color: isFocused ? '#0033ff' : 'gray' 
              })
            }
            <Text style={{ color: isFocused ? '#0033ff' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles=StyleSheet.create({
  tabBar:{
    width:'95%',
     position:'absolute',
     bottom:5,
     borderWidth:1,
     borderColor:'gray',
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:"center",
     backgroundColor:"white",
     paddingVertical:10,
     marginHorizontal:10,
     borderRadius:20,
     borderCurve:"continuous",
     shadowColor:"black",
     shadowOffset:{width:0,height:10},
     shadowRadius:10,
     shadowOpacity:0.6
  },
  tabBarItem:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",

  }
})