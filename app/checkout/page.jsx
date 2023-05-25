'use client';
import React, { useContext } from "react";
import GlobalContext from "../../GlobalContext";



export default function Checkout() {
    
    const {globals,setGlobals} = useContext(GlobalContext);
    const removeItemFromCart = (id) => {
        setGlobals({
          ...globals,
          cartItems: globals.cartItems.filter((item) => item.id !== id),
        });
      };
    const incrementItemInCart = (id) => {
        setGlobals({
          ...globals,
          cartItems: globals.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
      };
      const decrementItemInCart = (id) => {
        //if quantity is 1 remove item from cart
        if (globals.cartItems.find((item) => item.id === id).quantity === 1) {
          removeItemFromCart(id);
          return;
        }
        setGlobals({
          ...globals,
          cartItems: globals.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          ),
        });
      };

    const QuantityInput = ({product}) => {
        return (<div>
         <label htmlFor="Quantity" className="sr-only"> Quantity </label>
       
         <div className="flex items-center border border-gray-200 rounded mt-2">
           <button
             type="button"
             className="w-6 h-6 leading-6 text-gray-600 transition hover:opacity-75"
             onClick={() => decrementItemInCart(product.id)}
           >
             -
           </button>
       
           <input
             type="number"
             id="Quantity"
             value={product.quantity}
             className="h-6 w-10 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
           />
       
           <button
             type="button"
             className="w-6 h-6 leading-6 text-gray-600 transition hover:opacity-75"
             onClick={() => incrementItemInCart(product.id)}
           >
             +
           </button>
         </div>
       </div>);
       }
       
    const CartItemsListing = () => {
     return  globals.cartItems.map((product) => {
        return (<li className="flex gap-4 py-4 justify-between">
        <div className='flex items-center gap-4 py-4'>
        <img
          src={product.image}
          alt=""
          className="h-16 w-16 rounded object-cover"
        />
        <div>
          <h3 className="text-sm text-gray-900">{product.title}</h3>

          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
            <div>
              <dt className="inline">Size:</dt>
            </div>

            <div>
              <dt className="inline">Color:</dt>
              <dd className="inline">White</dd>
            </div>
            <div className="w-fit flex justify-between">
                <QuantityInput product={product}/>
            </div>
          </dl>
        </div>
        </div>
        <div className="py-4 flex flex-col justify-between ">
            <p>{product.price}</p>
            <button
                type="button"
                className="text-gray-400 hover:text-gray-500 transition ml-5"
                onClick={() => removeItemFromCart(product.id)}
                >
                <span className="sr-only">Remove</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

            </button>

        </div>
      </li>);
        });
    }
    const calculateTotal = () =>
    {
       return globals.cartItems.reduce((total, item) => {
           return (total + item.price * item.quantity);
         }, 0);
    }
  return (
    <div className="bg-white">
      
      <section className='mt-1'>
        <h1 className="sr-only">Checkout</h1>
        <div className="mx-auto grid max-w-screen h-screen grid-cols-1 md:grid-cols-2">
        <div className="bg-white py-12 md:py-24 ">
            <div className="mx-auto max-w-lg sm:max-w-2xl px-4 lg:px-8">
              <h3 className='mb-5'>Shipping details</h3>
              <form className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-xs font-medium text-gray-700"
                  >
                    First Name
                  </label>

                  <input
                    type="text"
                    id="FirstName"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    id="LastName"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Phone"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Phone
                  </label>

                  <input
                    type="tel"
                    id="Phone"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <fieldset className="col-span-6">
                  <legend className="block text-sm font-medium text-gray-700">
                    Card Details
                  </legend>

                  <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                    <div>
                      <label htmlFor="CardNumber" className="sr-only">
                        {" "}
                        Card Number{" "}
                      </label>

                      <input
                        type="text"
                        id="CardNumber"
                        placeholder="Card Number"
                        className="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>

                    <div className="flex">
                      <div className="flex-1">
                        <label htmlFor="CardExpiry" className="sr-only">
                          {" "}
                          Card Expiry{" "}
                        </label>

                        <input
                          type="text"
                          id="CardExpiry"
                          placeholder="Expiry Date"
                          className="relative w-full rounded-es-md border-gray-200 focus:z-10 sm:text-sm"
                        />
                      </div>

                      <div className="-ms-px flex-1">
                        <label htmlFor="CardCVC" className="sr-only">
                          {" "}
                          Card CVC{" "}
                        </label>

                        <input
                          type="text"
                          id="CardCVC"
                          placeholder="CVC"
                          className="relative w-full rounded-ee-md border-gray-200 focus:z-10 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="col-span-6">
                  <legend className="block text-sm font-medium text-gray-700">
                    Billing Address
                  </legend>

                  <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                    <div>
                      <label htmlFor="Country" className="sr-only">
                        Country
                      </label>

                      <select
                        id="Country"
                        className="relative w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                      >
                        <option>England</option>
                        <option>Wales</option>
                        <option>Scotland</option>
                        <option>France</option>
                        <option>Belgium</option>
                        <option>Japan</option>
                      </select>
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="PostalCode">
                        {" "}
                        ZIP/Post Code{" "}
                      </label>

                      <input
                        type="text"
                        id="PostalCode"
                        placeholder="ZIP/Post Code"
                        className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="col-span-6">
                  <button className="block w-full rounded-md bg-gray-600 p-2.5 text-sm text-white transition hover:shadow-lg" >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-gray-50 py-12 md:py-24">
            <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
             <h3 className='mb-5'>Order Summary</h3>

              <div>
                <p className="text-2xl font-medium tracking-tight text-gray-900">
                    ${calculateTotal()}
                </p>

                <p className="mt-1 text-sm text-gray-600">For the purchase of</p>
              </div>

              <div>
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-100">
                  <CartItemsListing />
                  </ul>
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </section>
    </div>
  );
}
