
// show/hide the a11ycss palette
function showHideA11ycss() {
	showHide('home');
	showHide('allycss');
}

document.getElementById('btnAllycss').addEventListener('click', showHideA11ycss);
document.getElementById('btnA11ycssBack').addEventListener('click', showHideA11ycss);
