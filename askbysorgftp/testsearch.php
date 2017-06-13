<?php 

require_once("../wp-config.php"); // Change this for your path to wp-config.php file

// Include the wp-load'er
include('../wp-load.php');

$searchquery = htmlspecialchars($_GET["search"]);


$args = array(
	'posts_per_page'   => 5,
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
	
    $lastposts = get_posts( $args );
	foreach ( $lastposts as $post ) :setup_postdata( $post ); ?>
	
		<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
		<?php the_content(); ?>
		<li> Response: </li>
		<?php $comments = get_comments( array( 'number' => 2, 'post_id' => get_the_ID() ) );
        foreach($comments as $comm) :
				echo '<li>';
				echo($comm->comment_author);
			        echo ':';
				echo($comm->comment_content);
				echo '</li>';
			endforeach;
						?>
	<?php endforeach; 
   wp_reset_postdata();
   
   

// Get the last 10 posts
// Returns posts as arrays instead of get_posts' objects
//$recent_posts = wp_get_recent_posts(array(
//	'numberposts' => 10
//));
	
// Do something with them
//echo '<ul>';
//foreach($posts_array as $post) {
//	echo '<li><a href="', get_permalink($post['ID']), '">', $post['post_title'], '</a></li>';
//}
//echo '</ul>'; 

?>