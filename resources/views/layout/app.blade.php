<html>
    <head>
        <title>
            @if(isset($seo_title))
            {{ $seo_title }}
            @else
            {{ $default_seo_title }}
            @endif
        </title>
        <meta charset="utf-8">
        @if(isset($seo_keywords))
        <meta name="keywords" content="{{ $seo_keywords }}">
        @else
        <meta name="keywords" content="{{ $default_seo_keywords }}">
        @endif
        @if(isset($seo_description))
        <meta name="description" content="{{ $seo_description }}">
        @else
        <meta name="description" content="{{ $default_seo_description }}">
        @endif
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="HandheldFriendly" content="true">
        <meta name="shenma-site-verification" content="fd28a192f28f88f803811ece04994b7c_1514423713">
        <meta name="shenma-site-verification" content="3e57730f15f25aaacebe45772e8c49f8_1516669781">
        <script src="https://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
        <script src="{{ URL::asset('js/show.js') }}"></script>
        <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="{{ URL::asset('css/style.css') }}">
    </head>
    <body>
        @include('public.header')
        @yield('content')
        @include('public.footer')
        @yield('css')
        @yield('js')
    </body>
</html>