import React from "react"; 
import { Link } from "react-router-dom";

const ProductCards = ({ item }) => {
  return (
    <Link
      className="lg:w-1/4 md:w-1/2 w-full p-4"
      to={`/Product/${item.id}`}
    >
      <div className="shadow-lg rounded-lg overflow-hidden border-2 bg-black border-black hover:shadow-lg transition-shadow duration-300">
        <a className="block relative h-40 sm:h-48 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full bg-white"
            src={item.thumbnail}
          />
        </a>
        <div className="p-4">
          <h3 className="text-xs tracking-widest uppercase mb-1 font-serif text-teal-400">
            {item.category}
          </h3>
          <h2 className="text-lg font-medium truncate font-serif text-white">
            {item.title}
          </h2>
          <p className="mt-1 font-sans font-bold  text-teal-400">
            ${item.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCards;
