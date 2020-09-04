<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="loginstyles.css">
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
	integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
	crossorigin="anonymous">
<link rel="icon" type="image/png" href="/favicon/02d.png" />
<script src="https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.19.1/firebase-auth.js"></script>
<title>WeatherCamp</title>
</head>
<body>
	<div class="sitetitle" id="heading">
		<img src="assets/icon.png" width="65" height="65"
			class="d-inline-block" alt="">
		<h6 class="d-inline-block display-5" id="heading-text">Weather
			Camp</h6>
	</div>

	<div class="weather-data">
		<h1 class="city" id="city">City Name</h1>
		<div>
			<h3 class="d-inline-block desc" id="desc">Description of that
				day</h3>
			<div class="d-inline-block" id="icon"
				style="height: 10px; width: 10px;"></div>
		</div>
		<p class="data" id="temp">Temperature</p>
		<p class="data" id="pressure">Pressure</p>
		<p class="data" id="humidity">Humidity</p>
		<p class="data" id="cloud">Cloud</p>
		<p class="data" id="wind">Wind Speed</p>
		<p class="data" id="feels-like">Feels Like</p>
		<p class="data" id="aqius">AQI US</p>
		<p class="aqidata" id="aqidescription">AQI Description</p>
	</div>

	<div>
		<p class="message">Login to our website to get detailed weather
			report</p>
	</div>
	<div class="divider"></div>
	<div class="login"
		style="box-shadow: 2px 2px 2px 2px rgba(37, 37, 37, 0.24);">
		<h4 style="position: relative; top: 3%;">Login</h4>
		<input id="Username" type="text" class="form-control"
			placeholder="Username" aria-label="Username"
			aria-describedby="addon-wrapping"> <input id="password"
			type="password" class="form-control" placeholder="Password"
			aria-label="Username" aria-describedby="addon-wrapping">
		<button class="btn btn-outline-light"
			style="position: absolute; left: 32%; top: 60%; width: 110px;"
			type="button" onclick="login()">Log In</button>
		<p
			style="position: absolute; bottom: 15%; left: 20%; font-size: 12px;">Not
			a member of our community?</p>
		<a href="#" data-toggle="modal" data-target="#Register"
			style="color: #fffcb9; position: absolute; bottom: 12%; left: 42%;">Register</a>
	</div>

	<div class="modal fade" id="Register" tabindex="-1" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" style="background-color: rgb(34, 0, 56);">
					<h5 class="modal-title" style="color: rgb(255, 255, 255);">Register
						to our Community</h5>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close"></button>
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body" style="background-color: rgb(42, 28, 48);">
					<input id="Register_Email" type="email" class="form-control"
						placeholder="Email Id" aria-label="Email"
						aria-describedby="addon-wrapping"> <input
						id="Register_password" type="password" class="form-control"
						placeholder="Password" aria-label="Password"
						aria-describedby="addon-wrapping">
					<div style="position: relative; left: 30px; top: 10px;">
						<input type="checkbox" id="condition" name="condition" value="T&C">
						<label for="condition" style="color: white;"> I agree to
							the terms and conditions</label><br>
					</div>
				</div>
				<div class="modal-footer" style="background-color: rgb(26, 12, 34);">
					<button type="button" class="btn btn-outline-light"
						data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-outline-light"
						data-dismiss="modal" onclick="register()">Register</button>
				</div>
			</div>
		</div>
	</div>

	<script src="loginscript.js"></script>
	<!-- The core Firebase JS SDK is always required and must be listed first -->


	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
		integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
		crossorigin="anonymous"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
		integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
		crossorigin="anonymous"></script>
	<script
		src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
		integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
		crossorigin="anonymous"></script>
</body>
</html>