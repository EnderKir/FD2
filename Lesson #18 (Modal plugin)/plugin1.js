var Module = (function() {
  let links = document.getElementsByTagName("a");
  let container = document.getElementById("container");
  //MODULE
  var modal = {
    changeView: function(elem, flag) {
      if (flag) {
        view.openModal(elem);
      } else {
        view.closeModal(elem);
      }
    },
    updateModal: function(modal, content, title, titleText, contentText) {
      modal.title = titleText;
      title.innerHTML = titleText;
      content.innerHTML = contentText;
      view.openModal(modal);
    },
    createModal: function(id, title, content) {
      view.drawModal(id, title, content);
    }
  };
  //VIEW
  var view = {
    openModal: function(div) {
      div.classList.remove("modal_closed");
      document.getElementById('modal-overlay').classList.remove('modal_closed');
    },
    closeModal: function(div) {
      div.classList.add("modal_closed");
      document.getElementById('modal-overlay').classList.add('modal_closed');
    },
    drawModal: function(id, title, content) {
      let modalWindow = document.createElement("div");
      modalWindow.id = id;
      let close = document.createElement('a');
      close.addEventListener('click', function() {
        view.closeModal(modalWindow)
      })
      close.href = '#';
      close.classList.add('modal__close');
      let header = document.createElement('header');
      header.classList.add('modal__header');
      modalWindow.classList.add("modal");
      modalWindow.classList.add('modal_closed');
      modalWindow.title = title;
      let text = document.createElement("h2");
      text.innerHTML = `${title} <br> ${content}`;
      header.appendChild(text);
      header.appendChild(close);
      modalWindow.appendChild(header);
      container.appendChild(modalWindow);
      this.openModal(modalWindow);
    }
  };
  //CONTROLLER
  var controller = {
    initModal: function() {
      let div = document.getElementById(this.dataset.supermodal);
      let close = div.querySelector(".modal__close");
      let cancel = div.querySelector(".modal__cancel");
      close.addEventListener("click", function() {
        modal.changeView(div, false);
      });
      cancel.addEventListener("click", function() {
        modal.changeView(div, false);
      });
      modal.changeView(div, true);
    },
    initMyModal: function() {
      let myModal = document.getElementById("myModal");
      let content = myModal.querySelector("#content");
      let myTitle = this.getAttribute("data-supermodal-title");
      let title = myModal.querySelector('#title');
      let myContent = this.getAttribute("data-supermodal-content");
      let close = myModal.querySelector(".modal__close");
      close.addEventListener("click", function() {
        modal.changeView(myModal, false);
      });
      modal.updateModal(myModal, content, title, myTitle, myContent);
    },
    initAutoModal: function() {
      let id = this.dataset.supermodal;
      let title = this.getAttribute("data-supermodal-title");
      let content = this.getAttribute("data-supermodal-content");
      if (document.getElementById(id)) {
        modal.changeView(document.getElementById(id), true);
      } else {
        modal.createModal(id, title, content);
      }
    }
  };
  for (var i = 0; i < links.length; i++) {
    if (
      links[i].getAttribute("data-supermodal-title") != undefined &&
      links[i].getAttribute("data-supermodal-content") != undefined &&
      links[i].dataset.supermodal != undefined
    ) {
      links[i].addEventListener("click", controller.initAutoModal);
    } else if (
      links[i].getAttribute("data-supermodal-title") != undefined &&
      links[i].getAttribute("data-supermodal-content") != undefined
    ) {
      links[i].addEventListener("click", controller.initMyModal);
    } else if (links[i].dataset.supermodal != undefined) {
      links[i].addEventListener("click", controller.initModal);
    }
  }
})();
