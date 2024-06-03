import { useEffect } from "react";
import { useState } from "react"
import { useFetch } from "../hooks/useFetch";
import { fetchMeals } from "../requests";

import Meal from "../components/Meal";

export default function MealItemList({onAddToCart}) {
    const {
        isFetching,
        error, 
        fetchedData: meals
    } = useFetch(fetchMeals, []);

    const showMeals = !isFetching && meals.length;
    
    return <div id="meals">
        { showMeals && meals.map(meal => <Meal 
            key={meal.id}
            image={meal.image}
            description={meal.description}
            name={meal.name}
            price={meal.price}
            onAddToCart={() => {onAddToCart(meal)}}
        /> )}
        </div>;
}