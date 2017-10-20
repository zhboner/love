<?php
/**
 * Created by PhpStorm.
 * User: Hangbin.Zhang
 * Date: 17/10/2017
 * Time: 2:33 PM
 */

class Comments_By_Post_Route extends WP_REST_Controller {
    public function register_routes() {
        $version = '1';
        $namespace = 'zhboner/v' . $version;
        register_rest_route($namespace, '/comments', array(
            'methods'       => WP_REST_Server::READABLE,
            'callback'      => array($this, 'get_items'),
            'args'          => array(
                'post'      => array(
                    'required'              => true,
                    'validate_callback'     => function($param) {
                        return ctype_digit($param);
                    }
                )
            )
        ));

        register_rest_route($namespace, '/nonce', array(
            'methods'       => WP_REST_Server::READABLE,
            'callback'      => array($this, 'get_item')
        ));
    }

    public function get_items ($request) {
        $post_id = $request->get_param('post');
        $post_id = intval($post_id);
        return get_comments(array(
            'post_id' => $post_id
        ));
    }

    public function get_item($request) {
        return wp_create_nonce('wp_rest');
    }
}

add_action('rest_api_init', function() {
    $Custome_Route = new Comments_By_Post_Route();
    $Custome_Route->register_routes();
});