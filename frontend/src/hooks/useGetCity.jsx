import { useEffect } from "react";
import { serverURL } from "../App";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
  setUserData,
} from "../redux/userSlice";

function useGetCity() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const api_key = import.meta.env.VITE_GEOAPIKEY;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      //   console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${api_key}`
      );
      // console.log(res.data);
      dispatch(setCurrentCity(res?.data?.results[0].city));
      dispatch(setCurrentState(res?.data?.results[0].state));
      dispatch(
        setCurrentAddress(
          res?.data?.results[0].address_line1 ||
            res?.data?.results[0].address_line2
        )
      );
    });
  }, [userData]);
}

export default useGetCity;
