// GET all bookmarked movies (most recent first)
export function getBookmarkedMovies() {
  return fetch(
    `http://localhost:3000/bookmarks?_embed=movies&_sort=datetime&_order=desc`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.filter((bookmark) => {
        return bookmark.id !== "null";
      });
    });
}

// GET all movies (alphabetical)
export function getAllMovies() {
  return fetch(
    `http://localhost:3000/movies?_expand=bookmark&_sort=title&_order=asc`
  ).then((response) => {
    return response.json();
  });
}

// GET movie info
export function getMovieInfo(movieId) {
  return fetch(`http://localhost:3000/movies/${movieId}?_expand=bookmark`).then(
    (response) => {
      return response.json();
    }
  );
}

// POST a movie
export function createMoviePost(title, genre, details, notes, user, bookmark) {
  return fetch("http://localhost:3000/movies", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      genre: genre,
      details: details,
      notes: notes,
      user: user,
      bookmarkId: "null",
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (bookmark) {
        return createBookmark(data.id, data.user, new Date().toLocaleString());
      } else {
        return data;
      }
    });
}

// PUT a movie
export function updateMoviePost(
  movieId,
  updatedTitle,
  updatedGenre,
  updatedDetails,
  updatedNotes,
  updatedUser,
  updatedBookmark,
  oldBookmarkId = "null"
) {
  return fetch(`http://localhost:3000/movies/${movieId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: updatedTitle,
      genre: updatedGenre,
      details: updatedDetails,
      notes: updatedNotes,
      user: updatedUser,
      bookmarkId: "null",
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (updatedBookmark !== "null" && oldBookmarkId !== "null") {
        return updateMovieBookmark(movieId, updatedBookmark);
      }
      if (updatedBookmark === "-1" && oldBookmarkId === "null") {
        return createBookmark(
          movieId,
          updatedUser,
          new Date().toLocaleString()
        );
      } else if (updatedBookmark === "null" && oldBookmarkId !== "null") {
        return deleteBookmark(movieId, oldBookmarkId);
      } else {
      } //updatedBookmark === "null" && oldBookmarkId === "null"
    });
}

// PATCH a movie with bookmark
function updateMovieBookmark(movieId, updatedBookmarkId) {
  return fetch(`http://localhost:3000/movies/${movieId}`, {
    method: "PATCH",
    body: JSON.stringify({
      bookmarkId: updatedBookmarkId,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// PATCH a movie to remove bookmark
function deleteMovieBookmark(movieId) {
  return fetch(`http://localhost:3000/movies/${movieId}`, {
    method: "PATCH",
    body: JSON.stringify({
      bookmarkId: "null",
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// DELETE movie post
export function deleteMoviePost(movieId) {
  return fetch(`http://localhost:3000/movies/${movieId}`, {
    method: "DELETE",
  }).then((response) => {
    return response.status;
  });
}

// POST a bookmark
export function createBookmark(movieId, user, datetime) {
  return fetch("http://localhost:3000/bookmarks", {
    method: "POST",
    body: JSON.stringify({
      user: user,
      datetime: datetime,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return updateMovieBookmark(movieId, data.id);
    });
}

// DELETE a bookmark
export function deleteBookmark(movieId, bookmarkId) {
  return deleteMovieBookmark(movieId).then((data) => {
    return fetch(`http://localhost:3000/bookmarks/${bookmarkId}`, {
      method: "DELETE",
    }).then((response) => {
      return response.status;
    });
  });
}
