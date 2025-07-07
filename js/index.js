var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')
var submitBtn = document.getElementById('submitBtn')

var bookmarks = []

if (localStorage.getItem('info') !== null) {
  bookmarks = JSON.parse(localStorage.getItem('info'))
  display()
}

function addinfo() {
  if (validationForm(siteName) && validationForm(siteUrl)) {
    info = {
      name: siteName.value,
      url: siteUrl.value
    }

    bookmarks.push(info)
    localStorage.setItem('info', JSON.stringify(bookmarks))
    clear()
    display()
    submitBtn.nextElementSibling.classList.add('d-none')
  }
  else {
    submitBtn.nextElementSibling.classList.remove('d-none')
  }
}

function clear() {
  siteName.value = null
  siteUrl.value = null
  siteName.classList.remove('is-valid')
  siteUrl.classList.remove('is-valid')
}

function display() {
  var newBookmark = '';
  for (var i = 0; i < bookmarks.length; i++) {

    newBookmark += `
              <tr>
                <td>${i + 1}</td>
                <td>${bookmarks[i].name}</td>              
                <td>
                  <button onclick='visitbookmark(${i})' class="btn btn-warning" data-index="${i}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-danger pe-2" data-index="${i}" onclick='deletbookmark(${i})'>
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  }
  document.getElementById('tableContent').innerHTML = newBookmark
}

function deletbookmark(index) {
  bookmarks.splice(index, 1)
  localStorage.setItem('info', JSON.stringify(bookmarks))
  display()
}

function visitbookmark(index) {
  window.open(bookmarks[index].url, '_blank')
}

function validationForm(ele) {

  var regex = {
    siteName: /^[A-Z][a-zA-Z]{3,20}$/,
    siteUrl: /^https:\/\/(www|web)\..{1,}\.com/
  }

  if (regex[ele.id].test(ele.value)) {

    ele.classList.add("is-valid")
    ele.classList.remove("is-invalid")
    return true

  }
  else {
    ele.classList.remove("is-valid")
    ele.classList.add("is-invalid")
    return false

  }

}