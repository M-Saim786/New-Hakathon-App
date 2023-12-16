
// import React, { Component, useEffect } from "react";
// import { View, Button } from "react-native";
// import { Text } from "react-native-paper";
// import RBSheet from "react-native-raw-bottom-sheet";

// export default function BottomModal({ show }) {
//   console.log(show)
//   useEffect(() => {

//     show &&
//       RBSheet.open()
//   }, [])

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Button title="OPEN BOTTOM SHEET" onPress={() => (
//         show &&
//         RBSheet.open())} />
//       <RBSheet
//         ref={ref => {
//           RBSheet = ref;
//         }}
//         height={300}
//         openDuration={250}
//         customStyles={{
//           container: {
//             justifyContent: "center",
//             alignItems: "center"
//           }
//         }}
//       >
//         <View>
//           <Text>
//             fjfsdkl
//           </Text>
//         </View>
//       </RBSheet>
//     </View>
//   );

// }

// ---------------- Uper wala Chl Rha hai -----------------------


// import React, { useRef } from "react";
// import { View, Button } from "react-native";
// import RBSheet from "react-native-raw-bottom-sheet";
// import Home from "../Components/Home";
// // import Home from "./Components/Home";

// export default function BoTomMolda() {
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
//         <Home />
//       </RBSheet>
//     </View>
//   );
// }


