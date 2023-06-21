import { search } from "./search.js"

const tabs = document.getElementById('myTab')

let allBooksContainer = document.querySelector('#all-books .row')
let famousTodayContainer = document.querySelector('#day-famous-books .row')

let searchInp = document.querySelector('#searchInp')

let bookUI = ''
let routeName = ''

document.addEventListener('DOMContentLoaded', () => {
	fetch(`http://localhost:5000/all-books`).then(res => res.json()).then(data => {
		bookUI = ''

		data.data.forEach(bookData => {
			let { _id, title, subcateg, authorname, img, book } = bookData
			img = img.replace('public', 'http://localhost:5000')

			bookUI += `
					<div class="col-xl-3 col-lg-4 col-md-4 col-12 book-item">
											<div class="single-product">
												<div class="product-img">
													<a href="book-details.html?bookId=${_id}">
														<img class="default-img" src="${img}" alt="book image" loading="lazy">
													</a>
												</div>
												<div class="product-content text-center">
													<h3><a href="book-details.html?bookId=${_id}">${title}</a></h3>
													<div class="product-price">
														<span>${authorname}</span>
													</div>
												</div>
											</div>
										</div>`
		})

		allBooksContainer.innerHTML = bookUI

		/** search */
		searchInp.addEventListener('input', search(data.data, allBooksContainer))
	});

	fetch(`http://localhost:5000/day-famous-books`).then(res => res.json()).then(data => {
		bookUI = ''
		let allBooks = []
		data.data.forEach(bookData => {
			allBooks.push(bookData.book)
			let { _id, title, subcateg, authorname, img, book } = bookData.book
			img = img.replace('public', 'http://localhost:5000')

			bookUI += `
					<div class="col-xl-3 col-lg-4 col-md-4 col-12 book-item">
											<div class="single-product">
												<div class="product-img">
													<a href="book-details.html?bookId=${_id}">
														<img class="default-img" src="${img}" alt="book image" loading="lazy">
													</a>
												</div>
												<div class="product-content text-center">
													<h3><a href="book-details.html?bookId=${_id}">${title}</a></h3>
													<div class="product-price">
														<span>${authorname}</span>
													</div>
												</div>
											</div>
										</div>`
		})

		famousTodayContainer.innerHTML = bookUI

		/** search */
		searchInp.addEventListener('input', search(allBooks, famousTodayContainer))
	});
})

// !!! It doesn't work. I have to double click to trigger it.
// tabs.addEventListener('click', e => {
// 	if (e.target.matches('.active') || e.target.parentElement.matches('.active')) {
// 		console.log('yes')
// 		// if (tab.classList.contains('active')) {
// 		routeName = e.target.href.split('#')[1]
// 		console.log(routeName)
// 		booksContainer = document.querySelector(`#${routeName} .row`)

// 		if (routeName == 'all-books') {
// 			bookUI = ''

// 			fetch(`http://localhost:5000/${routeName}`).then(res => res.json()).then(data => {
// 				data.data.forEach(bookData => {
// 					let { _id, title, subcateg, authorname, img, book } = bookData
// 					img = img.replace('public', 'http://localhost:5000')

// 					bookUI += `
// 							<div class="col-xl-3 col-lg-4 col-md-4 col-12">
// 													<div class="single-product">
// 														<div class="product-img">
// 															<a href="book-details.html?bookId=${_id}">
// 																<img class="default-img" src="${img}" alt="book image" loading="lazy">
// 															</a>
// 														</div>
// 														<div class="product-content text-center">
// 															<h3><a href="book-details.html?bookId=${_id}">${title}</a></h3>
// 															<div class="product-price">
// 																<span>${authorname}</span>
// 															</div>
// 														</div>
// 													</div>
// 												</div>`
// 				})


// 				booksContainer.innerHTML = bookUI
// 			});
// 		} else {
// 			bookUI = ''

// 			fetch(`http://localhost:5000/${routeName}`).then(res => res.json()).then(data => {
// 				data.data.forEach(bookData => {
// 					let { _id, title, subcateg, authorname, img, book } = bookData.book
// 					img = img.replace('public', 'http://localhost:5000')

// 					bookUI += `
// 							<div class="col-xl-3 col-lg-4 col-md-4 col-12">
// 													<div class="single-product">
// 														<div class="product-img">
// 															<a href="book-details.html?bookId=${_id}">
// 																<img class="default-img" src="${img}" alt="book image" loading="lazy">
// 															</a>
// 														</div>
// 														<div class="product-content text-center">
// 															<h3><a href="book-details.html?bookId=${_id}">${title}</a></h3>
// 															<div class="product-price">
// 																<span>${authorname}</span>
// 															</div>
// 														</div>
// 													</div>
// 												</div>`
// 				})

// 				booksContainer.innerHTML = bookUI
// 			});
// 		}
// 	}
// })