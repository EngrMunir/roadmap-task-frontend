export type TRoadmap = {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: "Planned" | "In Progress" | "Completed";
  upvotes: number;
  upvotedBy: string[]; // User IDs
  createdAt: string;
  updatedAt: string;
};

export type TUser = {     
  name: string;
  email: string;
  role: "user" | "admin";
};
