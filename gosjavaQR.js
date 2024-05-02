window.addEventListener('DOMContentLoaded', function () {
  QR_starter();
})
function QR_starter(){
	for (let i = 4; i > 0; i--){
		setTimeout(changeTime, (5-i) * 1000, i);
		}
		setTimeout(returner, 5 * 1000);
}
function changeTime(num){
	document.getElementById('seconds').textContent = "00:0" + num;
}
function returner(){
	window.location.href = "login.html";
}