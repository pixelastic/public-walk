window.HD = {};

$(function main() {
		// Default position
		var userPos = {
			lat: 48.85790014566900000,
			lng: 2.34716868082870000
		}

		// Display main map
		var mainMapOptions = {
				zoom: 14,
				center: new google.maps.LatLng(userPos.lat, userPos.lng),
				mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var mainMap = new google.maps.Map(document.getElementById("map_canvas"), mainMapOptions);

		// Add a new marker on the map
		function addCamera(lat, lng, name) {
			var marker = new google.maps.Marker({
				position:new google.maps.LatLng(lat, lng),
				map: mainMap, 
				title:name,
			}); 
			var circle = new google.maps.Circle({
				map: mainMap,
				radius: 50,
				fillColor: '#AA0000'
			});
			circle.bindTo('center', marker, 'position');
			return marker;
		}

		HD.geo.initGeoloc();

		// Get the cameras around us, and display them on the map
		$.ajax({
			url : 'get_cctv.php',
			data : userPos,
			success: function(data) {
				// Add each cam on the map
				_.each(data, function eachCamera(camera) {
					addCamera(camera.lat, camera.lng, camera.name)
				});
			}
		});
});
