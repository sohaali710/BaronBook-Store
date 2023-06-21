function search(allBooks, allBooksContainer) {
    return (e) => {
        const val = e.target.value;
        let element = '';

        let noBooksDiv = allBooksContainer.parentElement.querySelector('.search-no-books')

        let elementVisibility = allBooks.map((book, index) => {
            console.log(book.title)
            element = allBooksContainer.querySelectorAll('.book-item')[index]

            const isVisible = book.title.includes(val)
            element ? element.classList.toggle('hide', !isVisible) : null;

            return isVisible;
        })

        let allInvisible = elementVisibility.every(ele => !ele)

        if (allInvisible) {
            noBooksDiv.classList.remove('hide')
        } else {
            noBooksDiv.classList.add('hide')
        }
    }
}

export { search }