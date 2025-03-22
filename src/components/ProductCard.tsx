'use client'
import React from "react";
import Image from "next/image";
import {Product} from "@/types";
import {useCartStore} from "@/store/cartStore";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const isAdded = useCartStore((state) => state.isAddedToCart(product.id));
    return (
        <div className="bg-white rounded shadow overflow-hidden ">
            <div className="relative h-58 w-100vw h-100vh">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{objectFit: 'cover'}}
                />
            </div>

            <div className="p-4">
                <div className="flex-col">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
                </div>

                <div className="mb-4 pb-4">
                    <button
                        onClick={() => addToCart(product)}
                        className={`mt-4 w-full text-white py-2 rounded transition ${
                            isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {`${isAdded ? 'Added to cart  ✔' : 'Add to cart'}`}
                    </button>
                </div>

            </div>
        </div>

    )
}
export default ProductCard;