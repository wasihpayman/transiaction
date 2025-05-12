@extends('layout')

@section('content')
    <div class="container">
        <h1>Login Attempts</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>IP Address</th>
                    <th>Attempted At</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach($loginAttempts as $attempt)
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>{{ $attempt->ip_address }}</td>
                        <td>{{ $attempt->attempted_at }}</td>
                        <td>{{ $attempt->successful ? 'Successful' : 'Failed' }}</td>
                        <td>
                            @if(!$attempt->successful)
                                <form action="{{ route('admin.blockIp', $attempt->id) }}" method="POST">
                                    @csrf
                                    @method('POST')
                                    <button type="submit" class="btn btn-danger">Block IP</button>
                                </form>
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        {{ $loginAttempts->links() }}
    </div>
@endsection
