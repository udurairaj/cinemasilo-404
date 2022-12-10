import { render, fireEvent } from "@testing-library/react";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Bookmarkable from "../reusable/Bookmark";

test("reusable component used for rendering movie with bookmark", () => {
  const bookmark = {
    id: "0",
    user: "Uma",
    datetime: "12/9/2022, 10:03:17 AM",
  };
  const movie = {
    title: "13 Going on 30",
    genre: "Romantic Comedy",
    details:
      "A girl who is sick of the social strictures of junior high is transformed into a grownup overnight. In this feel-good fairy tale, teenager Jenna (Christa B. Allen) wants a boyfriend, and when she's unable to find one, she fantasizes about being a well-adjusted adult. Suddenly, her secret desire becomes a reality, and she is transformed into a 30-year-old (Jennifer Garner). But adulthood, with its own set of male-female challenges, isn't as easy as it looks.",
    notes:
      "Classic 2000s era movie, Jennifer Garner! Should watch soon. My mom loves this movie so much and I want to know why.",
    user: "Uma",
    bookmarkId: "0",
    id: "1",
  };
  const { getAllByTestId } = render(
    <div key={bookmark.id} className="col-lg-4 col-md-6 col-sm-12">
      <Bookmarkable
        movieId={movie.id}
        title={movie.title}
        genre={movie.genre}
        userAdded={`Added by: ${movie.user}`}
        bookmarkUser={
          bookmark.id !== "null" ? `Bookmarked by: ${bookmark.user}` : "null"
        }
        bookmarkDatetime={
          bookmark.id !== "null" ? `at ${bookmark.datetime}` : "null"
        }
        notes={movie.notes}
        type="test"
      >
        {() => {
          return (
            <button
              type="button"
              className="bookmark-btn btn btn-link"
              id={bookmark.id}
              value={movie.id}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                color={bookmark.id !== "null" ? "#5668a6" : "#dddddd"}
                data-testid={
                  bookmark.id !== "null" ? "bookmarked" : "not-bookmarked"
                }
                size="3x"
              />
            </button>
          );
        }}
      </Bookmarkable>
    </div>
  );
  expect(getAllByTestId("bookmarked").length).toBe(1);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.title);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.genre);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.notes);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.user);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(
    bookmark.user
  );
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(
    bookmark.datetime
  );
});

test("reusable component used for rendering movie without bookmark", () => {
  const bookmark = {
    id: "null",
    user: "None",
    datetime: "00/00/0000, 00:00:00 XX",
  };
  const movie = {
    title: "13 Going on 30",
    genre: "Romantic Comedy",
    details:
      "A girl who is sick of the social strictures of junior high is transformed into a grownup overnight. In this feel-good fairy tale, teenager Jenna (Christa B. Allen) wants a boyfriend, and when she's unable to find one, she fantasizes about being a well-adjusted adult. Suddenly, her secret desire becomes a reality, and she is transformed into a 30-year-old (Jennifer Garner). But adulthood, with its own set of male-female challenges, isn't as easy as it looks.",
    notes:
      "Classic 2000s era movie, Jennifer Garner! Should watch soon. My mom loves this movie so much and I want to know why.",
    user: "Uma",
    bookmarkId: "null",
    id: "1",
  };
  const { getAllByTestId } = render(
    <div key={bookmark.id} className="col-lg-4 col-md-6 col-sm-12">
      <Bookmarkable
        movieId={movie.id}
        title={movie.title}
        genre={movie.genre}
        userAdded={`Added by: ${movie.user}`}
        bookmarkUser={
          bookmark.id !== "null" ? `Bookmarked by: ${bookmark.user}` : "null"
        }
        bookmarkDatetime={
          bookmark.id !== "null" ? `at ${bookmark.datetime}` : "null"
        }
        notes={movie.notes}
        type="test"
      >
        {() => {
          return (
            <button
              type="button"
              className="bookmark-btn btn btn-link"
              id={bookmark.id}
              value={movie.id}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                color={bookmark.id !== "null" ? "#5668a6" : "#dddddd"}
                data-testid={
                  bookmark.id !== "null" ? "bookmarked" : "not-bookmarked"
                }
                size="3x"
              />
            </button>
          );
        }}
      </Bookmarkable>
    </div>
  );
  expect(getAllByTestId("not-bookmarked").length).toBe(1);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.title);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.genre);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.notes);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.user);
  expect(getAllByTestId("bookmarkable")[0].textContent).not.toContain(
    bookmark.user
  );
  expect(getAllByTestId("bookmarkable")[0].textContent).not.toContain(
    bookmark.datetime
  );
});

test("click to add movie bookmark", () => {
  const onClick = jest.fn();
  const bookmarkNull = {
    id: "null",
    user: "None",
    datetime: "00/00/0000, 00:00:00 XX",
  };
  const bookmarkValid = {
    id: "0",
    user: "Uma",
    datetime: "12/9/2022, 10:03:17 AM",
  };
  const movie = {
    title: "13 Going on 30",
    genre: "Romantic Comedy",
    details:
      "A girl who is sick of the social strictures of junior high is transformed into a grownup overnight. In this feel-good fairy tale, teenager Jenna (Christa B. Allen) wants a boyfriend, and when she's unable to find one, she fantasizes about being a well-adjusted adult. Suddenly, her secret desire becomes a reality, and she is transformed into a 30-year-old (Jennifer Garner). But adulthood, with its own set of male-female challenges, isn't as easy as it looks.",
    notes:
      "Classic 2000s era movie, Jennifer Garner! Should watch soon. My mom loves this movie so much and I want to know why.",
    user: "Uma",
    bookmarkId: "null",
    id: "1",
  };
  let bookmark = bookmarkNull;
  const { getAllByTestId } = render(
    <div key={bookmark.id} className="col-lg-4 col-md-6 col-sm-12">
      <Bookmarkable
        movieId={movie.id}
        title={movie.title}
        genre={movie.genre}
        userAdded={`Added by: ${movie.user}`}
        bookmarkUser={
          bookmark.id !== "null" ? `Bookmarked by: ${bookmark.user}` : "null"
        }
        bookmarkDatetime={
          bookmark.id !== "null" ? `at ${bookmark.datetime}` : "null"
        }
        notes={movie.notes}
        type="test"
      >
        {() => {
          return (
            <button
              type="button"
              data-testid="bookmark-button"
              className="bookmark-btn btn btn-link"
              id={bookmark.id}
              value={movie.id}
              onClick={() => {
                if (movie.bookmarkId !== "null") {
                  onClick(bookmarkNull);
                } else {
                  onClick(bookmarkValid);
                }
              }}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                color={bookmark.id !== "null" ? "#5668a6" : "#dddddd"}
                data-testid={
                  bookmark.id !== "null" ? "bookmarked" : "not-bookmarked"
                }
                size="3x"
              />
            </button>
          );
        }}
      </Bookmarkable>
    </div>
  );

  // before bookmarking
  expect(getAllByTestId("not-bookmarked").length).toBe(1);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.title);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.genre);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.notes);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.user);
  expect(getAllByTestId("bookmarkable")[0].textContent).not.toContain(
    bookmark.user
  );
  expect(getAllByTestId("bookmarkable")[0].textContent).not.toContain(
    bookmark.datetime
  );

  // adding bookmark
  const bookmarkbtn = getAllByTestId("bookmark-button")[0];
  fireEvent.click(bookmarkbtn);
  expect(onClick).toHaveBeenCalledWith(bookmarkValid);
});

test("click to remove movie bookmark", () => {
  const onClick = jest.fn();
  const bookmarkNull = {
    id: "null",
    user: "None",
    datetime: "00/00/0000, 00:00:00 XX",
  };
  const bookmarkValid = {
    id: "0",
    user: "Uma",
    datetime: "12/9/2022, 10:03:17 AM",
  };
  const movie = {
    title: "13 Going on 30",
    genre: "Romantic Comedy",
    details:
      "A girl who is sick of the social strictures of junior high is transformed into a grownup overnight. In this feel-good fairy tale, teenager Jenna (Christa B. Allen) wants a boyfriend, and when she's unable to find one, she fantasizes about being a well-adjusted adult. Suddenly, her secret desire becomes a reality, and she is transformed into a 30-year-old (Jennifer Garner). But adulthood, with its own set of male-female challenges, isn't as easy as it looks.",
    notes:
      "Classic 2000s era movie, Jennifer Garner! Should watch soon. My mom loves this movie so much and I want to know why.",
    user: "Uma",
    bookmarkId: "0",
    id: "1",
  };
  let bookmark = bookmarkValid;
  const { getAllByTestId } = render(
    <div key={bookmark.id} className="col-lg-4 col-md-6 col-sm-12">
      <Bookmarkable
        movieId={movie.id}
        title={movie.title}
        genre={movie.genre}
        userAdded={`Added by: ${movie.user}`}
        bookmarkUser={
          bookmark.id !== "null" ? `Bookmarked by: ${bookmark.user}` : "null"
        }
        bookmarkDatetime={
          bookmark.id !== "null" ? `at ${bookmark.datetime}` : "null"
        }
        notes={movie.notes}
        type="test"
      >
        {() => {
          return (
            <button
              type="button"
              data-testid="bookmark-button"
              className="bookmark-btn btn btn-link"
              id={bookmark.id}
              value={movie.id}
              onClick={() => {
                if (movie.bookmarkId !== "null") {
                  onClick(bookmarkNull);
                } else {
                  onClick(bookmarkValid);
                }
              }}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                color={bookmark.id !== "null" ? "#5668a6" : "#dddddd"}
                data-testid={
                  bookmark.id !== "null" ? "bookmarked" : "not-bookmarked"
                }
                size="3x"
              />
            </button>
          );
        }}
      </Bookmarkable>
    </div>
  );

  // before bookmarking
  expect(getAllByTestId("bookmarked").length).toBe(1);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.title);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.genre);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.notes);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.user);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(
    bookmark.user
  );
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(
    bookmark.datetime
  );

  // removing bookmark
  const bookmarkbtn = getAllByTestId("bookmark-button")[0];
  fireEvent.click(bookmarkbtn);
  expect(onClick).toHaveBeenCalledWith(bookmarkNull);
});

test("reusable component used for viewing movie details", () => {
  const bookmark = {
    id: "0",
    user: "Uma",
    datetime: "12/9/2022, 10:03:17 AM",
  };
  const movie = {
    title: "13 Going on 30",
    genre: "Romantic Comedy",
    details:
      "A girl who is sick of the social strictures of junior high is transformed into a grownup overnight. In this feel-good fairy tale, teenager Jenna (Christa B. Allen) wants a boyfriend, and when she's unable to find one, she fantasizes about being a well-adjusted adult. Suddenly, her secret desire becomes a reality, and she is transformed into a 30-year-old (Jennifer Garner). But adulthood, with its own set of male-female challenges, isn't as easy as it looks.",
    notes:
      "Classic 2000s era movie, Jennifer Garner! Should watch soon. My mom loves this movie so much and I want to know why.",
    user: "Uma",
    bookmarkId: "0",
    id: "1",
  };
  const { getAllByTestId } = render(
    <div key={bookmark.id} className="col-lg-4 col-md-6 col-sm-12">
      <Bookmarkable
        movieId={movie.id}
        title={movie.title}
        genre={movie.genre}
        details={movie.details}
        userAdded={`Added by: ${movie.user}`}
        bookmarkUser={
          bookmark.id !== "null" ? `Bookmarked by: ${bookmark.user}` : "null"
        }
        bookmarkDatetime={
          bookmark.id !== "null" ? `at ${bookmark.datetime}` : "null"
        }
        notes={movie.notes}
        type="test"
      >
        {() => {
          return (
            <button
              type="button"
              data-testid="bookmark-button"
              className="bookmark-btn btn btn-link"
              id={bookmark.id}
              value={movie.id}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                color={bookmark.id !== "null" ? "#5668a6" : "#dddddd"}
                data-testid={
                  bookmark.id !== "null" ? "bookmarked" : "not-bookmarked"
                }
                size="3x"
              />
            </button>
          );
        }}
      </Bookmarkable>
    </div>
  );

  expect(getAllByTestId("bookmarked").length).toBe(1);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.title);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.genre);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.notes);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(
    movie.details
  );
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.user);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(
    bookmark.user
  );
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(
    bookmark.datetime
  );
});

test("removing bookmark while viewing movie details of bookmarked movie", () => {
  const onClick = jest.fn();
  const bookmarkNull = {
    id: "null",
    user: "None",
    datetime: "00/00/0000, 00:00:00 XX",
  };
  const bookmarkValid = {
    id: "0",
    user: "Uma",
    datetime: "12/9/2022, 10:03:17 AM",
  };
  const movie = {
    title: "13 Going on 30",
    genre: "Romantic Comedy",
    details:
      "A girl who is sick of the social strictures of junior high is transformed into a grownup overnight. In this feel-good fairy tale, teenager Jenna (Christa B. Allen) wants a boyfriend, and when she's unable to find one, she fantasizes about being a well-adjusted adult. Suddenly, her secret desire becomes a reality, and she is transformed into a 30-year-old (Jennifer Garner). But adulthood, with its own set of male-female challenges, isn't as easy as it looks.",
    notes:
      "Classic 2000s era movie, Jennifer Garner! Should watch soon. My mom loves this movie so much and I want to know why.",
    user: "Uma",
    bookmarkId: "0",
    id: "1",
  };
  let bookmark = bookmarkValid;
  const { getAllByTestId } = render(
    <div key={bookmark.id} className="col-lg-4 col-md-6 col-sm-12">
      <Bookmarkable
        movieId={movie.id}
        title={movie.title}
        genre={movie.genre}
        details={movie.details}
        userAdded={`Added by: ${movie.user}`}
        bookmarkUser={
          bookmark.id !== "null" ? `Bookmarked by: ${bookmark.user}` : "null"
        }
        bookmarkDatetime={
          bookmark.id !== "null" ? `at ${bookmark.datetime}` : "null"
        }
        notes={movie.notes}
        type="test"
      >
        {() => {
          return (
            <button
              type="button"
              data-testid="bookmark-button"
              className="bookmark-btn btn btn-link"
              id={bookmark.id}
              value={movie.id}
              onClick={() => {
                if (movie.bookmarkId !== "null") {
                  onClick(bookmarkNull);
                } else {
                  onClick(bookmarkValid);
                }
              }}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                color={bookmark.id !== "null" ? "#5668a6" : "#dddddd"}
                data-testid={
                  bookmark.id !== "null" ? "bookmarked" : "not-bookmarked"
                }
                size="3x"
              />
            </button>
          );
        }}
      </Bookmarkable>
    </div>
  );
  // before bookmarking
  expect(getAllByTestId("bookmarked").length).toBe(1);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.title);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.genre);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.notes);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(
    movie.details
  );
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.user);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(
    bookmark.user
  );
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(
    bookmark.datetime
  );

  // removing bookmark
  const bookmarkbtn = getAllByTestId("bookmark-button")[0];
  fireEvent.click(bookmarkbtn);
  expect(onClick).toHaveBeenCalledWith(bookmarkNull);
});

test("adding bookmark while viewing movie details of not bookmarked movie", () => {
  const onClick = jest.fn();
  const bookmarkNull = {
    id: "null",
    user: "None",
    datetime: "00/00/0000, 00:00:00 XX",
  };
  const bookmarkValid = {
    id: "0",
    user: "Uma",
    datetime: "12/9/2022, 10:03:17 AM",
  };
  const movie = {
    title: "13 Going on 30",
    genre: "Romantic Comedy",
    details:
      "A girl who is sick of the social strictures of junior high is transformed into a grownup overnight. In this feel-good fairy tale, teenager Jenna (Christa B. Allen) wants a boyfriend, and when she's unable to find one, she fantasizes about being a well-adjusted adult. Suddenly, her secret desire becomes a reality, and she is transformed into a 30-year-old (Jennifer Garner). But adulthood, with its own set of male-female challenges, isn't as easy as it looks.",
    notes:
      "Classic 2000s era movie, Jennifer Garner! Should watch soon. My mom loves this movie so much and I want to know why.",
    user: "Uma",
    bookmarkId: "null",
    id: "1",
  };
  let bookmark = bookmarkNull;
  const { getAllByTestId } = render(
    <div key={bookmark.id} className="col-lg-4 col-md-6 col-sm-12">
      <Bookmarkable
        movieId={movie.id}
        title={movie.title}
        genre={movie.genre}
        details={movie.details}
        userAdded={`Added by: ${movie.user}`}
        bookmarkUser={
          bookmark.id !== "null" ? `Bookmarked by: ${bookmark.user}` : "null"
        }
        bookmarkDatetime={
          bookmark.id !== "null" ? `at ${bookmark.datetime}` : "null"
        }
        notes={movie.notes}
        type="test"
      >
        {() => {
          return (
            <button
              type="button"
              data-testid="bookmark-button"
              className="bookmark-btn btn btn-link"
              id={bookmark.id}
              value={movie.id}
              onClick={() => {
                if (movie.bookmarkId !== "null") {
                  onClick(bookmarkNull);
                } else {
                  onClick(bookmarkValid);
                }
              }}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                color={bookmark.id !== "null" ? "#5668a6" : "#dddddd"}
                data-testid={
                  bookmark.id !== "null" ? "bookmarked" : "not-bookmarked"
                }
                size="3x"
              />
            </button>
          );
        }}
      </Bookmarkable>
    </div>
  );
  // before bookmarking
  expect(getAllByTestId("not-bookmarked").length).toBe(1);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.title);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.genre);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.notes);
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(
    movie.details
  );
  expect(getAllByTestId("bookmarkable")[0].textContent).toContain(movie.user);
  expect(getAllByTestId("bookmarkable")[0].textContent).not.toContain(
    bookmark.user
  );
  expect(getAllByTestId("bookmarkable")[0].textContent).not.toContain(
    bookmark.datetime
  );

  // removing bookmark
  const bookmarkbtn = getAllByTestId("bookmark-button")[0];
  fireEvent.click(bookmarkbtn);
  expect(onClick).toHaveBeenCalledWith(bookmarkValid);
});
