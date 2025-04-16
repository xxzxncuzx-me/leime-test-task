import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Meme } from "../types/types";

interface MemeProviderProps {
  children: ReactNode;
}

const MemeContext = createContext<{
  memes: Meme[];
  setMemes: React.Dispatch<React.SetStateAction<Meme[]>>;
}>({
  memes: [],
  setMemes: () => {},
});

export const MemeProvider: React.FC<MemeProviderProps> = ({ children }) => {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const storedMemes = localStorage.getItem("memes");
    if (storedMemes) {
      setMemes(JSON.parse(storedMemes));
    } else {
      const defaultMemes = [
        { id: 1, title: "Meme 1", imageUrl: "url1.jpg", likes: 0 },
        { id: 2, title: "Meme 2", imageUrl: "url2.jpg", likes: 0 },
        { id: 3, title: "Meme 3", imageUrl: "url3.jpg", likes: 0 },
      ];
      setMemes(defaultMemes);
      localStorage.setItem("memes", JSON.stringify(defaultMemes));
    }

    const syncMemes = () => {
      const storedMemes = localStorage.getItem("memes");
      if (storedMemes) {
        setMemes(JSON.parse(storedMemes));
      }
    };

    window.addEventListener("storage", syncMemes);

    return () => {
      window.removeEventListener("storage", syncMemes);
    };
  }, []);

  useEffect(() => {
    if (memes.length > 0) {
      localStorage.setItem("memes", JSON.stringify(memes));
    }
  }, [memes]);

  return (
    <MemeContext.Provider value={{ memes, setMemes }}>
      {children}
    </MemeContext.Provider>
  );
};

export const useMemes = () => useContext(MemeContext);
