<?php 

require_once("../wp-config.php"); // Change this for your path to wp-config.php file

// Include the wp-load'er
include('../wp-load.php');

$searchquery = htmlspecialchars($_GET["search"]);


$args = array(
	'posts_per_page'   => -1,
	'offset'           => 0,
	'category'         => '',
	'category_name'    => '',
	'orderby'          => 'date',
	'order'            => 'DESC',
	'include'          => '',
	'exclude'          => '',
	'meta_key'         => '',
	'meta_value'       => '',
	'post_type'        => 'post',
	'post_mime_type'   => '',
	'post_parent'      => '',
	'author'	       => '',
	'post_status'      => 'publish',
	's'				   => $searchquery,
	'suppress_filters' => true );
	
       $query = new WP_Query( $args ); // $query is the WP_Query Object
       $posts = $query->get_posts();   // $posts contains the post objects

        $output = array();
        foreach( $posts as $post ) {   // Pluck the id and title attributes
           //$output[] = array( 'id' => $post->ID, 'title' => $post->post_title, 'post-content' => $post->post_content );
           $comments = get_comments( array( 'number' => 2, 'post_id' => $post->ID ));
           foreach($comments as $comm) {
				$output[] = array( 'id' => $post->ID, 'title' => $post->post_title, 'post-content' => $post->post_content, 'comment_author' => $comm->comment_author, 'comment_content' => $comm->comment_content );
			}
		}		
		
		echo json_encode( $output, JSON_UNESCAPED_SLASHES );
		wp_reset_postdata();
?>

