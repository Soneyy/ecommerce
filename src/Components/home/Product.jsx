import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCardItem } from "../../redux/slice/cartSlice."; // Fix import path

export default function AllProduct(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/products/${props._id}`);
      }}
      className="group relative bg-primary-light shadow-[0px_0px_25px_0px_rgba(0,0,0,0.1)] hover:cursor-pointer"
      style={{ height: "400px" }} // Adjust the height as needed
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          dispatch(addCardItem(props));
        }}
        className="absolute left-[11px] top-[11px] hidden h-[30px] w-[30px] items-center justify-center rounded-full border border-primary transition-all group-hover:flex"
      >
        <FaCartPlus className="text-primary" />
      </div>
      <img
        src={props.image}
        className="mx-auto my-0 h-full w-full object-cover"
        alt={props.name}
        style={{ marginTop: 0 }} // Adjust margin top to 0
      />
      <div className="bg-white p-3 text-center transition-all group-hover:bg-primary group-hover:text-white">
        <p className="mb-1">
          <Link to={`/products/${props._id}`} className="text-black">
            {props.name}
          </Link>
        </p>
        <p className="text-black">{props.creationAt}</p>
      </div>
    </div>
  );
}
