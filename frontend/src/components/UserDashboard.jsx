import Nav from "./Nav";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const { currentCity } = useSelector((state) => state.user);
  const cateScrollRef = useRef();
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

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
      cateScrollRef.current.addEventListener("scroll", () => {
        updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
      });
    }
    return()=>cateScrollRef.current.removeEventListener("scroll",()=>{
        updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
      })
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 bg-[#fff9f6] items-center overflow-y-auto">
      <Nav />
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Insiration for your first order
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
              <CategoryCard data={cat} key={index} />
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
      </div>
    </div>
  );
};

export default UserDashboard;
