// import React from "react";
// import { FaCartPlus } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addCardItem } from "../../../redux/slice/cartSlice.";

// export default function AllProduct(props) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   return (
//     <div
//     onClick={() => {
//       navigate(`/cloth/${props._id}`);
//     }}
//       className="group relative bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden cursor-pointer"
//       style={{ height: "300px", width:"250px" }}
//     >
//       <div
//         onClick={(e) => {
//           e.stopPropagation();
//           dispatch(addCardItem(props));
//         }}
//         className="absolute left-3 top-3 hidden h-8 w-8 items-center justify-center rounded-full border border-gray-200 transition-all group-hover:flex"
//       >
//         <FaCartPlus className="text-gray-600" />
//       </div>
//       <img
//         src={props.images[0]}
//         className="h-3/5 w-full object-cover"
//         alt={props.title}
//       />
//       <div className="bg-white p-3 text-center">
//         <p className="mb-1">
//           <Link to={`/products/${props._id}`} className="text-gray-800">
//             {props.title}
//           </Link>
//         </p>
//         <p className="text-gray-600">${props.price}</p>
//       </div>
//     </div>
//   );
// }
