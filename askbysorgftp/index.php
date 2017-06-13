<?php
	include_once(ABSPATH.WPINC.'/index.php');
	if (isset($_GET['tag']) && $_GET['tag'] != ''){
	$tag = $_GET ['tag'];
	$response = get_recent_posts;
	
	}
	
	$rss = fetch_feed('http://askbys.com/topics/');
	$rss_items = $rss->get_items(0,$rss->get_item_quantity());
	
	echo ($rss_items[2]);
	

?>