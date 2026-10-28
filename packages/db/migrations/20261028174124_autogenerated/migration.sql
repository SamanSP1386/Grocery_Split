PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_item` (
	`id` text PRIMARY KEY,
	`group_id` text NOT NULL,
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
INSERT INTO `__new_item`(`id`, `group_id`, `trip_id`, `name`, `quantity`, `notes`, `price`, `created_at`, `created_by_id`) SELECT `id`, `group_id`, `trip_id`, `name`, `quantity`, `notes`, `price`, `created_at`, `created_by_id` FROM `item`;--> statement-breakpoint
DROP TABLE `item`;--> statement-breakpoint
ALTER TABLE `__new_item` RENAME TO `item`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `item_groupId_idx` ON `item` (`group_id`);--> statement-breakpoint
CREATE INDEX `item_groupId_tripId_idx` ON `item` (`group_id`,`trip_id`);