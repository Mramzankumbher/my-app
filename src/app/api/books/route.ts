import { NextResponse } from "next/server";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  available: boolean;
}

let books: Book[] = [
  {
    id: 1,
    title: "Ghuman",
    author: "Joon Ailia",
    image: "/books1.jpg",
    available: true,
  },
  {
    id: 2,
    title: "Kilyat Allama Iqbal",
    author: "Allama Muhammad Iqbal",
    image: "/books2.jpg",
    available: true,
  },
  {
    id: 3,
    title: "Ayiak or Mohabbat",
    author: "Mirza fasil Nafees yousif",
    image: "/books3.jpg",
    available: true,
  },
  {
    id: 4,
    title: "Dewan Ghalib",
    author: "Malik Ram",
    image: "/books4.jpg",
    available: true,
  },
  {
    id: 5,
    title: "Thukay Hary",
    author: "Khadija Mastoor",
    image: "/books5.jpg",
    available: true,
  },

];

// GET API
export const GET = async () => {
  return NextResponse.json(books, { status: 200 });
};

// POST API
export async function POST(req: Request) {
  try {
    const newBook: Book = await req.json();
    books.push({ ...newBook, id: books.length + 1 });
    return NextResponse.json({ message: "Book added successfully" }, { status: 201 });
  } catch (err) {
    console.error("Error adding book:", err); // Fixed: Use the `err` variable
    return NextResponse.json({ message: "Error adding book" }, { status: 500 });
  }
}

// PUT API
export async function PUT(req: Request) {
  try {
    const updatedBook: Book = await req.json();
    books = books.map((book) =>
      book.id === updatedBook.id ? { ...book, ...updatedBook } : book
    );
    return NextResponse.json({ message: "Book updated successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error updating book:", err); // Fixed: Use the `err` variable
    return NextResponse.json({ message: "Error updating book" }, { status: 500 });
  }
}

// DELETE API
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    books = books.filter((book) => book.id !== id);
    return NextResponse.json({ message: "Book deleted successfully!" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting book:", err); // Fixed: Use the `err` variable
    return NextResponse.json({ message: "Error deleting book!" }, { status: 500 });
  }
}