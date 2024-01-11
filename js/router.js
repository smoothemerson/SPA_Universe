export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes["error"];
    const appElement = document.querySelector("#app");
    const addCss = pathname === "/" ? "" : pathname.replace("/", "");
    const currentPage = document.querySelector(".current-page");
    const addLightToA = document.querySelector(`a[href="${pathname}"]`);

    appElement.classList = "";

    if (addCss) {
      appElement.classList.add(addCss);
    }

    if (currentPage) {
      currentPage.classList.remove("current-page");
    }

    if (addLightToA) {
      addLightToA.classList.add("current-page");
    }

    if (route === "/pages/404.html") {
      appElement.classList.add("error");
    }

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });
  }
}
