import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/config.js";

const ProductContext = createContext();

// rovider
function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setProducts(await api.get("/products"));
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchProducts();
    }, []);

    return <ProductContext.Provider value={products}>{children}</ProductContext.Provider>;
}

// hook for get data
function useProducts() {
    const products = useContext(ProductContext);
    return products;
}

export { useProducts, ProductProvider as default };
