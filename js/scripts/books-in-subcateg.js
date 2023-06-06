let booksContainer = document.querySelector('.subcategBooksContainer')
// let subcategName = document.querySelector('.subcategName')

const subcategId = location.search.split("=")[1];

let bookUI = ''

if (subcategId) {
	document.addEventListener('DOMContentLoaded', () => {
		fetch(`http://localhost:5000/get-books-by-sub/${subcategId}`).then(res => res.json()).then(data => {
			console.log(data);
			data.data.forEach(bookData => {
				let { _id, title, subcateg, authorname, img, book } = bookData
				img = img.replace('public', 'http://localhost:5000')

				// subcategName.innerHTML = subcateg

				bookUI += `
        <div class="col-xl-3 col-lg-4 col-md-4 col-12">
								<div class="single-product">
									<div class="product-img">
										<a href="book-details.html?bookId=${_id}">
											<img class="default-img" src="${img}" alt="book image">
										</a>
										<div class="button-head">
											<div class="product-action">
												<a data-toggle="modal" data-target="#exampleModal" title="More Details"
                                                href="book-details.html?bookId=${_id}"><i class="ti-eye"></i><span>More Details</span></a>
											</div>
											<div class="product-action-2">
												<a href="book-details.html?bookId=${_id}">More Details</a>
											</div>
										</div>
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


			booksContainer.innerHTML = bookUI
		});
	})
} else {
	location.href = 'index.html'
}
