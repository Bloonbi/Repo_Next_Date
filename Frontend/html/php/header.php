<!DOCTYPE html>
<html lang="en">

<head>
    <!-- basic -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- mobile metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
    <!-- site metas -->
    <title>Cafeteria Imperial</title>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    ¿
    <meta name="author" content="" />
    <!-- bootstrap css -->
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css" />
    <!-- style css -->
    <link rel="stylesheet" type="text/css" href="../css/style.css" />
    <!-- Responsive-->
    <link rel="stylesheet" href="../css/responsive.css" />
    <!-- fevicon -->
    <link rel="icon" href="images/fevicon.png" type="../image/gif" />
    <!-- Scrollbar Custom CSS -->
    <link rel="stylesheet" href="../css/jquery.mCustomScrollbar.min.css" />
    <!-- Tweaks for older IEs-->
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" />
    <!-- owl stylesheets -->
    <link rel="stylesheet" href="../css/owl.carousel.min.css" />
    <link rel="stylesheet" href="../css/owl.theme.default.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css"
        media="screen" />
</head>



<body>
    <!--header section start -->
    <div class="header_section">
        <div class="container-fluid">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="logo">
                    <a href="index.html"><img src="../images/logo.png" class="imglogo" /></a>
                </div>
                <div class="container-srh"></div>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <!--Barra de busqueda -->
                        <form class="search-box">
                            <input type="text" id="producto" placeholder="Busque un producto" />
                            <button type="submit" id="btn">
                                <img src="../images/search-icon.png" />
                            </button>
                        </form>
                        <!-- Boton Login -->
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="login-link" data-toggle="modal"
                                data-target="#loginModal">Login</a>
                        </li>
                        <!-- Boton Register -->
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="register-link" data-toggle="modal"
                                data-target="#registerModal">Register</a>
                        </li>
                        <li class="nav-item" id="user-options" style="display: none">
                            <a class="nav-link" href="user.html" id="user-profile">hola</a>
                            <a class="nav-link" href="#" id="logout-link">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    <script src="js/search.js"></script>
</body>

</html>