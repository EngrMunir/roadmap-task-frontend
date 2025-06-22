import { useState } from "react";
import { GrLike } from "react-icons/gr";

type Props = {
  item: {
    _id: string;       
    title: string;
    description: string;
    category: string;
    status: string;
    upvotes: number;
  };
  onUpvote?: (id: string) => Promise<void>; 
};

const Card = ({ item, onUpvote }: Props) => {

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border">
      <h1 className="text-xl font-bold">{item.title}</h1>
      <p className="text-gray-600 mt-2">{item.description}</p>
      <div className="mt-2 text-sm text-gray-500 flex justify-between">
        <span>Category: {item.category}</span>
        <span>Status: {item.status}</span>
      </div>
      <button
        type="button"
        className="mt-2 text-blue-600 font-semibold flex items-center gap-1 hover:text-blue-800 disabled:opacity-50"
        aria-label="Upvote"
        onClick={()=>onUpvote?.(item._id)}
      >
        {item.upvotes} <GrLike />
      </button>
    </div>
  );
};

export default Card;
