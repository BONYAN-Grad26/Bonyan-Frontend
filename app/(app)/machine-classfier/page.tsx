"use client";

import { classfiyMachine } from "@/serverActions/machine-classfier";
import Image from "next/image";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function GymClassifierPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ machineName: string; youtubeLink: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      toast.error("Please select an image file only (PNG, JPG, JPEG).");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Simulate AI classification and video fetching
  const handleClassify = async () => {
    if (!file) {
        toast.error("Please enter your file before");
        return;
    }

    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
        const data = await classfiyMachine(formData);
        setResult({machineName:data.label,youtubeLink: data.video_url})

    } catch (error:any) {
        console.error(error.message)
        toast.error(error.message)

    } finally {
        setIsAnalyzing(false)
    }
  };

  // Copy YouTube link to clipboard
  const copyToClipboard = () => {
    if (result?.youtubeLink) {
      navigator.clipboard.writeText(result.youtubeLink);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 transition-all duration-300">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Gym Machine Classifier</h1>
          <p className="text-sm text-slate-500 mt-1">Upload a photo of any gym equipment to identify it and learn how to use it</p>
        </div>

        {!result ? (
          <div className="space-y-4">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden ${
                isDragging
                  ? "border-emerald-500 bg-emerald-50/50"
                  : "border-slate-300 hover:border-emerald-400 hover:bg-slate-50/50"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              {previewUrl ? (
                <div className="absolute inset-0 w-full h-full p-2 bg-white">
                  <Image
                    fill
                    src={previewUrl as string}
                    alt="Gym Machine Preview"
                    className="w-full h-full object-cover rounded-lg"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-slate-900/40 hover:bg-slate-900/60 transition-colors flex items-center justify-center rounded-lg opacity-0 hover:opacity-100">
                    <p className="text-xs font-semibold text-white bg-slate-900/80 px-3 py-1.5 rounded-full">Change Image</p>
                  </div>
                </div>
              ) : (
                <>
                  <svg className={`w-12 h-12 mb-3 text-slate-400 ${isDragging ? "text-emerald-500 scale-110" : ""} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="text-sm text-slate-600">
                    <span className="font-semibold text-emerald-600">Click to upload machine photo</span> or drag it here
                    <p className="text-xs text-slate-400 mt-2">Supports PNG, JPG, JPEG</p>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleClassify}
              disabled={!file || isAnalyzing}
              className={`w-full py-3 px-4 rounded-xl text-white font-medium shadow-md transition-all duration-150 flex items-center justify-center space-x-2 ${
                !file || isAnalyzing
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-emerald-600/10"
              }`}
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Analyzing Equipment...</span>
                </>
              ) : (
                <span>Identify Machine</span>
              )}
            </button>
          </div>
        ) : (
          /* Results Hub & YouTube Link Distribution */
          <div className="space-y-5">
            {/* Identification Success Banner */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 block">Machine Identified</span>
              <h2 className="text-xl font-bold text-slate-800 mt-1">{result.machineName}</h2>
            </div>

            {/* Video Link Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 block uppercase tracking-wide">Tutorial Video (YouTube)</label>
              
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-2 pr-3">
                {/* YouTube Minimal Brand Vector */}
                <svg className="w-5 h-5 text-red-600 mr-2 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93'.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                
                <input
                  type="text"
                  readOnly
                  value={result.youtubeLink}
                  className="bg-transparent text-sm text-slate-600 flex-1 outline-none truncate font-mono select-all mr-2"
                />
                
                <button
                  onClick={copyToClipboard}
                  className={`py-1.5 px-3.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                    copied
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                  }`}
                >
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>

            {/* Direct Watch Call-To-Action */}
            <a
              href={result.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-md shadow-red-600/10 transition-all text-center block"
            >
              Watch Video Tutorial
            </a>

            {/* Reset Button */}
            <button
              onClick={() => {
                setFile(null);
                setPreviewUrl(null);
                setResult(null);
              }}
              className="w-full py-2 text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors text-center block"
            >
              Analyze Another Machine
            </button>
          </div>
        )}
      </div>
    </main>
  );
}