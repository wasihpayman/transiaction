<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Middleware\Admin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('flash', function () {
            return [
                'message' => session('message'),
            ];
        });
        

    // ثبت میدل‌ور
    Route::middlewareGroup('admin', [
        Admin::class,
    ]);


    }
}
