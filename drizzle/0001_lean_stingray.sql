CREATE TABLE `applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`initiativeType` enum('incubator','accelerator','hackathon','bootcamp','geosandbox') NOT NULL,
	`projectName` text NOT NULL,
	`projectDescription` text NOT NULL,
	`teamSize` int,
	`expectedDuration` varchar(50),
	`status` enum('draft','submitted','under_review','accepted','rejected','in_progress','completed','withdrawn') NOT NULL DEFAULT 'draft',
	`submittedAt` timestamp,
	`reviewedAt` timestamp,
	`reviewNotes` text,
	`startDate` date,
	`endDate` date,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `eventRegistrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`eventId` int NOT NULL,
	`status` enum('registered','confirmed','attended','cancelled') NOT NULL DEFAULT 'registered',
	`registeredAt` timestamp NOT NULL DEFAULT (now()),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `eventRegistrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`eventType` enum('hackathon','workshop','bootcamp','networking','demo_day','conference') NOT NULL,
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`location` text NOT NULL,
	`capacity` int,
	`registrationDeadline` timestamp,
	`status` enum('upcoming','ongoing','completed','cancelled') NOT NULL DEFAULT 'upcoming',
	`imageUrl` text,
	`isPublished` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mentoringSessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`applicationId` int,
	`mentorName` text NOT NULL,
	`mentorEmail` varchar(320),
	`sessionType` enum('consultation','technical_review','business_strategy','pitch_practice','general_guidance') NOT NULL,
	`scheduledAt` timestamp NOT NULL,
	`duration` int NOT NULL,
	`location` text,
	`status` enum('scheduled','confirmed','completed','cancelled','rescheduled') NOT NULL DEFAULT 'scheduled',
	`notes` text,
	`feedback` text,
	`rating` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mentoringSessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`resourceType` enum('document','video','link','tool','template') NOT NULL,
	`category` varchar(100),
	`url` text NOT NULL,
	`thumbnailUrl` text,
	`isPublic` boolean NOT NULL DEFAULT true,
	`downloadCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `organization` text;--> statement-breakpoint
ALTER TABLE `users` ADD `jobTitle` text;--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;