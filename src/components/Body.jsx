import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import ShimmerBody from "./ShimmerBody";
import { BiSearchAlt } from "react-icons/bi"
import { calculateCost } from "../utils/helper";
import useApiRes from "../utils/useApiRes";


const Body = () => {
    const [web,setWeb] = useState(true);
    const [noOfItems, setNoOfItems] = useState(4);
    const [searchText, setSearchText] = useState("");
    const [listOfRestaurants, setListOfRestaurants] = useState(null);
    const [carousel, setCarousel] = useState(null);
    const [filterListOfRestaurants, setFilterListOfRestaurants] = useState(null);

    const resData = useApiRes();
    console.log(resData);
    const showData = web ? resData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants : resData?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    // console.log("*******show data*********");
    // console.log(showData);
    // console.log("*******carousel*********");
    // console.log(carousel);
    // console.log("*******list of Rest*********");
    // console.log(listOfRestaurants);
   

    // const getData = async () => {
    //     try {
    //         const ress = await fetch(import.meta.env.VITE_MAIN_API);
    //         const pinky = await ress.json();
    //         console.log("data RAw : ",pinky);
    //         console.log("restaurants : ",pinky?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    //         web?setListOfRestaurants(pinky?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants):setListOfRestaurants(
    //             pinky?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    //         );
    //         setCarousel(pinky?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    //         web?setFilterListOfRestaurants(pinky?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants):setFilterListOfRestaurants(
    //             pinky?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    //         );

    //         console.log("Restaurants : -",listOfRestaurants);
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }

    function filterData(searchText, listOfRestaurants) {
        const filterData = listOfRestaurants?.filter((re) => re?.info?.name?.toUpperCase()?.includes(searchText?.toUpperCase()));
        return filterData;
    }


    useEffect(() => {
        let deviceWidth = window.innerWidth;
        if (deviceWidth < 660) {
            console.log("Hello");
            setWeb(false);
        }
        console.log("web : ",web);
        console.log("width : ",deviceWidth);
        if (deviceWidth < 660 && deviceWidth > 300) {
            setNoOfItems(2);
        }
        setListOfRestaurants(showData);
        setFilterListOfRestaurants(showData);
        setCarousel(resData?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    }, [showData,carousel,listOfRestaurants])
    // useEffect(() => {
    //     let deviceWidth = window.innerWidth;
    //     if (deviceWidth < 660 && deviceWidth > 300) {
    //         setNoOfItems(2);
    //     }
    //     // getData();
    // }, [])
   



    return (
        listOfRestaurants ? (

            <div className="parent w-full lg:mb-5">
                {carousel &&
                    <div className="carousel  w-full flex justify-center bg-black p-[22px] ">
                        <div className="swiper w-[82%] m-4 p-5 bg-black max-[860px]:w-full max-[860px]:m-0  ">

                            <Swiper
                                slidesPerView={noOfItems}
                                spaceBetween={55}
                                slidesPerGroup={1}
                                loop={false}

                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                className="mySwiper"
                            >


                                {
                                    carousel &&
                                    carousel?.map((cc) => {
                                        return (
                                            <SwiperSlide key={cc?.id} className="py-10">
                                                <div className="">
                                                    <img src={import.meta.env.VITE_BANNER_IMG + cc.imageId} alt="" className="hover:scale-110 transition-all duration-[0.6s] ease-in-out z-[99999]" />
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })

                                }
                            </Swiper>

                        </div>
                    </div>
                }
                <div className="body w-full flex flex-col justify-center items-center gap-8">
                    <div className="filters w-[80%] flex justify-center items-center mt-4 gap-20 pr-5 p-2 max-[760px]:flex-col max-[760px]:w-full max-[760px]:gap-4 max-[760px]:pr-2 ">
                        <div className="Search w-[30%]  flex justify-center  sm:hover:bg-black/10 ">
                            <input
                                type="text"
                                placeholder="SEARCH"
                                className="search-input p-1 m-2 bg-black/10"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button
                                className="search-button flex justify-center items-center gap-2 p-2 px-3 m-2 bg-green-300 rounded text-sm text-gray-800 font-semibold"
                                onClick={() => {

                                    let data = filterData(searchText, listOfRestaurants);
                                    setFilterListOfRestaurants(data);

                                }}



                            ><BiSearchAlt className="text-xl" />SEARCH</button>
                        </div>
                        <div className="filter w-[60%] flex justify-between items-center gap-3 rounded-lg  max-[760px]:w-full max-[760px]:bg-gray-200 max-[760px]:font-bold px-1">
                            <button className="filter-btn font-semibold text-lg text-gray-800 p-2 rounded-md hover:bg-black/10 max-[760px]:text-sm max-[560px]:text-[10px] " onClick={() => {
                                let sortedList = [...listOfRestaurants];
                                sortedList.sort((a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime);
                                setFilterListOfRestaurants(sortedList);

                            }}>
                                Delivery Time
                            </button>
                            <button className="filter-btn font-semibold text-lg text-gray-800 p-2 rounded-md hover:bg-black/10 max-[760px]:text-sm max-[560px]:text-[10px] " onClick={() => {
                                let sortedList = [...listOfRestaurants];
                                sortedList.sort((a, b) => b.info.avgRating - a.info.avgRating);
                                setFilterListOfRestaurants(sortedList);

                            }}>
                                Rating
                            </button>
                            <button className="filter-btn font-semibold text-lg text-gray-800 p-2 rounded-md hover:bg-black/10 max-[760px]:text-sm max-[560px]:text-[10px] " onClick={() => {
                                let sortedList = [...listOfRestaurants];
                                sortedList.sort((a, b) => calculateCost(a.info.costForTwo) - calculateCost(b.info.costForTwo));
                                setFilterListOfRestaurants(sortedList);
                            }}>
                                Cost : Low To High
                            </button>
                            <button className="filter-btn font-semibold text-lg text-gray-800 p-2 rounded-md hover:bg-black/10 max-[760px]:text-sm max-[560px]:text-[10px] " onClick={() => {
                                let sortedList = [...listOfRestaurants];
                                sortedList.sort((a, b) => calculateCost(b.info.costForTwo) - calculateCost(a.info.costForTwo));
                                setFilterListOfRestaurants(sortedList);
                            }}>
                                Cost : High To Low
                            </button>

                        </div>

                    </div>

                    <div className="res-container flex flex-wrap justify-between items-start w-[81%] gap-y-20 max-[800px]:gap-y-0 max-[730px]:w-full max-[660px]:justify-center">
                        {
                            
                            listOfRestaurants &&
                            filterListOfRestaurants?.map((restaurant) => (<Link key={restaurant?.info?.id} to={"/restaurants/" + restaurant?.info?.id} ><RestaurantCard resData={restaurant} /></Link>))
                        }
                        {console.log("List of ressss : ",filterListOfRestaurants)}
                    </div>
                </div>
            </div>
        )

            :
            (
                <div className="shimmer flex justify-center w-full">
                    <ShimmerBody />
                </div>
            )

    )
}

export default Body;