import React from "react";
import { Meme } from "../../types/types";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Image } from "@heroui/react";
import "./MemeList.css";
import { useMemes } from "../../context/MemeContext";

const MemeList: React.FC = () => {
  const { memes } = useMemes();
  return (
    <div className="meme-list">
      <div className="meme-grid">
        {memes.map((meme: Meme) => (
          <Card key={meme.id} className="meme-card">
            <Image
              src={meme.imageUrl}
              alt={meme.title}
              className="meme-image"
            />
            <CardBody>
              <CardHeader className="meme-title">{meme.title}</CardHeader>
              <p className="meme-likes">Likes: {meme.likes}</p>
            </CardBody>
            <CardFooter>
              <a
                href={meme.imageUrl}
                className="meme-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to Meme
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MemeList;
