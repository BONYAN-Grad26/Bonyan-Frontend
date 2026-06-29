"use client";

import { baseUrl, insteadImage } from "@/lib/constants";
import { Allergy, CartItem, Ingredient } from "@/lib/interfaces";
import { addTocart, modifyCartItem, removeFromCart } from "@/serverActions/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteModal from "../layout/Deletemodel";
import "aos/dist/aos.css";
import AOS from "aos";
import IngredientCard from "./IngredientCard";
interface IngredientsPageProps {
  ingredients: Ingredient[];
  currentPage: number;
  cart: CartItem[];
}

export default function IngredientsPage({ cart, ingredients, currentPage }: IngredientsPageProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<CartItem | null>(null)
  const [addingToCart, setAddingToCart] = useState({
    id: -1,
    loading: false
  });
  const [removingFromCart, setRemovingFromCart] = useState({
    id: -1,
    loading: false
  });
  const [updatingItem, setUpdatingItem] = useState({
    id: -1,
    loading: false
  });
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
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
  
  const handleRemoveFromCart = async(cartItem:CartItem)=> {
    try {
      setRemovingFromCart({id:cartItem.ingredientId,loading:true})
      await removeFromCart(cartItem.id);
      router.refresh();
      toast.success(`${cartItem.ingredientName} is deleted successfully! 🛍️`);
    } catch (error:any) {
        toast.error(error.message || "Something went wrong");
    } finally {
      setRemovingFromCart({id:-1,loading:false})
      setIsOpen(false)
    }
  }
    
  const handleIncreaseQuantity = async(e: React.MouseEvent,cartItem:CartItem)=> {
    e.preventDefault();
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
    <>
    <DeleteModal 
      message="Are you sure you want to delete this item from cart ? This action cannot be undone." 
      isOpen={isOpen} 
      onClose={()=>setIsOpen(false)} 
      loading={removingFromCart.loading} 
      onConfirm={()=> {
        if(item) {
          handleRemoveFromCart(item);
        }
      }} 
    />

    <div data-aos="fade-down" className="min-h-screen bg-background p-6 md:p-12 text-foreground antialiased selection:bg-sky-100 selection:text-sky-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Ultra-Minimalist Header */}
        <div className="relative overflow-hidden mb-12 bg-card p-8 rounded-3xl border border-sky-500/5 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-sky-500 bg-sky-500/5 border border-sky-500/10 px-3 py-1 rounded-full mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              Premium Catalog
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-foreground/90 tracking-tight">Ingredients Matrix</h1>
            <p className="text-muted-foreground text-sm md:text-base mt-1 font-medium">Discover, screen for allergies, and manage your kitchen essentials.</p>
          </div>
          <div className="flex items-center gap-3 bg-foreground text-background px-5 py-3 rounded-2xl font-semibold text-sm shadow-md shadow-foreground/5 border border-foreground/10 tracking-wide">
            Page {currentPage}
          </div>
        </div>

        {ingredients.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-sky-500/5 shadow-xs max-w-md mx-auto transform animate-fade-in">
            <div className="w-16 h-16 bg-sky-500/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-sky-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-sky-500/40">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground/90">No ingredients found</h3>
            <p className="text-muted-foreground text-sm mt-1.5 px-8 leading-relaxed">We couldn't find any items on this page. Try navigating back or refresh.</p>
          </div>
        ) : (
          /* Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ingredients.map((ingredient,index) => {
              const existingItem = isExistInCart(ingredient.id);
              const isCurrentLoading = ingredient.id === addingToCart.id && addingToCart.loading;

              return (
                <IngredientCard
                key={index+1}
                ingredient={ingredient}
                insteadImage={insteadImage}
                existingItem={existingItem}
                isCurrentLoading={isCurrentLoading}
                updatingItem={updatingItem}
                removingFromCart={removingFromCart}
                handleAddToCart={handleAddToCart}
                handleIncreaseQuantity={handleIncreaseQuantity}
                setIsOpen={setIsOpen}
                setItem={setItem}
                
                />

              );
            })}
          </div>
        )}

        {/* Floating Capsule Pagination */}
        <div className="flex items-center justify-center gap-2 mt-20 bg-card p-2 rounded-2xl border border-sky-500/5 shadow-xs max-w-[240px] mx-auto">
          <button
            disabled={currentPage <= 1}
            onClick={() => router.push(`/ingredients?currentPage=${currentPage-1}`)}                
            className="p-2.5 bg-sky-500/[0.01] border border-sky-500/5 rounded-xl text-muted-foreground hover:bg-sky-500 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-xs"
            aria-label="Previous Page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <span className="text-xs font-black text-foreground/80 px-4 uppercase tracking-widest font-mono">
            P. {currentPage}
          </span>

          <button
            disabled={ingredients.length === 0} 
            onClick={() => router.push(`/ingredients?currentPage=${currentPage+1}`)}
            className="p-2.5 bg-sky-500/[0.01] border border-sky-500/5 rounded-xl text-muted-foreground hover:bg-sky-500 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-xs"
            aria-label="Next Page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

      </div>
    </div>
    </>
  );
}