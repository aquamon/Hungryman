import { useState, useEffect } from "react"
const useApiRes = () => {

    const [web, setWeb] = useState(true);


    const [fetchData, setFetchData] = useState(null);


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

    const fetchRestaurant = async () => {
        try {
            const data = await fetch(import.meta.env.VITE_MAIN_API);
            const fData = await data.json();
            setFetchData(fData);
        }
        catch (err) {
            console.log(err);
        }

    }


    useEffect(() => {
        fetchRestaurant();
    }, [])

    
    return fetchData;
}

export default useApiRes
