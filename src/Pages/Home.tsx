import { useEffect, useState } from "react";
import { TRoadmap } from "../types";
import Card from "../components/Card";

const Home = () => {
    const [roadmaps, setRoadmaps] =  useState<TRoadmap[]>([]);

    useEffect(()=>{
        fetch('http://localhost:5000/api/roadmap')
        .then(res =>res.json())
        .then(data =>{
            setRoadmaps(data.data)
        })
    },[]);

      const handleUpvote = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to upvote.");
      return;
    }
    const res = await fetch(`http://localhost:5000/api/roadmap/upvote/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!res.ok) {
      throw new Error("Upvote failed");
    }
  };
    return (
         <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Roadmap Items</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmaps.map((item) => (
          <Card key={item._id} item={item} onUpvote={handleUpvote}/>
        ))}
      </div>
    </div>
    );
};

export default Home;