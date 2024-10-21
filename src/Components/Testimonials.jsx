import React from 'react'

export const Testimonials = () => {
  return (
<section className="text-white font-serif body-font bg-teal-700 mt-4">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap justify-center -m-4">
      <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
        <div className="h-full text-center">
          <img
            alt="testimonial"
            className="w-40 h-40 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
            src="/uzain.jpg"
          />
          <p className="leading-relaxed">
            Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki
            taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman
            taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid
            fanny pack vaporware.
          </p>
          <span className="inline-block h-1 w-10 rounded bg-teal-300 mt-6 mb-4" />
          <h2 className="text-black font-Bold text-xl title-font tracking-wider ">
          Uzain Ali
          </h2>
          <p className="text-black
          ">Senior Product Designer</p>
        </div>
      </div>
     
    </div>
  </div>
</section> 
  )
}


