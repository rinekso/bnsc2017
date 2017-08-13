@extends('ui.layout')
@section('css')
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/register.css')}}">
@endsection
@section('content')
<div class="container">
    <div class="wrapper">
        <div class="part bg-green active register">
            <h2>Register</h2>
            @if($errors->any())
            <div class="notif">
                <div class="bg-red circle">
                    <img alt="non" src="{{asset('assets/img/about.png')}}" class="icon">
                </div>
                <span>{{$errors->first()}}</span>
            </div>
            @endif
            <form action="{{url('register/send')}}" method="post" enctype="multipart/form-data">
                <div class="col-1">
                    <input type="text" placeholder="Full Name" required class="form-control" name="name">
                </div>
                <div class="col-1">
                    <input type="text" placeholder="Username" required class="form-control" name="username">
                </div>
                <div class="col-1">
                    <input type="email" placeholder="Email" required class="form-control" name="email">
                </div>
                <div class="col-1">
                    <input type="password" placeholder="Password" required class="form-control" name="passwords">
                </div>
                <div class="col-1">
                    <input type="file" id="picture" class="form-control" required name="picture">
                </div>
                <div class="col-2">
                    <input type="date" placeholder="Date of Birth (DD/MM/YYYY)" class="form-control" name="birth">
                </div>
                <div class="col-2">
                    <input type="text" placeholder="Phone number" class="form-control" name="phone">
                </div>
                <div class="col-1">
                    <h2>Question :
                        <span>{{$a = rand(1,100)}} +</span>
                        <span>{{$b = rand(1,100)}} = ?</span>
                    </h2>
                    <input type="hidden" value="{{$a+$b}}" placeholder="answer the question" class="form-control" name="answer">
                    <input type="number" placeholder="answer the question" class="form-control" name="captcha">
                </div>
                <div class="col-1">
                    {{csrf_field()}}
                    <button class="btn bg-blue right">Submit</button>
                </div>
            </form>
        </div>
        <form action="{{url('login')}}" method="post">
            <div class="part bg-blue login">
                <h2>Login</h2>
                <div class="col-1">
                    <input type="text" placeholder="Username" name="username" required class="form-control">
                </div>
                <div class="col-1">
                    <input type="password" placeholder="Password" required name="password" class="form-control">
                </div>
                <div class="col-1">
                    {{csrf_field()}}
                    <button class="btn bg-green right" type="submit">Submit</button>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection
@section('js')
<script type="text/javascript" src="assets/js/register.js"></script>
@stop