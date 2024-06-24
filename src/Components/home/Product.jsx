import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


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
