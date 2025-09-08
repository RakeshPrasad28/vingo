import Nav from "./Nav";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";

const UserDashboard = () => {
  const { currentCity,shopsInMyCity,itemsInMyCity } = useSelector((state) => state.user);
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth
      );
    }
  };
  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    if (cateScrollRef.current) {
      updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
      cateScrollRef.current.addEventListener("scroll", () => {
        updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
      });
      shopScrollRef.current.addEventListener("scroll", () => {
        updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
      });
      
    }
    return()=>{
      cateScrollRef.current.removeEventListener("scroll",()=>{
        updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
      })
      shopScrollRef.current.removeEventListener("scroll",()=>{
        updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
      })
    }
  }, [categories]);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 bg-[#fff9f6] items-center overflow-y-auto">
      <Nav />

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Inspiration for your first order
        </h1>
        <div className="w-full relative">
          {showLeftButton && (
            <button
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaCircleChevronLeft />
            </button>
          )}
          <div
            className="w-full flex overflow-x-auto gap-4 pb-2"
            ref={cateScrollRef}
          >
            {categories.map((cat, index) => (
              <CategoryCard name={cat.category} image={cat.image} key={index} />
            ))}
          </div>
          {showRightButton && (
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaCircleChevronRight />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">Best Shop in {currentCity}</h1>
        <div className="w-full relative">
          {showLeftShopButton && (
            <button
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(shopScrollRef, "left")}
            >
              <FaCircleChevronLeft />
            </button>
          )}
          <div
            className="w-full flex overflow-x-auto gap-4 pb-2"
            ref={shopScrollRef}
          >
            {shopsInMyCity?.map((shop, index) => (
              <CategoryCard name={shop.name} image={shop.image} key={index} />
            ))}
          </div>
          {showRightShopButton && (
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(shopScrollRef, "right")}
            >
              <FaCircleChevronRight />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
          <h1 className="text-gray-800 text-2xl sm:text-3xl">
            Suggested Food Items
          </h1>
          <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center">
            {itemsInMyCity?.map((item,index)=>(
              <FoodCard key={index} data={item}/>
            ))}
          </div>
      </div>
    </div>
  );
};

export default UserDashboard;
