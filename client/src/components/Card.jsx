import React from "react";
import { useAuthContext } from "../context/AuthContext";
const Card = (props) => {
  const { user } = useAuthContext();
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={props.img}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {props.title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>
            {props.type}
          </p>
          {user && user.authorities?.includes("ROLE_ADMIN") && (
            <div className="card-actions justify-end"> 
            <a href={"/delete/"+ props.id} className="btn btn-outline btn-secondary">Delete</a> 
            <a href={"/update/"+ props.id} className="btn btn-outline btn-primary">Edit</a> 
            </div>
            )}
          {user && user.authorities?.includes("ROLE_MODERATOR") && (
            <div className="card-actions justify-end">
            <a href={"/update/"+ props.id} className="btn btn-outline btn-primary">Edit</a> 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;