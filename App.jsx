import React from 'react'
import AppNavigator from './Config/AppNavigator'

function App() {
  return (<AppNavigator />)
} 
export default App




// import React, { useRef } from "react";
// import { View, Button } from "react-native";
// import RBSheet from "react-native-raw-bottom-sheet";
// // import BottomModal from "./Config/BottomModal";
// import { Text } from "react-native-paper";

// export default function App() {
//   const refRBSheet = useRef();
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#000"
//       }}
//     >
//       <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
//       <RBSheet
//         ref={refRBSheet}
//         closeOnDragDown={true}
//         closeOnPressMask={false}
//         customStyles={{
//           wrapper: {
//             backgroundColor: "transparent"
//           },
//           draggableIcon: {
//             backgroundColor: "#000"
//           }
//         }}
//       >
//         <View>
//           <Text>
//             fjdfskld
//           </Text>
//         </View>
//       </RBSheet>
//     </View>
//   );
// }

// import Sheet, { SheetRef } from 'react-modal-sheet';
// import { useState, useRef } from 'react';

// export default function App() {
//   const [isOpen, setOpen] = useState(false);
//   const ref = useRef(<SheetRef />);

//   return (
//     <>
//       <button onClick={() => setOpen(true)}>Open sheet</button>

//       <Sheet
//         isOpen={isOpen}
//         onClose={() => setOpen(false)}
//         snapPoints={[600, 400, 100, 0]}
//         initialSnap={1}
//       >
//         <Sheet.Container>
//           {/**
//            * Since `Sheet.Content` is a `motion.div` it can receive motion values
//            * in it's style prop which allows us to utilise the exposed `y` value.
//            *
//            * By syncing the padding bottom with the `y` motion value we introduce
//            * an offset that ensures that the sheet content can be scrolled all the
//            * way to the bottom in every snap point.
//            */}
//           <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
//             <Sheet.Scroller draggableAt="both">
//               {/* Some content here that makes the sheet content scrollable */}
//             </Sheet.Scroller>
//           </Sheet.Content>
//         </Sheet.Container>
//       </Sheet>
//     </>
//   );
// }



// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Modal,
//   StyleSheet,
// } from 'react-native';


// export default function App() {
//   const [mediamodal, setmediamodal] = React.useState(false)
//   return (
//     <>
//       <View style={{ flex: 1, backgroundColor: 'black' }}>
//         <StatusBar
//           hidden={false}
//           translucent={false}
//           barStyle="light-content"
//           networkActivityIndicatorVisible={true}
//           backgroundColor={'black'}
//         />
//         <SafeAreaView style={{ backgroundColor: 'black' }} >
//           <TouchableOpacity
//             onPress={() => {
//               this.setState({ mediamodal: true });
//             }}
//             style={{
//               width: '10%'
//             }}>
//                 // i am using image for showing 3 - dots that is stored in my local folder, you can use vector icon or image
//             <Image
//               style={{
//                 width: 100,
//                 height: 100,
//                 resizeMode: 'contain',
//                 alignSelf: 'center',
//               }}
//               source={localimag.dots}></Image>
//           </TouchableOpacity >
//         </SafeAreaView >

//       </View >
//     </>
//   )
// }