type Props = {
  item: {
    title: string;
    description: string;
    category: string;
    status: string;
    upvotes: number;
  };
};

const Card = ({ item }: Props) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border">
      <h1 className="text-xl font-bold">{item.title}</h1>
      <p className="text-gray-600 mt-2">{item.description}</p>
      <div className="mt-2 text-sm text-gray-500">
        <span className="mr-3">Category: {item.category}</span>
        <span>Status: {item.status}</span>
      </div>
      <div className="mt-2 text-blue-600 font-semibold"> {item.upvotes}</div>
    </div>
  );
};

export default Card;
