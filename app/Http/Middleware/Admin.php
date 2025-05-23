<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->user() || !auth()->user()->is_admin) {
            return redirect('/');  // یا صفحه دلخواه برای دسترسی غیرمجاز
        }

        return $next($request);
    }
}
