import './styles/index.scss';

// tabs
const tabs = document.querySelector('.section.section-no-bottom-padding.is-bg-interactive');
const tabButtons = tabs.querySelectorAll('.tab');
const tabPanels = tabs.querySelectorAll('.tab-panel');

function handleTabClick(event) {
  // hide all tab panels
  tabPanels.forEach(panel => panel.hidden = true);
  // mark all tabs as unselected
  tabButtons.forEach(tab => tab.classList.remove('is-active'));
  // mark the clicked tab as selected
  this.classList.add('is-active');
  // find the associated tabPanel and show it
  const { id } = event.currentTarget;
  const tabPanel = tabs.querySelector(`[data-panel="${id}"]`);
  tabPanel.hidden = false;
}

tabButtons.forEach(button => button.addEventListener('click', handleTabClick));

const modalButtons = document.querySelectorAll('.modal-button');
const modalCloseButtons = document.querySelectorAll('.modal-close');

function showModal(event) {
  event.stopImmediatePropagation();
  const target = document.getElementById(event.target.attributes['data-target'].value);
  target && target.classList.toggle('hidden');
}

modalButtons.forEach(button => button.addEventListener('click', showModal));
modalCloseButtons.forEach(button => button.addEventListener('click', showModal));

// Notify Me
const notifyButton = document.querySelector('.notify');
const saveSettings = (e) => {
  e.preventDefault();  
  const alert = document.querySelector(".message");
  alert.textContent = "Message sent successfully";

  document.querySelector('.inputNotify').value = '';
};
notifyButton.addEventListener('click', saveSettings);
