<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Profile; // اطمینان حاصل کن که این مدل را وارد کرده‌ای
use App\Models\Remittances; // اطمینان حاصل کن که این مدل را وارد کرده‌ای
class RemittanceController extends Controller
{
    public function index()
{
    return Inertia::render('Remittances', [
        'sent' => Remittances::where('sender_id', auth()->id())->with('receiver', 'sender')->get(),
        'received' => Remittances::where('receiver_id', auth()->id())->with('receiver', 'sender')->get(),
        'pending' => Remittances::where('status', 'pending')->with('receiver', 'sender')->get(),
        'delivered' => Remittances::where('status', 'delivered')->with('receiver', 'sender')->get(),
        'canceled' => Remittances::where('status', 'canceled')->with('receiver', 'sender')->get(),
    ]);
}
public function getExchangeUsername(Request $request)
{
    $username = $request->query('username');

    if (!$username) {
        return response()->json(['error' => 'یوزرنیم ارسال نشده است'], 400);
    }

    $phone = Remittances::getExchangeUsername($username);

    if (!$phone) {
        return response()->json(['error' => 'شماره‌ای برای این یوزرنیم یافت نشد'], 404);
    }

    return response()->json(['phone' => $phone]);
}
public function store(Request $request)
{
    $request->validate([
        'receiver_phone' => 'required|numeric',  // اعتبارسنجی برای شماره تلفن گیرنده
        'amount' => 'required|numeric|min:1',    // اعتبارسنجی برای مبلغ
    ]);

    // پیدا کردن گیرنده با استفاده از شماره تلفن
    $receiver = Profile::where('phone', $request->receiver_phone)->first();

    // اگر گیرنده پیدا نشد، پیام خطا را برمی‌گردانیم
    if (!$receiver) {
        return response()->json(['message' => 'گیرنده با این شماره تلفن پیدا نشد.'], 404);
    }

    // ساخت حواله جدید
    Remittances::create([
        'sender_id' => auth()->user()->id, // فرض بر این است که کاربر لاگین کرده است
        'receiver_id' => $receiver->user->id, // دریافت شناسه کاربری گیرنده از رابطه با مدل User
        'amount' => $request->amount,
        'description' => $request->description,
        'status' => 'pending', // وضعیت پیش‌فرض
    ]);

    return response()->json(['message' => 'حواله با موفقیت ایجاد شد.']);
}


public function sent()
{
    return Remittance::with(['receiver', 'sender'])
        ->where('sender_id', auth()->id())
        ->get();
}

public function received()
{
    return Remittance::with(['receiver', 'sender'])
        ->where('receiver_id', auth()->id())
        ->get();
}

public function pending()
{
    return Remittance::with(['receiver', 'sender'])
        ->where('sender_id', auth()->id())
        ->where('status', 'pending')
        ->get();
}

public function delivered()
{
    return Remittance::with(['receiver', 'sender'])
        ->where('sender_id', auth()->id())
        ->where('status', 'delivered')
        ->get();
}
public function cancel(Request $request, $id)
{
    $remittance = Remittance::findOrFail($id);
    $remittance->status = 'canceled';
    $remittance->save();

    return redirect()->back();


    }
}