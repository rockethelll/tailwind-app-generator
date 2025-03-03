// const form = document.getElementById('generate-form') as HTMLFormElement;
// i want to get the form element by its id without using document
const form = generate-form

console.log(form);

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('first_name');
  alert(name);
});
