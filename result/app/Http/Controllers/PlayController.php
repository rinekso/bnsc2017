<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class PlayController extends Controller
{
    public function send(Request $request)
    {
        $input = $request->all();
        $result = app('leaderboard')->input($input);
        if($result) return 1;
        else return 0;
    }
    public function leaderboard($game)
    {
        return app('leaderboard')->leaderboard($game);
    }
}
