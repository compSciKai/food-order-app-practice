import { useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchMeals } from "../utils/requests";

import Meal from "../components/Meal";
import { CartContext } from "../store/cart-context";


export default function MealItemList() {
    const {
        isFetching,
        error, 
        fetchedData: meals
    } = useFetch(fetchMeals, []);
    const { addItemToCart } = useContext(CartContext);

    const showMeals = !isFetching && meals.length;
    
    return <div id="meals">
        { showMeals && meals.map(meal => <Meal 
            key={meal.id}
            image={meal.image}
            description={meal.description}
            name={meal.name}
            price={meal.price}
            onAddToCart={() => {addItemToCart(meal)}}
        /> )}
        </div>;
}