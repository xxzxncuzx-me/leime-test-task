import React from "react";
import { useState, useEffect } from "react";
import { Meme } from "../../types/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Input,
} from "@heroui/react";
import { useDisclosure } from "@heroui/react";
import "./MemeTable.css";

export default function MemeTable() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    const storedMemes = localStorage.getItem("memes");
    if (storedMemes) {
      setMemes(JSON.parse(storedMemes));
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/api/memes`)
        .then((res) => res.json())
        .then((data) => {
          setMemes(data);
          localStorage.setItem("memes", JSON.stringify(data));
        });
    }

    window.addEventListener("storage", syncMemes);

    return () => {
      window.removeEventListener("storage", syncMemes);
    };
  }, []);

  const syncMemes = () => {
    const storedMemes = localStorage.getItem("memes");
    if (storedMemes) {
      setMemes(JSON.parse(storedMemes));
    }
  };

  const handleEdit = (meme: Meme) => {
    setSelectedMeme(meme);
    onOpen();
  };

  const handleSave = () => {
    if (!selectedMeme) return;

    const updatedMemes = memes.map((m) =>
      m.id === selectedMeme.id ? selectedMeme : m
    );
    setMemes(updatedMemes);
    localStorage.setItem("memes", JSON.stringify(updatedMemes));

    setSelectedMeme(null);
    onClose();
  };

  const columns = [
    { name: "TITLE", uid: "title" },
    { name: "LIKES", uid: "likes" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <div className="table-container">
      <Table aria-label="Meme table" className="meme-table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={memes}>
          {(item) => (
            <TableRow key={item.id} className="table-row">
              {(columnKey) => {
                if (columnKey === "actions") {
                  return (
                    <TableCell className="actions-cell">
                      <Button size="sm" onPress={() => handleEdit(item)}>
                        Edit
                      </Button>
                    </TableCell>
                  );
                }
                return (
                  <TableCell className="table-cell">
                    {item[columnKey as keyof Meme]}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedMeme && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="custom-modal"
          hideCloseButton
          size="full"
        >
          <ModalContent className="responsive-modal-content">
            <ModalHeader>
              <div className="modal-header">
                <span>Edit Meme</span>
                <Button onPress={onClose} className="close-btn">
                  X
                </Button>
              </div>
            </ModalHeader>
            <ModalBody className="modal-body">
              <Input
                label="ID"
                value={selectedMeme.id.toString()}
                readOnly
                className="input-readonly"
              />
              <Input
                label="Title"
                value={selectedMeme.title}
                onChange={(e) =>
                  setSelectedMeme({ ...selectedMeme, title: e.target.value })
                }
                required
                minLength={3}
                maxLength={100}
                className="input-field"
              />
              <Input
                label="Image URL (JPG)"
                value={selectedMeme.imageUrl}
                onChange={(e) =>
                  setSelectedMeme({ ...selectedMeme, imageUrl: e.target.value })
                }
                type="url"
                pattern="https?://.*\\.jpg"
                required
                className="input-field"
              />
              <Input
                label="Likes"
                type="number"
                min={0}
                max={99}
                value={selectedMeme.likes.toString()}
                onChange={(e) =>
                  setSelectedMeme({
                    ...selectedMeme,
                    likes: Number(e.target.value),
                  })
                }
                required
                className="input-field"
              />
            </ModalBody>
            <ModalFooter>
              <Button onPress={handleSave} className="save-btn">
                Save
              </Button>
              <Button variant="ghost" onPress={onClose} className="cancel-btn">
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
