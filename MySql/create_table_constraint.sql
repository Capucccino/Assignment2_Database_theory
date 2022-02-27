use Reddit;

DROP TABLE IF EXISTS `Comment`;
CREATE TABLE `Comment` (
  `id` varchar(7) NOT NULL,
  `name` varchar(20) NOT NULL,
  `author` varchar(20) NOT NULL,
  `score` int(11) NOT NULL,
  `body` varchar(9900) NOT NULL,
  `subreddit_id` varchar(8) NOT NULL,
  `parent_id` varchar(10) NOT NULL,
  `created_utc` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `link_id` varchar(8) NOT NULL,
	PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id`),
    KEY `FK_COMMENTSUBREDDIT_idx` (`subreddit_id`)
);

DROP TABLE IF EXISTS `SubReddit`;
CREATE TABLE `SubReddit` (
    `subreddit_id` varchar(8) NOT NULL,
	`subreddit` varchar(20) NOT NULL,
      PRIMARY KEY (`subreddit_id`),
      UNIQUE KEY `subreddit_id_UNIQUE` (`subreddit_id`),
      UNIQUE KEY `subreddit_UNIQUE` (`subreddit`)
);




