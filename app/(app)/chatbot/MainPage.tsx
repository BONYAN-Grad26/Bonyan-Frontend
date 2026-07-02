'use client';
import Linkify from "linkify-react";
import ReactMarkdown from "react-markdown";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw, Apple, Dumbbell, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import "aos/dist/aos.css";
import AOS from "aos";
import { HealthProfileData, Message } from '@/lib/interfaces';
import { sendMessageToAI } from '@/serverActions/chat';
import { isEnglish } from "@/lib/constants";

interface AICoachPageProps { 
    userProfile: HealthProfileData;

}

export default function AICoachPage({ userProfile }: AICoachPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message  = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {

        const message = await sendMessageToAI(textToSend, userProfile);
        const botReply: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: message,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const starterPrompts = [
    { text: 'Calculate my daily water intake', icon: <Apple className="w-4 h-4 text-sky-500" /> },
    { text: 'Give me a 15-min home workout', icon: <Dumbbell className="w-4 h-4 text-emerald-500" /> },
    { text: 'How to fix low energy afternoon cravings?', icon: <Brain className="w-4 h-4 text-amber-500" /> },
  ];
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div className='flex-1  h-full flex justify-center items-center'>

    <div  data-aos="fade-down" className="flex h-[calc(100vh-6rem)]  w-full max-w-5xl mx-auto bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-2xl overflow-hidden shadow-xs">
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-950">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                Bonyan AI Smart Coach
                <Sparkles className="w-3.5 h-3.5 text-sky-500 fill-sky-500/10 animate-pulse" />
              </h2>
              <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active & Ready
              </p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMessages([])}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl h-9 w-9 border border-slate-100 dark:border-slate-900 cursor-pointer"
            title="Clear Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        {/* مساحة عرض الرسائل */}
        <div className="flex-1 no-scrollbar overflow-y-auto p-6 space-y-6 bg-white dark:bg-slate-950">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center max-w-md mx-auto text-center space-y-6 animate-in fade-in duration-500">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto text-sky-500">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Start your Health Consultation</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">Click a prompt below or type your customized nutritional question directly.</p>
              </div>
              
              <div className="w-full space-y-2.5">
                {starterPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt.text)}
                    className="w-full flex items-center gap-3 p-3.5 text-left text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-sky-500/5 hover:text-sky-600 border border-slate-100 dark:border-slate-900/60 rounded-xl transition-all group cursor-pointer"
                  >
                    {prompt.icon}
                    <span className="flex-1 truncate">{prompt.text}</span>
                    <Send className="w-3 h-3 opacity-0 group-hover:opacity-100 text-sky-500 transition-all transform translate-x-2 group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'} animate-in fade-in duration-200`}
              >
                
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-xs ${
                  msg.role === 'user' 
                    ? 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300' 
                    : 'bg-sky-500 text-white border-sky-600'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-tr-none font-medium'
                      : 'bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200 border border-slate-100 dark:border-slate-900 rounded-tl-none'
                  }`}>
                    <p dir={isEnglish(msg.content) ? "ltr" : "rtl"} className="whitespace-pre-wrap">

                        <Linkify
                            options={{
                              target: "_blank",
                              className: "text-sky-500 underline",
                            }}
                        >
                          {msg.content}
                        
                        </Linkify>
                        
                    </p>
                  </div>
                  <span className={`block text-[10px] text-slate-400 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-4 max-w-[80%] mr-auto animate-in fade-in duration-200">
              <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-900 rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Bonyan AI Coach..."
              className="flex-1 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-sky-500/20 text-sm px-4"
              disabled={isLoading}
              dir={input && isEnglish(input) ? "ltr" : "rtl"}
            />
            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="h-12 w-12 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-all p-0 shrink-0 cursor-pointer disabled:opacity-40 shadow-xs shadow-sky-500/10"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-2.5">
            AI-generated response. Please cross-verify critical macronutrient changes with your nutritionist.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}