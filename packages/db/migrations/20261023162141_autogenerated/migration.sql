CREATE TABLE `account` (
	`id` text PRIMARY KEY,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT `fk_account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL UNIQUE,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	CONSTRAINT `fk_session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`email` text NOT NULL UNIQUE,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `group` (
	`id` text PRIMARY KEY,
	`owner_id` text NOT NULL,
	`name` text NOT NULL,
	CONSTRAINT `fk_group_owner_id_user_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT
);
--> statement-breakpoint
CREATE TABLE `invite` (
	`code` text PRIMARY KEY,
	`group_id` text NOT NULL,
	`expires` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`created_by_id` text NOT NULL,
	CONSTRAINT `fk_invite_group_id_group_id_fk` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_invite_created_by_id_user_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `membership` (
	`user_id` text NOT NULL,
	`group_id` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `membership_pk` PRIMARY KEY(`user_id`, `group_id`),
	CONSTRAINT `fk_membership_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_membership_group_id_group_id_fk` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `trip` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`group_id` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`created_by_id` text NOT NULL,
	CONSTRAINT `fk_trip_group_id_group_id_fk` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_trip_created_by_id_user_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `user`(`id`) ON DELETE SET NULL
);
--> statement-breakpoint
CREATE TABLE `item` (
	`id` integer PRIMARY KEY,
	`group_id` integer NOT NULL,
	`trip_id` integer,
	`name` text NOT NULL,
	`quantity` text,
	`notes` text,
	`price` real,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`created_by_id` text NOT NULL,
	CONSTRAINT `fk_item_group_id_group_id_fk` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_item_trip_id_trip_id_fk` FOREIGN KEY (`trip_id`) REFERENCES `trip`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_item_created_by_id_user_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `user`(`id`) ON DELETE SET NULL
);
--> statement-breakpoint
CREATE TABLE `wantedItem` (
	`item_id` text NOT NULL,
	`user_id` text NOT NULL,
	`parts` integer NOT NULL,
	CONSTRAINT `wantedItem_pk` PRIMARY KEY(`item_id`, `user_id`),
	CONSTRAINT `fk_wantedItem_item_id_group_id_fk` FOREIGN KEY (`item_id`) REFERENCES `group`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_wantedItem_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);--> statement-breakpoint
CREATE INDEX `invite_groupId_idx` ON `invite` (`group_id`);--> statement-breakpoint
CREATE INDEX `membership_userId_idx` ON `membership` (`user_id`);--> statement-breakpoint
CREATE INDEX `membership_groupId_idx` ON `membership` (`group_id`);--> statement-breakpoint
CREATE INDEX `trip_groupId_idx` ON `trip` (`group_id`);--> statement-breakpoint
CREATE INDEX `item_groupId_idx` ON `item` (`group_id`);--> statement-breakpoint
CREATE INDEX `item_groupId_tripId_idx` ON `item` (`group_id`,`trip_id`);--> statement-breakpoint
CREATE INDEX `wantedItem_itemId_idx` ON `wantedItem` (`item_id`);--> statement-breakpoint
CREATE INDEX `wantedItem_userId_idx` ON `wantedItem` (`user_id`);