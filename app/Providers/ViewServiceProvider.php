<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        view()->share('app_name', 'lavue');
        view()->share('base_url', 'https://www.yjshare.cn/');
        view()->share('default_seo_keywords', "五常大米,稻花香,大米,粮叔叔,水稻种植,最好的大米,真正的五常大米,炜煜水稻,合作社");
        view()->share('default_seo_title', "米中贵族_五常大米_最好的大米_五常_水稻种植_合作社_稻花香-粮叔叔");
        view()->share('default_seo_description', "炜煜合作社提供正宗自产自销的稻花香大米，如有需要，请联系18801292741");
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
