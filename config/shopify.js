'use strict'

const Env = use('Env')

module.exports = {

    app_name: Env.get('SHOPIFY_APP_NAME', 'AdonisJs'),

    api_version: Env.get('SHOPIFY_API_VERSION', '2020-07'),

    api_key: Env.get('SHOPIFY_API_KEY', ''),

    api_secret: Env.get('SHOPIFY_API_SECRET', ''),

    api_scopes: Env.get('SHOPIFY_API_SCOPES', 'read_products,write_products'),

    api_redirect: Env.get('APP_URL', 'https://adonis.tk')+Env.get('SHOPIFY_API_REDIRECT', '/authenticate'),

    webhooks : [
        {
            topic : Env.get('SHOPIFY_WEBHOOK_1_TOPIC', 'app/uninstalled'),
            address : Env.get('APP_URL', 'https://adonis.tk')+Env.get('SHOPIFY_WEBHOOK_1_ADDRESS', '/webhook/app-uninstalled')
        }
    ],
    scripttags : [
        // {
        //     'src' : Env.get('SHOPIFY_SCRIPTTAG_1_SRC', 'https://some-app.com/some-controller/js-method-response'),
        //     'event' : Env.get('SHOPIFY_SCRIPTTAG_1_EVENT', 'onload'),
        //     'display_scope' : Env.get('SHOPIFY_SCRIPTTAG_1_DISPLAY_SCOPE', 'online_store')
        // }
    ],
    after_authenticate_job : [
        /*
            [
                'job' => env('AFTER_AUTHENTICATE_JOB'), // example: \App\Jobs\AfterAuthorizeJob::class
                'inline' => env('AFTER_AUTHENTICATE_JOB_INLINE', false) // False = dispatch job for later, true = dispatch immediately
            ],
        */
    ]
}
