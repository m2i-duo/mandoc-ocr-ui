"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {Model, RenderMode, SaveFormat} from "@/lib/types";
import {SplitChunkOutput} from "@/lib/schema";

type TMandocContext = {
    loading: boolean;
    downloading: boolean;
    image: string;
    model: Model;
    renderMode: RenderMode;
    saveFormat: SaveFormat;
    mergedText: string;
    splitChunks: SplitChunkOutput[];
    setLoading: (loading: boolean) => void;
    setDownloading: (downloading: boolean) => void;
    setImage: (image: string) => void;
    setModel: (model: Model) => void;
    setRenderMode: (renderMode: RenderMode) => void;
    setMergedText: (mergedText: string) => void;
    setSplitChunks: (splitChunks: SplitChunkOutput[]) => void;
    setSaveFormat: (saveFormat: SaveFormat) => void;
};

const MandocContext = createContext<TMandocContext | undefined>(undefined);

export const MandocContextProvider = ({ children }: { children: ReactNode }) => {
    const [model, setModel] = useState<Model>('CRNN');
    const [image, setImage] = useState<string>('');
    const [renderMode, setRenderMode] = useState<RenderMode>('MERGED');
    const [mergedText, setMergedText] = useState<string>('');
    const [splitChunks, setSplitChunks] = useState<SplitChunkOutput[]>([]);
    const [saveFormat, setSaveFormat] = useState<SaveFormat>('pdf');
    const [loading, setLoading] = useState<boolean>(false);
    const [downloading, setDownloading] = useState<boolean>(false);
    return (
        <MandocContext.Provider value={{ image, model, splitChunks, mergedText, renderMode, saveFormat, loading, downloading, setImage, setModel, setMergedText, setRenderMode, setSplitChunks, setSaveFormat, setLoading, setDownloading}}>
            {children}
        </MandocContext.Provider>
    );
};

export const useMandocContext = () => {
    const context = useContext(MandocContext);
    if (!context) {
        throw new Error('useMandocContext must be used within a PosTaggerProvider');
    }
    return context;
};