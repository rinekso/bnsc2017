<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'UserController@index');
Route::get('register','UserController@register');
Route::post('register/send','UserController@sendRegister');
Route::post('login','UserController@login');
Route::get('send/score','PlayController@send');
Route::get('leaderboard/{game}','PlayController@leaderboard');