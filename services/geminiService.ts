import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize Gemini Client
// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
// Assume this variable is pre-configured, valid, and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Sen "Etiket Garage"ın yapay zeka asistanısın. 
Etiket Garage, premium bir araç bakım stüdyosudur.
Sloganımız: "Aracınıza değer katan etiket". Konuşmalarında yeri geldiğinde bunu vurgula.
Hizmetlerimiz: PPF (Boya Koruma Filmi), Boyasız Göçük Düzeltme (PDR), Detaylı Temizlik ve Seramik Kaplama.
Tonun: Ciddi, güvenilir, profesyonel ve teknik açıdan bilgili. Füturistik ve modern bir dille konuş.
Asla rakip firmaları kötüleme. Fiyat bilgisi sorulursa "Net fiyat için aracınızı görmemiz gerekir, ancak ortalama bir aralık verebilirim" diyerek genel bir aralık ver.
Müşteriye "Knk" veya "Kardeşim" gibi hitap etme. "Bey/Hanım" veya doğrudan saygılı bir dil kullan.
`;

let chatSession: Chat | null = null;

export const initializeChat = (): void => {
  try {
    if (!process.env.API_KEY) return; // Don't init if no key
    
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  } catch (error) {
    console.error("Failed to initialize chat session", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!process.env.API_KEY) return "Sistem şu anda bakımda. (API Anahtarı eksik)";
  
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    return "Bağlantı hatası. Lütfen daha sonra tekrar deneyiniz.";
  }

  try {
    const result: GenerateContentResponse = await chatSession.sendMessage({
      message: message,
    });
    return result.text || "Şu an cevap veremiyorum.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Üzgünüm, şu anda sistemlerimde bir yoğunluk var. Lütfen numaralarımızdan bize ulaşın.";
  }
};

// Updated to accept aspect ratio. Default is 16:9
export const generateImage = async (prompt: string, aspectRatio: "16:9" | "9:16" = "16:9"): Promise<string | null> => {
  if (!process.env.API_KEY) {
    console.warn("Skipping image generation: No API Key");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};