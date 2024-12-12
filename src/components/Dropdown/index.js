// import { useState, useEffect } from "react";
// import * as React from "react";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

// import { getProducts, getCategory } from "../../utility/api";

// export default function Dropdown() {
//   const [categories, setCategories] = useState([]);
//   const [category, setCategory] = useState("");
//   const [list, setList] = useState([]);

//   // first load
//   useEffect(() => {
//     getCategory().then((data) => {
//       setCategories(data);
//     });
//   }, []);

//   // if data, set it in the menu list
//   useEffect(() => {
//     getProducts(category).then((listData) => {
//       setList(listData);
//       console.log(listData);
//     });
//   }, [category]);

//   const handleChange = (event) => {
//     setCategory(event.target.value);
//   };

  
//   list.forEach((item) => {
//     // check if item.genre already in the genres or not
//     if (!categories.includes(item.category)) {
//       categories.push(item.category);
//     }
//   });

// //   console.log(categories);
//   /////////////////////////////////////////////////////
//   return (
//     <div>
//       <FormControl variant="filled" style={{ minWidth: 220 }}>
//         <InputLabel id="demo-simple-select-filled-label">
//           All Categories
//         </InputLabel>
//         <Select
//           labelId="demo-simple-select-filled-label"
//           id="demo-simple-select-filled"
//           value={category}
//           onChange={handleChange}
//         >
//           <MenuItem value="">
//             <em>All</em>
//           </MenuItem>
//           {categories.map((item) => (
//             <MenuItem value={item}>{item}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }
