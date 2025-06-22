import { useEffect, useState } from "react";
import { TRoadmap } from "../types";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [roadmaps, setRoadmaps] =  useState<TRoadmap[]>([]);
    const navigate = useNavigate();

      const fetchRoadmaps = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/roadmap");
      const data = await res.json();
      setRoadmaps(data.data);
    } catch (err) {
      console.error("Failed to fetch roadmaps", err);
    }
  };

    useEffect(()=>{
        fetchRoadmaps();
    },[]);

    const handleUpvote = async (id: string) => {
    
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to upvote.");
      navigate('/login')
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
    console.log(res)
   fetchRoadmaps();
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