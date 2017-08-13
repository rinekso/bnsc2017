<?php namespace App\Rinekso;

use App\Rinekso\Leaderboard\Leaderboard;
use App\Rinekso\Leaderboard\LeaderboardRepo;
use App\Rinekso\User\User;
use App\Rinekso\User\UserRepo;
use Illuminate\Support\ServiceProvider;

class RineksoServiceProvider extends ServiceProvider
{
    protected $defer = false;

    public function register()
    {
        $this->app->bind('user',function(){
            return new UserRepo(
                new User()
            );
        });
        $this->app->bind('leaderboard',function(){
            return new LeaderboardRepo(
                new Leaderboard()
            );
        });
    }
}