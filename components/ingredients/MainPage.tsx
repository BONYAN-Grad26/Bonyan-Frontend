"use client";

import { baseUrl } from "@/lib/constants";
import { Allergy, CartItem, Ingredient } from "@/lib/interfaces";
import { addTocart, modifyCartItem, removeFromCart } from "@/serverActions/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IngredientsPageProps {
  ingredients: Ingredient[];
  currentPage: number;
  cart: CartItem[];
}

export default function IngredientsPage({ cart, ingredients, currentPage }: IngredientsPageProps) {
  const router = useRouter();
  
  const [addingToCart, setAddingToCart] = useState({
    id: -1,
    loading: false
  });
  const [removingFromCart,setRemovingFromCart] =  useState({
    id: -1,
    loading: false
  });
  const [updatingItem,setUpdatingItem] =  useState({
    id: -1,
    loading: false
  });
  

  const isExistInCart = (id: number) => {
    return cart.find((item) => item.ingredientId === id);
  };

  const handleAddToCart = async (e: React.MouseEvent, ingredient: Ingredient) => {
    e.preventDefault();
    
    if (isExistInCart(ingredient.id)) {
      toast.error('Ingredient already exists in your cart');
      return;
    }

    setAddingToCart({ id: ingredient.id, loading: true });
    try {
      await addTocart(ingredient);
      router.refresh();
      toast.success(`${ingredient.name} added successfully! 🛍️`);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setAddingToCart({ id: -1, loading: false });
    }
  };
  const handleRemoveFromCart = async(e: React.MouseEvent,cartItem:CartItem)=> {
    try {
      setRemovingFromCart({id:cartItem.ingredientId,loading:true})

      await removeFromCart(cartItem.id);
      router.refresh();
      toast.success(`${cartItem.ingredientName} is deleted successfully! 🛍️`);

    } catch (error:any) {
        toast.error(error.message || "Something went wrong");

    } finally {
      setUpdatingItem({id:-1,loading:false})

    }

  }

  const handleIncreaseQuantity = async(e: React.MouseEvent,cartItem:CartItem)=> {

    try {
      setUpdatingItem({id:cartItem.ingredientId,loading:true})
      await modifyCartItem(cartItem.id,cartItem.quantity+1);
      router.refresh();
      toast.success(`${cartItem.ingredientName} quantity is increased successfully! 🛍️`);
      
    } catch (error:any) {
      toast.error(error.message)
      
    } finally {
      setUpdatingItem({id:-1,loading:false})

    }

  }



  

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-gray-50 to-emerald-50/20 p-6 md:p-12 text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Modern Glassmorphic Header */}
        <div className="relative overflow-hidden mb-12 bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-3 py-1 rounded-full mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Premium Catalog
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Ingredients Matrix</h1>
            <p className="text-slate-500 text-sm md:text-base mt-1 font-medium">Discover, screen for allergies, and manage your kitchen essentials.</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-xl shadow-slate-900/10 border border-slate-800 tracking-wide">
            Page {currentPage}
          </div>
        </div>

        {ingredients.length === 0 ? (
          <div className="text-center py-24 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] max-w-md mx-auto transform animate-fade-in">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800">No ingredients found</h3>
            <p className="text-slate-400 text-sm mt-1.5 px-8 leading-relaxed">We couldn't find any items on this page. Try navigating back or refresh.</p>
          </div>
        ) : (
          /* Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ingredients.map((ingredient) => {
              const existingItem = isExistInCart(ingredient.id);
              const isCurrentLoading = ingredient.id === addingToCart.id && addingToCart.loading;

              return (
                <div  
                  key={ingredient.id} 
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-slate-200/60 transition-all duration-300 flex flex-col overflow-hidden group transform hover:-translate-y-2"
                >
                  {/* Image Box */}
                  <div className="relative h-56 w-full bg-slate-50 overflow-hidden">
                    <img 
                      src={ingredient.imageUrl || "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=500&auto=format&fit=crop"} 
                      alt={ingredient.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=500&auto=format&fit=crop";
                      }}
                    />
                    
                    {/* Badges */}
                    <div className="absolute inset-x-4 top-4 flex justify-between items-center pointer-events-none">
                      <span className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-slate-700 font-mono text-xs font-bold shadow-sm border border-white">
                        #{ingredient.id}
                      </span>
                      {existingItem && (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-[10px] uppercase font-black tracking-wider shadow-sm flex items-center gap-1 animate-scale-up">
                          <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                          In Cart
                        </span>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow justify-between gap-6">
                    <div>
                      <h2 className="font-black text-xl text-slate-800 group-hover:text-emerald-600 transition-colors duration-200 line-clamp-1 tracking-tight">
                        {ingredient.name}
                      </h2>
                      <div className="flex items-baseline gap-1 mt-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Price:</span>
                        <span className="text-3xl font-black text-slate-900 tracking-tight font-mono">
                          ${ingredient.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Selector Counter Container */}
                    <div className="flex gap-3 pt-4 border-t border-slate-50 items-center">
                      
                      {existingItem ? (
                        <div className="flex-[2] flex items-center justify-between bg-slate-50 border border-slate-200/60 p-1 rounded-2xl shadow-inner h-[48px] animate-scale-up">
                          <button
                            disabled={removingFromCart.id===ingredient.id && removingFromCart.loading}
                            onClick={(e) => handleRemoveFromCart(e,existingItem)}
                            className="w-10 h-10 rounded-xl cursor-pointer bg-white hover:bg-rose-50 border border-slate-200 text-rose-500 hover:text-rose-600 flex items-center justify-center transition-colors shadow-sm active:scale-90"
                            title="Remove from Cart"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>

                          <span className="font-mono font-black text-sm text-slate-800 select-none bg-white px-3 py-1 rounded-lg border border-slate-100 shadow-sm">
                            Qty: 1
                          </span>

                          <button
                            disabled={updatingItem.id===ingredient.id && updatingItem.loading}

                            onClick={(e) => handleIncreaseQuantity(e,existingItem)}
                            className="w-10 h-10 rounded-xl  cursor-pointer text-slate-400 flex items-center justify-center bg-white hover:bg-green-50 border  "
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          disabled={isCurrentLoading}
                          onClick={(e) => handleAddToCart(e, ingredient)}
                          className="flex-[2] group/btn relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-[length:200%_100%] hover:bg-right text-white font-bold h-[48px] px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.97] disabled:scale-100 disabled:from-emerald-600/70 disabled:to-emerald-600/70 disabled:cursor-not-allowed transition-all duration-300 text-sm"
                        >
                          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                          
                          <div className="flex items-center justify-center gap-2">
                            {isCurrentLoading ? (
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3.5"></circle>
                                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:scale-110 transition-transform duration-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                              </svg>
                            )}
                            <span className="tracking-wide">{isCurrentLoading ? "Adding..." : "Add to Cart"}</span>
                          </div>
                        </button>
                      )}

                      <Link
                        href={`/alleries?id=${ingredient.id}&name=${ingredient.name}`}
                        className="h-[48px] w-[48px] bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-2xl transition-all duration-200 flex items-center justify-center active:scale-95 flex-shrink-0"
                        title="Mark as Allergen"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Capsule Pagination */}
        <div className="flex items-center justify-center gap-2 mt-20 bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] max-w-[240px] mx-auto">
          <button
            disabled={currentPage <= 1}
            onClick={() => router.push(`/ingredients?currentPage=${currentPage-1}`)}                
            className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            aria-label="Previous Page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <span className="text-xs font-black text-slate-800 px-4 uppercase tracking-widest font-mono">
            P. {currentPage}
          </span>

          <button
            disabled={ingredients.length === 0} 
            onClick={() => router.push(`/ingredients?currentPage=${currentPage+1}`)}
            className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            aria-label="Next Page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}