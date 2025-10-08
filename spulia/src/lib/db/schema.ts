import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const bookReviews = pgTable("book_reviews", {
    id: serial("id").primaryKey(),
    bookId: integer("book_id").references(() => books.id),
    person: varchar("person", { length: 255 }).notNull(),
    rating: integer("rating").notNull(),
    favoriteLine: varchar("favorite_line", { length: 255 }).notNull(),
    favoriteCharacter: varchar("favorite_character", { length: 255 }).notNull(),
    leastFavoriteCharacter: varchar("least_favorite_character", { length: 255 }).notNull(),
    comments: varchar("comments", { length: 1000 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
