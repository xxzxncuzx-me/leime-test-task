# Meme Directory

A responsive React application that displays a directory of popular memes.

### Features

- Two views of memes: Table and Card List
- Navigation between pages using HeroUI Navbar
- Edit meme data through HeroUI Modal with validation
- Meme properties stored in cookies or localStorage
- Fully responsive layout for desktop and mobile

---

### Pages Overview

#### Meme Table Page

- Displays memes in a **HeroUI Table** component
- Each row contains:
  - Meme ID (read-only)
  - Name
  - Image URL (not shown in table)
  - Likes (randomly generated, editable)
  - **Edit** button (opens a **HeroUI Modal** to edit meme properties)

#### Meme List Page

- Four-column layout using **HeroUI Cards**
- Each card includes:
  - Meme image
  - Meme name
  - Like count
  - Clickable link (to image or meme source)

### Installation

1. Clone the repository  
   `git clone https://github.com/xxzxncuzx-me/leime-test-task.git`

2. Navigate into the folder  
   `cd your-repo`

3. Install dependencies  
   `npm install`

4. Run the development server  
   `npm start`
