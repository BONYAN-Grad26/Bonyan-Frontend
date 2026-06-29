'use client'
import { CartItem } from '@/lib/interfaces'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { insteadImage } from '@/lib/constants'
import DeleteModal from '@/components/layout/Deletemodel'
import toast from 'react-hot-toast'
import { removeFromCart } from '@/serverActions/cart'
import "aos/dist/aos.css";
import AOS from "aos";
interface MainCartProps {
    cart: CartItem[]
}

const MainCart = ({ cart }: MainCartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartItem, setCartItem] = useState<CartItem | null >(null)
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 5; // Free shipping over $100
  const total = subtotal + shipping;

  const handleRemoveFromCart = async(cartItem: CartItem)=> {
    setLoading(true)
    try {
        await removeFromCart(cartItem.id);
        toast.success("item is removed successfully !")
    } catch (error: any) {
        toast.error(error.message)
    } finally {
        setIsOpen(false)
        setLoading(false)
    }
  }
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <>
    <DeleteModal loading={loading} isOpen={isOpen} onClose={()=>setIsOpen(false)} onConfirm={()=> {
        if(cartItem) {
            handleRemoveFromCart(cartItem)
        }
    }} />

    <div data-aos="fade-down" className="min-h-screen text-foreground antialiased selection:bg-sky-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="border-b border-sky-500/10 pb-5 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground/90 tracking-tight">Your Ingredients Basket</h1>
            <p className="mt-2 text-sm text-sky-500 font-medium">
              You have selected <span className="font-bold underline">{cart.length} items</span> for your recipes
            </p>
          </div>
          <Link href="/ingredients?currentPage=1" className="text-sm font-semibold text-sky-500 hover:text-sky-600 hover:underline shrink-0">
            ← Add more ingredients
          </Link>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-4 bg-card p-4 rounded-2xl border border-sky-500/5 shadow-xs hover:border-sky-500/15 transition-colors duration-200"
              >
                {/* Ingredient Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-sky-500/[0.02] rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-sky-500/10">
                  {item.ingredientImgUrl ? (
                    <img 
                      src={item.ingredientImgUrl || insteadImage} 
                      alt={item.ingredientName} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = insteadImage;
                      }}
                    />
                  ) : (
                    /* Fallback Icon if image missing */
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-500/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </div>

                {/* Ingredient Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground/80 text-base sm:text-lg truncate">
                    {item.ingredientName}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Qty: <span className="font-medium text-foreground/70">{item.quantity}</span> 
                    <span className="mx-2 text-sky-500/20">|</span> 
                    Price: <span className="font-medium text-foreground/70">${item.price.toFixed(2)}</span>
                  </p>
                  
                  {/* Remove button for mobile view */}
                  <button onClick={()=> {
                    setIsOpen(true);
                    setCartItem(item)
                  }} className="sm:hidden text-xs font-semibold text-rose-500 hover:text-rose-600 mt-3 block cursor-pointer">
                    Remove
                  </button>
                </div>

                {/* Total Price & Remove Button (Desktop view) */}
                <div className="hidden sm:flex flex-col items-end justify-between h-20 py-1">
                  <span className="font-bold text-lg text-foreground/80">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button onClick={()=> {
                    setIsOpen(true);
                    setCartItem(item)
                  }} className="text-xs font-medium text-muted-foreground/50 hover:text-rose-500 transition-colors cursor-pointer">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Order Summary Sidebar */}
          <div className="lg:col-span-4 bg-card p-6 rounded-2xl border border-sky-500/5 shadow-xs lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-foreground/90 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm text-muted-foreground border-b border-sky-500/5 pb-4 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground/80">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Fresh Delivery</span>
                <span className="font-semibold text-foreground/80">
                  {shipping === 0 ? <span className="text-sky-500 font-bold">Free</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-base font-bold text-foreground/90 mb-6">
              <span>Total Amount</span>
              <span className="text-xl text-sky-500">${total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md shadow-sky-500/10 cursor-pointer active:scale-95 mb-4">
              Proceed to Checkout
            </button>
            
            <p className="text-center text-[11px] text-muted-foreground/40">
              Secured & eco-packaged checkout
            </p>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default MainCart