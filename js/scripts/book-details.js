let bookContainer = document.querySelector('.book-details')

let bookImg = document.querySelector('.blog-single-main .image')

let downloadBook = document.querySelector('.downloadBook')
let readBook = document.querySelector('.readBook')

const selectedBookId = location.search.split("=")[1];

fetch(`http://localhost:5000/get-book-by-id/${selectedBookId}`).then(res => res.json()).then(data => {
    let { _id, title, description, subcateg, authorname, releasedate, img, book } = data.data
    img = img.replace('public', 'http://localhost:5000')
    book = book.replace('public', 'http://localhost:5000')

    bookContainer.innerHTML = `
    <div class="blog-detail">
							<h2 class="blog-title">${title}</h2>
							<div class="blog-meta">
								<span class="author">
                                <a href="#">${releasedate}<i class="fa fa-calendar"></i></a>
                                <a href="#">${authorname}<i class="fa fa-user"></i></a>
                                <!-- <a href="#"><i class="fa fa-comments"></i>Comment (15)</a></span> -->
							</div>
							<div class="content">
								<h6 class="sub-title">نبذة عن الكتاب</h6>
								<p>${description}</p>
								<!-- <h6 class="sub-title">نبذة عن المؤلف</h6>
								<blockquote> <i class="fa fa-quote-left"></i> 
                                
								</blockquote>
                                -->
							</div>
						</div>
    `

    bookImg.innerHTML = `<img src="${img}" alt="#">`

    downloadBook.innerHTML = `
                            <div class="image">
                                <a href="${book}" download target="_black">
                                <i class="fa-solid fa-download"></i>
                                </a>
                            </div>
                            <div class="content">
                                <h5 class="">
                                    <a href="${book}" download target="_black">تحميل الكتاب</a>
                                </h5>
                            </div>`

    readBook.innerHTML = `
                        <div class="image">
                            <a href="${book}" download target="_black">
                            <i class="fa-solid fa-eye"></i>
                            </a>
                        </div>
                        <div class="content">
                            <h5 class="">
                                <a href="${book}" download target="_black">قراءة الكتاب</a>
                            </h5>
                        </div>`
});
