<?php namespace App\Rinekso\Leaderboard;

use App\Rinekso\BaseRepo;

class LeaderboardRepo extends BaseRepo
{
    public function __construct(Leaderboard $leaderboard)
    {
        $this->model = $leaderboard;
    }
    public function leaderboard($game)
    {
        $proses = $this->model->select('*')
            ->where('game',$game)
            ->orderBy('score','desc')
            ->limit(10)
            ->get();
        return $proses;
    }
}
/**
 * Created by PhpStorm.
 * User: rinekso
 * Date: 13/08/17
 * Time: 17:50
 */