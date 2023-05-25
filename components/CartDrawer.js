import Link from 'next/link';
import GlobalContext from '../GlobalContext'
import React, { useContext } from 'react'

export default function CartDrawer() {
  const {globals,setGlobals} = useContext(GlobalContext);
  let {openCartDrawer} =  globals;
  const calculateSubtotal = () => {
    return globals.cartItems.reduce((total, item) => {
      return (total + item.price * item.quantity);
    }, 0);
  }
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
  const removeItemFromCart = (id) => {
    setGlobals({
      ...globals,
      cartItems: globals.cartItems.filter((item) => item.id !== id),
    });
  };
  const CartItemsList = () => {
    return globals.cartItems.map((product)=> 
                   (<li className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={product.image} alt="Clothes orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">{product.title}</a>
                            </h3>
                            <p className="ml-4">{product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Clothes</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500 mt-2">
                            {/* create decrement button */}
                            <button type="button" className="mr-3 font-medium text-gray-600 hover:text-gray-500 px-2 bg-gray-100 rounded-full" onClick={()=>decrementItemInCart(product.id)}>-</button> 
                            {product.quantity}
                            {/* create increment button */}
                            <button type="button" className="mx-3 font-medium text-gray-600 hover:text-gray-500 px-2 bg-gray-100 rounded-full" onClick={()=>incrementItemInCart(product.id)}>+</button>
                         
                          </p>
                          <div className="flex">
                            <button type="button" className="mx-3 font-medium text-gray-600 hover:text-gray-500" onClick={()=>removeItemFromCart(product.id)}>Remove</button>
                          </div>
                        </div>
                      </div>
                    </li>) 
                  );
  }  
  return (
    //if show is true add translate-x-full
    <div id="drawer-right-example" className={`${openCartDrawer?'':'translate-x-full'} fixed top-0 right-0 z-40 h-screen p-3 overflow-y-auto transition-transform  bg-white w-full sm:w-96 dark:bg-gray-800`}  aria-labelledby="drawer-right-label"> 
   <button type="button"  aria-controls="drawer-right-example" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      <span className="sr-only">Close menu</span>
   </button>
   <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
  
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div className="fixed inset-0 overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
       
        <div className="pointer-events-auto w-screen max-w-md">
          <div className="flex h-full flex-col  bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                <div className="ml-3 flex h-7 items-center">
                  <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={()=>setGlobals({...globals,openCartDrawer:false})}>
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                   { 
                    <CartItemsList />
                    }
                  
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${calculateSubtotal()}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Link href="/checkout" className="flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700">Checkout</Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <button type="button" className="ml-1 font-medium text-gray-600 hover:text-gray-500" onClick={()=>setGlobals({...globals,openCartDrawer:false})}>
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
