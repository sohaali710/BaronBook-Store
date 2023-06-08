// in accordion [admin (show categories and its subcategories)]
import { getCookie } from "../../js/scripts/cookies.js"


function getCategoriesAccordion(container) {
  let categoriesDiv = ''
  fetch('http://localhost:5000/all-main-categs').then(res => res.json()).then(data => {
    data.data.forEach(categ => {
      const { _id: categId, name: categName } = categ
      let subcategLis = ''

      fetch(`http://localhost:5000/get-subs-by-main/${categId}`).then(res => res.json()).then(data => {
        const subcategArr = data.data

        if (subcategArr.length) {
          subcategArr.forEach(subcateg => {
            const { _id: subcategId, name: subName } = subcateg

            subcategLis += `
                      <li class="subItem">
                        ${subName}
                        <i class="fa-solid fa-pen-to-square" subId="${subcategId}" data-bs-toggle="modal" data-bs-target="#exampleModal1"></i>
                        <i class="fa-solid fa-xmark" subId="${subcategId}"></i>
                      </li>`

          })

          categoriesDiv += `
          <div class="accordion-item">
            <h2 class="accordion-header" id="${categName}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#header${categName}" aria-expanded="false" aria-controls="header${categName}">
              ${categName}
              <!--Button trigger modal[edit categ]-->
                <i class="fa-solid fa-pen-to-square" mainId="${categId}" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                <i class="fa-solid fa-xmark" mainId="${categId}"></i>
              </button>
            </h2 >
            <div id="header${categName}" class="accordion-collapse collapse" aria-labelledby="${categName}" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <ul>`
            + subcategLis +
            `</ul>
              </div>
            </div>
          </div >`
        } else {
          categoriesDiv += `
                        <div class="panel box box-primary">
                          <div class="box-header with-border">
                            <h4 class="box-title">
                              <a data-toggle="collapse" data-parent="#accordion" href="#${categName}">
                                ${categName}
                              </a>
                            </h4>
                            <i class="fa-solid fa-xmark" mainId="${categId}"></i>
                              <i class="fa-solid fa-pen-to-square" mainId="${categId}"></i>
                          </div>
                          <div id="${categName}" class="panel-collapse collapse">
                            <div class="box-body">
                              <p class="text-center">There is no subcategories here</p>
                            </div>
                          </div>
                        </div> `
        }

        container.innerHTML = categoriesDiv
      })

    })
  })
}

export { getCategoriesAccordion }