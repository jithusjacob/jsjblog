let side_bar = document.querySelector('.sidebar');
let header = document.querySelector('.header');
let content = document.querySelector('.content');
let sidebar_heading = document.querySelector('.sidebar_heading');

function downLevel(item) {
	sessionStorage.setItem('lastFunction', 'downLevel');
	let itemId = item.getAttribute('data-level-id');
	let itemClass = item.getAttribute('data-level-class');
	sessionStorage.setItem('itemId', itemId);
	sessionStorage.setItem('itemClass', itemClass);
	const currentItems = document.querySelectorAll('.' + itemClass);
	currentItems.forEach((e) => {
		e.style.display = 'none';
	});
	const nextLevelItems = document.querySelectorAll('#' + itemId);
	nextLevelItems.forEach((e) => {
		e.style.display = 'block';
	});

	sidebar_heading.innerHTML = item.innerHTML;
	sessionStorage.setItem('innerHTML', item.innerHTML);
}

function upLevel(item) {
	sessionStorage.setItem('lastFunction', 'upLevel');
	console.log('uplevel');
	console.log(item);
	let itemParentClass = item.getAttribute('data-parent-class');
	let itemClass = item.getAttribute('data-level-class');
	sessionStorage.setItem('itemParentClass', itemParentClass);
	sessionStorage.setItem('itemClass', itemClass);
	const currentItems = document.querySelectorAll('.' + itemClass);
	currentItems.forEach((e) => {
		e.style.display = 'none';
	});
	const nextLevelItems = document.querySelectorAll('.' + itemParentClass);
	nextLevelItems.forEach((e) => {
		e.style.display = 'block';
	});
	sidebar_heading.innerHTML = 'Note Books';
}

function upLevel2(item) {
	sessionStorage.setItem('lastFunction', 'upLevel2');
	let itemParentId = item.getAttribute('data-parent-id');
	let itemClass = item.getAttribute('data-level-class');
	sessionStorage.setItem('itemParentId', itemParentId);
	sessionStorage.setItem('itemClass', itemClass);
	let sidebar_heading_selector = '[data-level-id =' + itemParentId + ']';

	const currentItems = document.querySelectorAll('.' + itemClass);
	currentItems.forEach((e) => {
		e.style.display = 'none';
	});
	const nextLevelItems = document.querySelectorAll('#' + itemParentId);
	nextLevelItems.forEach((e) => {
		e.style.display = 'block';
	});
	sidebar_heading.innerHTML = document.querySelector(sidebar_heading_selector).innerHTML;
	sessionStorage.setItem('innerHTML', sidebar_heading.innerHTML);
}

function toggleSideBar(item) {
	item.classList.toggle('active');

	if (side_bar.style.display == 'block') {
		side_bar.style.display = 'none';
		content.style.display = 'block';
		header.style.display = 'block';
	} else {
		side_bar.style.display = 'block';
		content.style.display = 'none';
		header.style.display = 'none';
	}
}

console.log(sessionStorage.getItem('lastFunction'));
if (sessionStorage.getItem('lastFunction') == 'downLevel') {
	let itemId = sessionStorage.getItem('itemId');
	let itemClass = sessionStorage.getItem('itemClass');
	const currentItems = document.querySelectorAll('.' + itemClass);
	currentItems.forEach((e) => {
		e.style.display = 'none';
	});
	const nextLevelItems = document.querySelectorAll('#' + itemId);
	nextLevelItems.forEach((e) => {
		e.style.display = 'block';
	});

	const bookItems = document.querySelectorAll('.books');
	bookItems.forEach((e) => {
		e.style.display = 'none';
	});
	sidebar_heading.innerHTML = sessionStorage.getItem('innerHTML');
}
if (sessionStorage.getItem('lastFunction') == 'upLevel') {
	sessionStorage.setItem('lastFunction', 'upLevel');
	let itemParentClass = sessionStorage.getItem('itemParentClass');
	let itemClass = sessionStorage.getItem('itemClass');
	const currentItems = document.querySelectorAll('.' + itemClass);
	currentItems.forEach((e) => {
		e.style.display = 'none';
	});
	const nextLevelItems = document.querySelectorAll('.' + itemParentClass);
	nextLevelItems.forEach((e) => {
		e.style.display = 'block';
	});
	sidebar_heading.innerHTML = 'Note Books';
}

if (sessionStorage.getItem('lastFunction') == 'upLevel2') {
	sessionStorage.setItem('lastFunction', 'upLevel2');
	let itemParentId = sessionStorage.getItem('itemParentId');
	let itemClass = sessionStorage.getItem('itemClass');
	sessionStorage.setItem('itemParentId', itemParentId);
	sessionStorage.setItem('itemClass', itemClass);
	let sidebar_heading_selector = '[data-level-id =' + itemParentId + ']';

	const currentItems = document.querySelectorAll('.' + itemClass);
	currentItems.forEach((e) => {
		e.style.display = 'none';
	});
	const nextLevelItems = document.querySelectorAll('#' + itemParentId);
	nextLevelItems.forEach((e) => {
		e.style.display = 'block';
	});
	const bookItems = document.querySelectorAll('.books');
	bookItems.forEach((e) => {
		e.style.display = 'none';
	});

	sidebar_heading.innerHTML = sessionStorage.getItem('innerHTML');
}
