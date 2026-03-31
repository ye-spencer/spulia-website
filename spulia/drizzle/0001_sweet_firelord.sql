CREATE TABLE "date_bucketlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(1000) DEFAULT '' NOT NULL,
	"city" varchar(255) NOT NULL,
	"added_by" varchar(255) NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now()
);
