<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
    public function index()
    {
//        $user = Session::get('user');
//        if(!isset($user)){
//            redirect('register');
//        }
        return view('ui.index');
    }
    public function register()
    {
        return view('ui.register');
    }
    public function sendRegister(Request $request)
    {
        $data = [
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'birth' => $request->birth,
            'phone' => $request->phone
        ];
        if(@$request->picture != '')
        {
            $extension = $request->file('picture')->getClientOriginalExtension();
            if($extension == "jpg") {
                $judul = date('d_F_Y-h_i_s');
                $request->file('picture')->move('assets/img/avatar',$judul.".jpg");
                $data['picture'] = $judul.".jpg";
            }else{
                return Redirect::back()->withErrors(['file must jpg']);
            }
        }
        app('user')->input($data);
        return Redirect::back();
    }
    public function login(Request $request)
    {
//        dd($request->all());
        if(Auth::attempt([
            'username' => $request->username,
            'password' => $request->password
        ]))
        {
            $data = app('user')->getDataWhere('username',$request->username);
//            dd($data);
            Session::put('user',$data);
        }else{
            return Redirect::back()->withErrors(['Password or Username wrong']);
        }
        return redirect('/');
    }
}
