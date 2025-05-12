<?php

namespace App\Providers;
use Inertia\Inertia;
// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{


public function authenticated(Request $request, $user)
{
    if ($user->is_admin) {
        return redirect()->route('admin.dashboard'); // هدایت به داشبورد ادمین
    }

    return redirect()->route('user.dashboard'); // هدایت به داشبورد یوزر
}

    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
       // SecurityLog::class => SecurityLogPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
