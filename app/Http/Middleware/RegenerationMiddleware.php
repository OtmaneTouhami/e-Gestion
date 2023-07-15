<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Providers\RouteServiceProvider;
use Symfony\Component\HttpFoundation\Response;

class RegenerationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        $recovery_password = $user->recovery_password;

        if (Hash::check($recovery_password, $user->password)) {
            return $next($request);
        }
        
        return redirect()->intended(RouteServiceProvider::REDIRECT);
    }
}
