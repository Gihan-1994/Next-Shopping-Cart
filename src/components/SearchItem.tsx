import React, {useMemo} from 'react';
import {useState, useEffect} from "react";
import Fuse from "fuse.js";
import {Product} from "@/types";
import ProductCard from "@/components/ProductCard";

interface SearchItemProps {
    productProps: Product[];
}

const SearchItem: React.FC<SearchItemProps> = ({productProps}) => {
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<Product[]>([]);

    const fuse = useMemo(() => new Fuse(productProps, {
        keys: ["name"],
        threshold: 0.3,
    }),[productProps]);
    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const handler = setTimeout(() => {
            const searchResults = fuse.search(query).map(result => result.item);
            setResults(searchResults);
        }, 300);

        return () => clearTimeout(handler);

    }, [query, fuse]);



    return (
        <div className="w-[300px] mx-auto my-5 text-center relative">
            <h1 className="text-2xl font-bold mb-4 bg-gradient-to-b from-black to-blue-600 text-transparent bg-clip-text">
                What You Looking For </h1>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-blue-900 bg-amber-100"
            />
            {results.length > -1 && (
                <ul className="list-none p-0 mt-2.5 border-1 border-blue-600 ">
                    {results.length === 0 ? (
                        <li>No results found</li>
                    ) : (
                        <div className="w-full max-h-[300px] overflow-y-scroll bg-blue-300">
                            {results.map((item) => (
                                <li key={item.id} className="py-1.25 ">
                                    {item.name}
                                    <ProductCard product={
                                        productProps.find(product => product.id === item.id) || item

                                    }/>
                                </li>
                            ))}
                        </div>
                    )}
                </ul>
            )}
        </div>
    )
}
export default SearchItem
