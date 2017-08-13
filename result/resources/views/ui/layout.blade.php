<?php
    $session = \Illuminate\Support\Facades\Session::get('user')
?>
<!DOCTYPE html>
<html>
<head>
    <title>Indonesia Game Portal</title>
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/custom.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/responsive.css')}}">
    @yield('css')
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<!-- Header section -->
<header>
    <div class="wrapper">
        <nav class="menu">
            <div class="head-1">
                <div class="logo col-2">
                    <img alt="non" src="{{asset('assets/img/icon-logo.png')}}" id="menu-toggle" data-toggle="1">
                    <a href=".">
                        <span>INDONESIA<br>GAME PORTAL</span>
                    </a>
                </div>
                <div class="right col-2">
                    <div class="search-contain">
                        <a href="#" class="btn bg-white user search active">
                            <img alt="non" src="{{asset('assets/img/search.png')}}" class="icon">
                        </a>
                        <form action="#">
                            <input type="text" placeholder="search">
                            <button type="submit" class="circle">
                                <img alt="non" src="{{asset('assets/img/search.png')}}" class="icon">
                            </button>
                        </form>
                    </div>
                    @if(!isset($session))
                        <div class="user-contain">
                            <a href="{{url('register')}}" class="btn bg-blue-2 user">
                                <img alt="non" src="{{asset('assets/img/person.png')}}" class="icon">
                                Register
                            </a>
                        </div>
                    @else
                        <div class="user-contain">
                            <a href="{{url('register')}}" class="btn bg-blue-2 user">
                                <img alt="non" src="{{asset('assets/img/person.png')}}" class="icon">
                                {{$session[0]->name}}
                            </a>
                        </div>
                    @endif
                </div>
            </div>
            <div class="head-2">
                <ul class="active">
                    <li>
                        <a href="{{url('/')}}#banner" class="bg-blue circle">
                            <img alt="non" src="{{asset('assets/img/home.png')}}" class="icon">
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{url('/')}}#gallery" class="bg-green circle">
                            <img alt="non" src="{{asset('assets/img/gallery.png')}}" class="icon">
                            <span>Gallery</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{url('/')}}#games" class="bg-yellow circle">
                            <img alt="non" src="{{asset('assets/img/trophy.png')}}" class="icon">
                            <span>Our Game</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{url('/')}}#info" class="bg-red circle">
                            <img alt="non" src="{{asset('assets/img/about.png')}}" class="icon">
                            <span>About Us</span>
                        </a>
                    </li>
                    <li class="mobile">
                        <a href="register.html" class="bg-blue-2 circle">
                            <img alt="non" src="{{asset('assets/img/person.png')}}" class="icon">
                            <span>Register</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
@yield('banner')
</header>
<!-- end header section -->
@yield('content')
<footer>
    <div id="info">
        <div class="wrapper">
            <div class="col-2">
                <h2>Indonesia Game Portal</h2>
                <p>
                    Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                </p>
                <p class="sitemap"><br><a href=".">Home</a> - <a href="#gallery">Gallery</a> - <a href="#info">About</a> - <a href="register.html">Register</a></p>
            </div>
            <div class="col-2">
                <h2>News Letter</h2>
                <p>
                    Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                </p>
                <form class="subscribe">
                    <input type="email" placeholder="Your Email">
                    <button type="submit" class="bg-blue">Subscribe</button>
                </form>
                <h2>Follow Us</h2>
                <div class="follow">
                    <a href="http://www.facebook.com" target="_blank" class="icon">
                        <img src="{{asset('assets/img/sosial_icon/facebook')}}.png" alt="facebook">
                    </a>
                    <a href="http://www.youtube.com" target="_blank" class="icon">
                        <img src="{{asset('assets/img/sosial_icon/youtube')}}.png" alt="youtube">
                    </a>
                    <a href="http://www.appstore.com" target="_blank" class="icon">
                        <img src="{{asset('assets/img/sosial_icon/app_store')}}.png" alt="app_store">
                    </a>
                    <a href="http://www.blogger.com" target="_blank" class="icon">
                        <img src="{{asset('assets/img/sosial_icon/blogger')}}.png" alt="blogger">
                    </a>
                    <a href="http://www.twitter.com" target="_blank" class="icon">
                        <img src="{{asset('assets/img/sosial_icon/twitter')}}.png" alt="twitter">
                    </a>
                    <a href="http://www.yahoo.com" target="_blank" class="icon">
                        <img src="{{asset('assets/img/sosial_icon/yahoo')}}.png" alt="yahoo">
                    </a>
                    <a href="http://www.picasa.com" target="_blank" class="icon">
                        <img src="{{asset('assets/img/sosial_icon/picasa')}}.png" alt="picasa">
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="bottom">
        <div class="wrapper">
            <a href="#">privacy</a> - <a href="#">policy</a> - contact : 0887348473832
            <span class="right">Designed by : Simson Rinekso</span>
        </div>
    </div>
</footer>
<!-- javascript -->
<script type="text/javascript" src="{{asset('assets/js/jquery.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/default.js')}}"></script>
@yield('js')
</body>
</html>