<!DOCTYPE html>
<html>
  <head>
    
      <!-- سایر تگ‌های meta -->
      <meta name="csrf-token" content="{{ csrf_token() }}">

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  </head>
  <body>
    <div id="app" data-page="{{ json_encode($page) }}"></div>

    @inertia
  </body>
</html>
