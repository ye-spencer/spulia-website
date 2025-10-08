CREATE TABLE "book_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer,
	"person" varchar(255) NOT NULL,
	"rating" integer NOT NULL,
	"favorite_line" varchar(255) NOT NULL,
	"favorite_character" varchar(255) NOT NULL,
	"least_favorite_character" varchar(255) NOT NULL,
	"comments" varchar(1000) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "book_reviews" ADD CONSTRAINT "book_reviews_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;