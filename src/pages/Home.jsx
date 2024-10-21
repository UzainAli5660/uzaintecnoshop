import { Link } from "react-router-dom";
import React from "react";
import { Image } from "antd";
import '../App.css';
import { Testimonials } from "../Components/Testimonials";

function Home() {
  const products = [
    {
      id: 1,
      title: "Mobile Phones",
      image: "/mobile.jpg",
      alt: "Mobile Phones",
      category: "Smartphones",
    },
    {
      id: 2,
      title: "Laptops",
      image: "/laptop.jpg",
      alt: "Laptops",
      category: "Laptops",
    },
    {
      id: 3,
      title: "Tablets",
      image: "/tablet.jpg",
      alt: "Tablets",
      category: "Tablets",
    },
    {
      id: 4,
      title: "Mobile Accessories",
      image: "/acces.jpg",
      alt: "Mobile Accessories",
      category: "Mobile-accessories",
    },
    {
      id: 5,
      title: "Men's Watches",
      image: "/watches.jpg",
      alt: "Men's Watches",
      category: "Mens-watches",
    },
    {
      id: 6,
      title: "Women's Watches",
      image: "/womens.jpg",
      alt: "Women's Watches",
      category: "Womens-watches",
    },
  ];

  return (
    <div className="container mx-auto">
            <div className="bg-black w-full flex flex-col md:flex-row justify-center items-center p-5">
        <div className="text-center md:text-left md:w-1/2 p-4">
          <h1 className="text-teal-500 text-3xl md:text-4xl font-bold font-serif">Techno Shop</h1>
          <h3 className="text-teal-100 mt-3 text-sm md:text-md font-serif">
            A modern eCommerce platform offering a seamless shopping experience. Browse products, manage your cart, and enjoy fast checkouts with a sleek, user-friendly interface on any device!
          </h3>
          <Link to="/Products">
            <button className="font-semibold font-serif p-2 mt-4 text-teal-400 border-2 border-teal-500 bg-black hover:bg-teal-500 hover:text-black transition duration-300">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="mt-4 md:mt-0 md:w-1/2 flex justify-center p-4 overflow-hidden">
          <Image
            height={250}
            width={500}
            preview={false}
            src="/image.png"
            alt="Techno Shop Banner"
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 my-10">
        <h1 className="text-2xl md:text-3xl underline font-serif font-bold text-center text-black">
          All Products you want are here
        </h1>
        <div className="container flex flex-row gap-2 justify-start mt-2">
          <h3 className="font-serif font-semibold text-2xl md:text-3xl ml-4 text-teal-800">Shop By Collection</h3>
        </div>
      </div>


      {/* Card Row with Scroll */}
      <div className="overflow-x-auto p-4">
        <div className="flex space-x-4">
          {products.map((product) => (
            <div key={product.id} className="card border border-black hover:shadow-lg transition-shadow duration-300 min-w-[200px] sm:min-w-[250px]">
              <Link to={`/Products?category=${product.category}`}>
                <Image 
                  src={product.image}
                  width={400} 
                  preview={false}
                  height={200} 
                  alt={product.alt}
                  className="dark-image object-cover w-full h-auto"
                />
              </Link> 
              <div className="card-content p-2">
                <h2 className="card-title text-center font-serif text-base md:text-lg">{product.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    <Testimonials/>
    </div>
  );
}

export default Home;
