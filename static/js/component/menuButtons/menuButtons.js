const nofunc = () => null;

export default class menuButton {
  constructor({ textLabel, href = '', clickCallback = nofunc } = {}) {
    const element = document.createElement('a');
    element.innerText = textLabel;

    if (href !== '') {
      element.href = href;
    }

    if (clickCallback() !== nofunc) {
      element.addEventListener('click', clickCallback);
    }

    element.classList.add('menu-btn');
    this._element = element;
  }

  render(root) {
    root.innerHTML = '';
    root.appendChild(this._element);
  }
}
