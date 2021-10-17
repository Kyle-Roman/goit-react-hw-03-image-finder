function fetchImages(searchResult, page) {
  return fetch(`https://pixabay.com/api/?q=${searchResult}&page=${page}&key=22969776-9de8346515d89d44141e5bd5e&image_type=photo&orientation=horizontal&per_page=12`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error("Server collapse..."));
      })
}

const imageSet = { fetchImages };

export default imageSet;