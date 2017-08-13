<?php

use Illuminate\Database\Seeder;
use App\Rinekso\User\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Illuminate\Support\Facades\DB::table('users')->truncate();
        User::create([
            'name' => 'Rinekso',
            'username' => 'asd',
            'password' => \Illuminate\Support\Facades\Hash::make('asd'),
            'email' => 'a@a',
            'picture' => '',
            'birth' => '10/19/1997',
            'phone' => '083867103063'
        ]);
    }
}
