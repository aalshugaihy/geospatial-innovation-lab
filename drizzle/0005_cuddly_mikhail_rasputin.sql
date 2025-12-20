CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('application_status','session_reminder','new_resource','achievement_earned','project_update','general') NOT NULL,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`link` text,
	`isRead` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userPoints` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`totalPoints` int NOT NULL DEFAULT 0,
	`monthlyPoints` int NOT NULL DEFAULT 0,
	`projectsCount` int NOT NULL DEFAULT 0,
	`ratingsCount` int NOT NULL DEFAULT 0,
	`resourcesContributed` int NOT NULL DEFAULT 0,
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userPoints_id` PRIMARY KEY(`id`),
	CONSTRAINT `userPoints_userId_unique` UNIQUE(`userId`)
);
