<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'Theme_Enqueue' ) ) :

	class Theme_Enqueue {
		function __construct() {
		}

		function init() {
			add_action( 'wp_enqueue_scripts', [ $this, 'theme' ], 20 );
		}

		function theme() {
			wp_enqueue_script( 'ReactTheme-js', get_template_directory_uri() . '/build/static/js/main.js', [], false, true);
			wp_localize_script( 'ReactTheme-js', 'RT_API', array(
				'root'            => esc_url_raw( get_home_url() ),
				'siteName'        => get_bloginfo( 'name' ),
				'siteDescription' => get_bloginfo( 'description' ),
				'current_user'    => wp_get_current_user(),
				'menu'            => wp_nav_menu(array('menu' => 'main_menu', 'echo' => false))
			) );
			wp_enqueue_style( 'theme_stylesheet', get_template_directory_uri() . '/build/static/css/main.css');
		}
	}

endif;
