CREATE TABLE `telegram_chats` (
	`user_id` integer NOT NULL,
	`chat_id` text(255) NOT NULL,
	`thread_id` text(255),
	`updated_at` text,
	`created_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `telegram_chats_user_id_chat_id_thread_id_unique` ON `telegram_chats` (`user_id`,`chat_id`,`thread_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`login` text(255) NOT NULL,
	`password` text(255) NOT NULL,
	`updated_at` text,
	`created_at` text NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_login_unique` ON `users` (`login`);