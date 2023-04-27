/* eslint-disable @next/next/no-img-element */
"use client"
import Cart from '@/components/Cart';
import Product from '@/components/Product';
import { useState } from 'react';


export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  function handleAddToCart(x: number, y: number, image: string) {
    setCartCount(cartCount + 1);


    const cart: any = document.querySelector('.cart-icon') || {};
    const productImage = document.createElement("div");

    // Create a clone of the product image
    const xAxis: any = productImage?.cloneNode();
    xAxis.style.position = 'absolute';
    xAxis.style.width = `100px`;
    xAxis.style.height = "100px";
    xAxis.style.background = `url("${image}")`
    xAxis.style.backgroundSize = `cover`

    const yAxis = document.createElement("div")
    yAxis.appendChild(xAxis)
    yAxis.style.position = 'absolute';
    yAxis.style.width = `100px`;
    yAxis.style.height = "100px";

    // Add the cloned product image to the DOM
    document.body.appendChild(yAxis);

    // Animate the cloned product image to the cart
    const animationXAxis = xAxis.animate(
      [
        { left: `${x - cart.offsetLeft - 120}px`, top: `${0}px` },
        { left: `${0}px`, top: `${0}px` },
      ],
      {
        duration: 1200,
        easing: 'linear',
        fill: 'forwards',
      }
    );

    const animationYAxis = yAxis.animate(
      [
        { left: `${cart.offsetLeft + 120}px`, top: `${y}px`, transform: "scale(1.0)", opacity: .8 },
        { left: `${cart.offsetLeft + 120}px`, top: `${cart.offsetTop}px`, transform: "scale(0.6)", opacity: 0.1 },
      ],
      {
        duration: 1200,
        easing: 'ease',
        fill: 'forwards',
      }
    );

    // Remove the cloned product image from the DOM after the animation is done
    animationXAxis.onfinish = () => {
      xAxis.remove();
    };

    animationYAxis.onfinish = () => {
      yAxis.remove();
    };
  }


  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-3xl font-bold mb-4">Product Listing</h1>
      <Cart itemCount={cartCount} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Product
          name="Product 1"
          price="19.99"
          image="https://cdn.shopify.com/s/files/1/0024/9803/5810/products/596667-Product-0-I-637982213840849162.jpg?v=1662700221"
          onAddToCart={handleAddToCart}
        />
        <Product
          name="Product 2"
          price="24.99"
          image="https://cdn.shopify.com/s/files/1/0024/9803/5810/products/596667-Product-0-I-637982213840849162.jpg?v=1662700221"
          onAddToCart={handleAddToCart}
        />
        <Product
          name="Product 3"
          price="14.99"
          image="https://cdn.shopify.com/s/files/1/0024/9803/5810/products/596667-Product-0-I-637982213840849162.jpg?v=1662700221"
          onAddToCart={handleAddToCart}
        />
        <Product
          name="Product 4"
          price="29.99"
          image="https://cdn.shopify.com/s/files/1/0024/9803/5810/products/596667-Product-0-I-637982213840849162.jpg?v=1662700221"
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}
