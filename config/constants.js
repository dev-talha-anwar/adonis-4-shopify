'use strict'

const Config = use('Config');

module.exports = {
    rest : {
        //get shop settings i.e. shop api
        shopApi : {
            method : "GET",
            endPoint : `/admin/api/${Config.get('shopify.api_version')}/shop.json`
        },
        //get all themes api
        getAllThemes : {
            method : "GET",
            endPoint : `/admin/api/${Config.get('shopify.api_version')}/themes.json`
        },
        //get all webhooks
        getAllWebhooks : {
            method: 'GET',
            endPoint :  `/admin/api/${Config.get('shopify.api_version')}/webhooks.json`
        }
        // //save script tag api
        // 'saveScriptTag' => [
        //     '/admin/api/2020-04/script_tags.json'
        // ],
        // //get single asset of a theme
        // 'getSingleAsset' => [
        //     '/admin/api/2020-04/themes/',
        //     '/assets.json'
        // ],
        // //save single asset of a theme
        // 'saveSingleAsset' => [
        //     '/admin/api/2020-04/themes/',
        //     '/assets.json'
        // ],
        // //delete asset of a theme
        // 'deleteAsset' => [
        //     '/admin/api/2020-04/themes/',
        //     '/assets.json'
        // ],
        //apis for testing purpose

    },
    graph : {
        endpoint : `/admin/api/${Config.get('shopify.api_version')}/graphql.json`,
        method : 'POST',
        query : {
            shopQuery : [
                `{ shop {`,
                `} }`
            ]
        },
        mutation : {
            addWebhook : [
                `mutation webhookSubscriptionCreate(`,
                `: WebhookSubscriptionTopic!, `,
                `: WebhookSubscriptionInput!) { webhookSubscriptionCreate(topic: `,
                `, webhookSubscription: `,
                `) {
                    userErrors {
                    field
                    message
                    }
                    webhookSubscription {
                    id
                    }
                }
                }`
            ]
        }
    },
    // constant string used in the app
    strings : {
        // 'app_snippet' => "snippets/alphacurrencyconverter.liquid",
        // 'app_include' => "\n{% comment %}//alpha currency snippet start{% endcomment %}\n {% capture snippet_content %}\n {% include 'alphacurrencyconverter' %} \n{% endcapture %} \n{% unless snippet_check contains 'Liquid error' %}\n {{ snippet_content }}\n {% endunless %}\n {% comment %}//alpha currency snippet end{% endcomment %}\n",
        // 'app_start_identifier' => "\n{% comment %}//alpha currency snippet start{% endcomment %}",
        // 'app_end_identifier' => "{% comment %}//alpha currency snippet end{% endcomment %}\n",
        // 'app_include_before_tag' => "</body>",
        // theme_liquid_file : "layout/theme.liquid"
        // 'filename' => "assets/alpha_checkout.js",
    }

};